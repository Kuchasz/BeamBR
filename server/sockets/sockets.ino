#include <OneWire.h>
#include <DallasTemperature.h>
#include <Ticker.h>
#include "ESP8266WiFi.h"
#include "ESP8266WebServer.h"
#include "FS.h"
#include <vector>
#include "Sensor.h"

const char* ssid = "Profit";
const char* password = "44441111";

ESP8266WebServer* server = new ESP8266WebServer(80);
OneWire* oneWire = new OneWire(D5);
DallasTemperature* sensors = new DallasTemperature(oneWire);

static Ticker* tempsReader = new Ticker();

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
		_sensors.push_back(new Sensor(targetAddress, sensors));
	}

	WiFi.begin(ssid, password);

	Serial.println("Connecting!");

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

	server->on("/sensors", []() {

		String sensorsString = "[";

		for(auto i = 0; i < numberOfSensors; i++){
			sensorsString += String((i == 0) ? "" : ", ") + "{ \"id\":\"" + _sensors.at(i)->GetId() + "\", \"color\":\"" + _sensors.at(i)->GetColor() + "\"}";
		}

		sensorsString += "]";
		server->send(200, "text/json", sensorsString);

	});

	server->on("/sensor/:id/color", HTTP_POST, [](){

		auto requestString = server->args();
		Serial.println(requestString);

	});

	server->begin();
	tempsReader->attach(1, readTemperatures);
}

void loop() {
	server->handleClient();
}
