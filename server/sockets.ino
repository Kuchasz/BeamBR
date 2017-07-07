#include <OneWire.h>
#include <DallasTemperature.h>
#include <Ticker.h>
#include "ESP8266WiFi.h"
#include "ESP8266WebServer.h"
#include "FS.h"
#include <vector>

const char* ssid = "Profit";
const char* password = "44441111";

ESP8266WebServer* server = new ESP8266WebServer(80);
OneWire* oneWire = new OneWire(D5);
DallasTemperature* sensors = new DallasTemperature(oneWire);

Ticker* tempsReader = new Ticker();

String formatAddress(DeviceAddress deviceAddress)
{
	String finalAddress = "";

	for (uint8_t i = 0; i < 8; i++)
	{
		finalAddress += (deviceAddress[i] < 16) ? "0" : String(deviceAddress[i], HEX);
	}

  	return finalAddress;
}

class Sensor{
	public:
	Sensor(DeviceAddress targetAddress);
	void UpdateTemperature();
	float GetTemperature();
	String GetId();

	private:
	DeviceAddress address = {0, 0, 0, 0, 0, 0, 0, 0};
	float temperature;
};

Sensor::Sensor(DeviceAddress targetAddress){
	temperature = 0.0;
	for(auto i = 0; i < 8; i ++){
		this->address[i] = targetAddress[i];
	}
}

float Sensor::GetTemperature(){
	return this->temperature;
}

void Sensor::UpdateTemperature(){
	this->temperature = sensors->getTempC(address);
}

String Sensor::GetId() {
	return formatAddress(this->address);
}

std::vector<Sensor*> _sensors;

uint8_t numberOfSensors;

void readTemperatures(){
	sensors->requestTemperatures();

	for(auto i = 0; i < numberOfSensors; i++){
		_sensors.at(i)->UpdateTemperature();
	}
}

void setup() {
	Serial.begin(115200);
	SPIFFS.begin();
	sensors->begin();

	numberOfSensors = sensors->getDeviceCount();

	for(auto i = 0; i < numberOfSensors; i++){
		DeviceAddress targetAddress;
		sensors->getAddress(targetAddress, i);
		_sensors.push_back(new Sensor(targetAddress));
	}

	WiFi.begin(ssid, password);

	while (WiFi.status() != WL_CONNECTED) {
		delay(500);
		Serial.print(".");
	}

	Serial.println("Connected!");
	Serial.println(WiFi.localIP());

	server->on("/", []() {
		File rootHtml = SPIFFS.open("/index.html", "r");
		Serial.println(rootHtml.size());
		server->streamFile(rootHtml, "text/html");
	});

	server->on("/temps", []() {
		String temperaturesString = "{";

		for(auto i = 0; i < numberOfSensors; i++){
			temperaturesString += String((i == 0) ? "" : ", ") + "\"" + _sensors.at(i)->GetId() + "\": \"" + String(_sensors.at(i)->GetTemperature()) + "\"";
		}

		temperaturesString += "}";

		server->send(200, "text/json", temperaturesString);
	});

	server->begin();
	tempsReader->attach(1, readTemperatures);
}

void loop() {
	server->handleClient();
}

