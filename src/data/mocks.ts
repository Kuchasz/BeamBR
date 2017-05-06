const ssids = ['theros', 'neostrada', 'linksys', 'd-link', 'Aero', 'Netia', 'TPNeo'];

const createSensor = () => ({
    id: (Math.random() * 10 ** 10).toFixed(0),
    resolution: Math.floor(Math.random()*3)+9,
    name: Math.random() > 0.25 ? undefined : `Nice name ${Math.floor(Math.random() * 100)}`,
    color: {
        hex: 'FFFFFF'
    }
});

export const sensors = Array.from(Array(Math.floor(Math.random() * 10 + 1)).keys()).map(() => createSensor());

const createNetwork = () => ({
    ssid: ssids[Math.floor(Math.random() * ssids.length)] + (Math.random() * (10 ** 5)).toFixed(0).toString(),
    channel: Math.floor(Math.random() * 11) + 1,
    strength: (Math.floor(Math.random() * 50) + 30),
    isSecured: Math.random() > 0.25,
    password: '12345678'
});

export const networks = Array.from(Array(Math.floor(Math.random() * 10)).keys()).map(() => createNetwork());

const lastTempsForSensors = {};
export const createTemperatureValue = (sensorId : string) => {
    const lastTempForSensor = lastTempsForSensors[sensorId] || Math.floor(Math.random()*1600)- 800;

    const offset = Math.floor(Math.random()*100) - 50;
    let newTempForSensor = lastTempForSensor + offset;
    if (newTempForSensor <= -800 || newTempForSensor >= 800)
        newTempForSensor = lastTempForSensor - offset;

    lastTempsForSensors[sensorId] = newTempForSensor;
    return newTempForSensor;
}