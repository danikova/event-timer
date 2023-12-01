const MAX_IMAGE_WORK_SIZE = 128;

export interface Hsl {
  h: number;
  s: number;
  l: number;
}

export interface HueData {
  lum: {
    low: number;
    high: number;
    tot: number;
  };
  sat: {
    low: number;
    high: number;
    tot: number;
  };
  count: number;
  histo: Uint16Array;
}

export function calculateDominantColors(hues: HueData[], imageData: ImageData) {
  generateHistogramFromImageData(hues, imageData);
  return generateHslValuesFromEvaluatedHueArray(hues);
}

function rgbToHsl(rgb: [number, number, number]) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h, s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h =
      (max === r
        ? (g - b) / d + (g < b ? 6 : 0)
        : max === g
        ? (b - r) / d + 2
        : (r - g) / d + 4) / 6;
  }

  return { h, s, l } as Hsl;
}

export function getOptimizedImageData(imageRef: HTMLImageElement) {
  if (!imageRef) throw new Error();

  imageRef.crossOrigin = "Anonymous";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) throw new Error();

  const imgNWidth = imageRef.naturalWidth;
  const imgNHeight = imageRef.naturalHeight;

  if (imgNWidth === 0 || imgNHeight === 0) throw new Error();

  const scaleFactor = Math.min(
    MAX_IMAGE_WORK_SIZE / Math.max(imgNWidth, imgNHeight),
    1
  );

  canvas.width = imgNWidth * scaleFactor;
  canvas.height = imgNHeight * scaleFactor;

  context.drawImage(
    imageRef,
    0,
    0,
    imgNWidth,
    imgNHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  return context.getImageData(0, 0, canvas.width, canvas.height);
}

function generateHslValuesFromEvaluatedHueArray(hues: HueData[]) {
  const hslValues: Hsl[] = [];
  for (let j = 0; j < hues.length; j += 1) {
    const hr = hues[j];
    let wHue = 0;
    let hueCount = 0;
    hr.histo[1] += hr.histo[0];
    for (let i = 1; i < 360; i++) {
      wHue += i * hr.histo[i];
      hueCount += hr.histo[i];
    }
    const h = wHue / hueCount / 360;
    const s = hr.sat.tot / hr.count;
    const l = Math.sqrt(hr.lum.tot / hr.count);
    hslValues.push({ h, s, l });
  }
  return hslValues;
}

function generateHistogramFromImageData(hues: HueData[], imageData: ImageData) {
  const pixels = imageData.data;
  const l = calculateLValue(imageData, pixels);

  hues[0].lum.low = l - 0.3;
  hues[0].lum.high = l + 0.3;

  for (let i = 0; i < pixels.length; i += 4) {
    const hsl = rgbToHsl([pixels[i], pixels[i + 1], pixels[i + 2]]);
    for (let j = 0; j < hues.length; j++) {
      const hr = hues[j]; // hue range
      if (hsl.l >= hr.lum.low && hsl.l < hr.lum.high) {
        if (hsl.s >= hr.sat.low && hsl.s < hr.sat.high) {
          const histoIndex = ~~(hsl.h * 360);
          hr.histo[histoIndex] += 1;
          hr.count += 1;
          hr.lum.tot += hsl.l * hsl.l;
          hr.sat.tot += hsl.s;
        }
      }
    }
  }
}

function calculateLValue(imageData: ImageData, pixels: Uint8ClampedArray) {
  let l = 0;
  const iCount = imageData.width * imageData.height;
  for (let i = 0; i < pixels.length; i += 4) {
    const hsl = rgbToHsl([pixels[i], pixels[i + 1], pixels[i + 2]]);
    l += hsl.l * hsl.l;
  }
  l = Math.sqrt(l / iCount);
  return l;
}
