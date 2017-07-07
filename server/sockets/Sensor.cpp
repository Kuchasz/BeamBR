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
	this->sensors = sensors;
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

String Sensor::GetColor() {
	return formatColor(this->color);
}