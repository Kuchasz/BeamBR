export interface Color {
    r: number;
    g: number;
    b: number;
    hex: string;
};

const colorFromHex = (hex: string) => ({
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
    get hex() {
        return `#${decimalToHex(this.r)}${decimalToHex(this.g)}${decimalToHex(this.b)}`;
    }
});

const decimalToHex = (decimal: number) => {
    return decimal < 10 ? `0${decimal.toString(16)}` : decimal.toString(16);
};

export const colors: Color[] = [
    colorFromHex('f44336'),
    colorFromHex('e91e63'),
    colorFromHex('9c27b0'),
    colorFromHex('673ab7'),
    colorFromHex('3f51b5'),
    colorFromHex('2196f3'),
    colorFromHex('03a9f4'),
    colorFromHex('00bcd4'),
    colorFromHex('009688'),
    colorFromHex('4caf50'),
    colorFromHex('8bc34a'),
    colorFromHex('cddc39'),
    colorFromHex('ffeb3b'),
    colorFromHex('ffc107'),
    colorFromHex('ff9800'),
    colorFromHex('ff5722')
];
