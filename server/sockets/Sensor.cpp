#include <DallasTemperature.h>
#include "Sensor.h"

String formatColor(SensorColor color)
{
	String finalColor = "";

	for (uint8_t i = 0; i < 3; i++)
	{
		finalColor += (color[i] < 10) ? "0" + String(color[i]) : String(color[i], HEX);
	}

  	return finalColor;
}

String formatAddress(DeviceAddress deviceAddress)
{
	String finalAddress = "";

	for (uint8_t i = 0; i < 8; i++)
	{
		finalAddress += (deviceAddress[i] < 16) ? "0" : String(deviceAddress[i], HEX);
	}

  	return finalAddress;
}

Sensor::Sensor(DeviceAddress targetAddress, DallasTemperature* sensors){
	temperature = 0.0;
	this->name = String(rand());
	this->resolution = 11;
	this->sensors = sensors;
	for(auto i = 0; i < 8; i ++){
		this->address[i] = targetAddress[i];
	}
}

float Sensor::GetTemperature(){
	return this->temperature;
}

void Sensor::UpdateTemperature(){
	auto newTemperature = sensors->getTempC(address);
	this->temperature = newTemperature;
}

String Sensor::GetId() {
	return formatAddress(this->address);
}

String Sensor::GetColor() {
	return formatColor(this->color);
}

String Sensor::GetName(){
	return this->name;
}

String Sensor::GetResolution(){
	return String(this->resolution);
}

void Sensor::SetColor(String color){

	int r = (int)strtol(color.substring(0, 2).c_str(), NULL, 16);
	int g = (int)strtol(color.substring(2, 4).c_str(), NULL, 16);
	int b = (int)strtol(color.substring(4, 6).c_str(), NULL, 16);

	this->color[0] = r;
	this->color[1] = g;
	this->color[2] = b;
	
}

void Sensor::SetName(String name){
	this->name = name;
}