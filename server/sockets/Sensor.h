#include <DallasTemperature.h>

#ifndef Sensor_H
#define Sensor_H

typedef uint8_t SensorColor[3];

class Sensor{
    private:
	DeviceAddress address = {0, 0, 0, 0, 0, 0, 0, 0};
	float temperature;
	SensorColor color = { 255, 0, 0 };
	DallasTemperature* sensors;

	public:
	Sensor(DeviceAddress targetAddress, DallasTemperature* sensors);
	void UpdateTemperature();
	float GetTemperature();
	String GetId();
	String GetColor();
};

#endif