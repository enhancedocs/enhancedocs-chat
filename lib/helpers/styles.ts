export function classNames (...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function setGlobalStyle (name: string, value: string) {
  document.documentElement.style.setProperty(name, value);
}

export function getHSLFromHex (hex: string) {
  // Remove the '#' character from the hex value
  hex = hex.substring(1);

  // Parse the red, green, and blue components from the hex value
  const red = parseInt(hex.substring(0, 2), 16);
  const green = parseInt(hex.substring(2, 4), 16);
  const blue = parseInt(hex.substring(4, 6), 16);

  // Convert the RGB values to HSL
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;
  let saturation = 0;

  // Calculate the hue value
  if (delta !== 0) {
    saturation = delta / max;

    switch (max) {
    case r: {
      hue = ((g - b) / delta) % 6;
      break;
    }
    case g: {
      hue = ((b - r) / delta) + 2;
      break;
    }
    case b: {
      hue = ((r - g) / delta) + 4;
      break;
    }
    }
  }

  // Convert hue to degrees
  hue = Math.round(hue * 60);
  if (hue < 0) {
    hue += 360;
  }

  saturation = Math.round(saturation * 100);

  return { hue, saturation };
}
