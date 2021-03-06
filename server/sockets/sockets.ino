#include <OneWire.h>
#include <DallasTemperature.h>
#include <Ticker.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <FS.h>
#include <vector>
#include "Sensor.h"
#include <ArduinoJson.h>

const char* ssid = "Profit";
const char* password = "44441111";

const char* apSSID = "BeamBR";

ESP8266WebServer server(80);
OneWire oneWire(D5);
DallasTemperature sensors(&oneWire);

Ticker tempsReader;
bool shouldReadTemps = true;

IPAddress apIP(192, 168, 1, 1);
IPAddress apGateway(192, 168, 1, 1);
IPAddress apSubmask(255, 255, 255, 0);

std::vector<Sensor*> _sensors;

uint8_t numberOfSensors;

void readTemperatures(){
	shouldReadTemps = false;
	sensors.requestTemperatures();

	for(auto i = 0; i < numberOfSensors; i++){
		_sensors.at(i)->UpdateTemperature();
	}
}

void setup() {
	Serial.begin(115200);
	SPIFFS.begin();
	sensors.begin();

	pinMode(D1, OUTPUT);

 	numberOfSensors = sensors.getDeviceCount();

	for(auto i = 0; i < numberOfSensors; i++){
		DeviceAddress targetAddress;
		sensors.getAddress(targetAddress, i);
		_sensors.push_back(new Sensor(targetAddress, sensors));
	}

	// WiFi.begin(ssid, password);

	WiFi.softAP(apSSID);

	WiFi.softAPConfig(apIP, apGateway, apSubmask);

	// Serial.println("Connecting!");

	// while (WiFi.status() != WL_CONNECTED) {
	// 	delay(500);
	// 	Serial.print(".");
	// }

	// Serial.println("Connected!");
	// Serial.println(WiFi.localIP());

	server.on("/", HTTP_GET, []() {
		digitalWrite(D1, HIGH);
		File rootHtml = SPIFFS.open("/index.html", "r");

		if (server.streamFile(rootHtml, "text/html") != rootHtml.size()) {
			Serial.println("Sent less data than expected!");
		}

		digitalWrite(D1, LOW);

	});

	server.on("/temps", HTTP_GET, []() {

		StaticJsonBuffer<200> jsonBuffer;
		JsonArray& root = jsonBuffer.createArray();
		
		for(auto i = 0; i < numberOfSensors; i++){
			JsonObject& sensor = jsonBuffer.createObject();
			sensor["id"] =_sensors.at(i)->GetId();
			sensor["value"] = _sensors.at(i)->GetTemperature();
			root.add(sensor);
		}

		String tempsString;
		root.printTo(tempsString);

		server.send(200, "text/json", tempsString);

	});

	server.on("/sensors", HTTP_GET, []() {

		StaticJsonBuffer<500> jsonBuffer;
		JsonArray& root = jsonBuffer.createArray();
		
		for(auto i = 0; i < numberOfSensors; i++){
			JsonObject& sensor = jsonBuffer.createObject();
			sensor["id"] =_sensors.at(i)->GetId();
			sensor["color"] = _sensors.at(i)->GetColor();
			sensor["resolution"] = _sensors.at(i)->GetResolution();
			sensor["name"] = _sensors.at(i)->GetName();
			root.add(sensor);
		}

		String sensorsString;
		root.printTo(sensorsString);

		server.send(200, "text/json", sensorsString);

	});

	server.on("/sensor/color", HTTP_POST, [](){

		StaticJsonBuffer<200> jsonBuffer;
		JsonObject& sensor = jsonBuffer.parse(server.arg("plain"));

		uint8_t sensorIndex;
		for (auto i = 0; i < numberOfSensors; i++){
			if(_sensors.at(i)->GetId() == sensor["id"])
				sensorIndex = i;
		}

		_sensors.at(sensorIndex)->SetColor(sensor["color"]);
		server.send(200, "text/json");
		
	});

	server.on("/sensor/name", HTTP_POST, [](){

		StaticJsonBuffer<200> jsonBuffer;
		JsonObject& sensor = jsonBuffer.parse(server.arg("plain"));

		uint8_t sensorIndex;
		for (auto i = 0; i < numberOfSensors; i++){
			if(_sensors.at(i)->GetId() == sensor["id"])
				sensorIndex = i;
		}

		_sensors.at(sensorIndex)->SetName(sensor["name"]);
		server.send(200, "text/json");

	});

	server.on("/networks", HTTP_GET, [](){

		auto numberOfNetworks = WiFi.scanNetworks();

		StaticJsonBuffer<500> jsonBuffer;
		JsonArray& root = jsonBuffer.createArray();
		
		for (int i = 0; i < numberOfNetworks; ++i) {
			JsonObject& network = jsonBuffer.createObject();
			network["ssid"] = WiFi.SSID(i);
			network["strength"] = WiFi.RSSI(i);
			network["channel"] = WiFi.channel(i);
			network["isSecured"] = WiFi.encryptionType(i) == ENC_TYPE_NONE;
			root.add(network);
		}

		String networksString;
		root.printTo(networksString);

		server.send(200, "text/json", networksString);

	});

	server.begin();
	tempsReader.attach(1, []() {
		shouldReadTemps = true;
	});
}

void loop() {
	server.handleClient();
	if(shouldReadTemps)
		readTemperatures();
}
