#include <OneWire.h>
#include <DallasTemperature.h>
#include "ESP8266WiFi.h"
#include "ESP8266WebServer.h"
#include "FS.h"

const char* ssid = "Profit";
const char* password = "44441111";

ESP8266WebServer* server = new ESP8266WebServer(80);

void setup() {
	Serial.begin(115200);
	SPIFFS.begin();


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

	server->begin();
}

void loop() {
	server->handleClient();
}
