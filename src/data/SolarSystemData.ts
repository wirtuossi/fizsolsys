export interface ICelestialBodyConfig {
    name: string;
    radius: number; // Visualization radius
    distance: number; // Distance from Sun
    speed: number; // Orbital speed multiplier
    color: number;
    rotationSpeed: number;
    description: string;
    texture?: string; // Placeholder for texture path
}

export const SolarSystemData: ICelestialBodyConfig[] = [
    {
        name: "Сонце",
        radius: 5,
        distance: 0,
        speed: 0,
        color: 0xffff00,
        rotationSpeed: 0.005,
        description: "Центральна зірка. Плазма. Джерело енергії."
    },
    {
        name: "Меркурій",
        radius: 0.8,
        distance: 10,
        speed: 4.7,
        color: 0xaaaaaa,
        rotationSpeed: 0.01,
        description: "Найближча планета. Відсутня атмосфера."
    },
    {
        name: "Венера",
        radius: 1.5,
        distance: 15,
        speed: 3.5,
        color: 0xffcc33,
        rotationSpeed: 0.005,
        description: "Найгарячіша планета. Парниковий ефект."
    },
    {
        name: "Земля",
        radius: 1.6,
        distance: 22,
        speed: 3.0,
        color: 0x2233ff,
        rotationSpeed: 0.02,
        description: "Наша планета. Є життя і вода."
    },
    {
        name: "Марс",
        radius: 1.1,
        distance: 30,
        speed: 2.4,
        color: 0xff4422,
        rotationSpeed: 0.018,
        description: "Червона планета. Оксид заліза."
    },
    {
        name: "Юпітер",
        radius: 3.5,
        distance: 50,
        speed: 1.3,
        color: 0xdcae96,
        rotationSpeed: 0.04,
        description: "Газовий гігант. Найбільша планета."
    },
    {
        name: "Сатурн",
        radius: 3.0,
        distance: 70,
        speed: 0.9,
        color: 0xf4d03f,
        rotationSpeed: 0.038,
        description: "Має яскраву систему кілець."
    },
    {
        name: "Уран",
        radius: 2.2,
        distance: 95,
        speed: 0.6,
        color: 0x73c6b6,
        rotationSpeed: 0.03,
        description: "Крижаний гігант. Обертається 'на боці'."
    },
    {
        name: "Нептун",
        radius: 2.1,
        distance: 115,
        speed: 0.5,
        color: 0x2e86c1,
        rotationSpeed: 0.032,
        description: "Найвіддаленіша планета. Сильні вітри."
    }
];
