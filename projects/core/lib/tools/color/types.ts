/**
 * Color in hex.
 * Example `#ffffff`
 */
export type Hex = `#${string}`;

export type Rgb = [r: number, g: number, b: number];

export type RgbString = `rgb(${number}, ${number}, ${number})`;

export type Rgba = [r: number, g: number, b: number, a: number];

export type RgbaString = `rgba(${number}, ${number}, ${number}, ${number})`;

export type Hsv = [hue: number, saturation: number, value: number];
