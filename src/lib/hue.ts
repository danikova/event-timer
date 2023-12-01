import { kmeans } from "ml-kmeans";
import { RefObject } from "react";

export async function getDominantHue(imageRef: RefObject<HTMLImageElement>) {
  if (!imageRef.current) return null;

  imageRef.current.crossOrigin = "Anonymous";
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return null;

  const imgNWidth = imageRef.current.naturalWidth;
  const imgNHeight = imageRef.current.naturalHeight;

  if (imgNWidth === 0 || imgNHeight === 0) return null;

  const scaleFactor = Math.min(500 / Math.max(imgNWidth, imgNHeight), 1);

  canvas.width = imgNWidth * scaleFactor;
  canvas.height = imgNHeight * scaleFactor;

  context.drawImage(
    imageRef.current,
    0,
    0,
    imgNWidth,
    imgNHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  return await calculateDominantHue(imageData);
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

  return [h, s, l];
}
// Function to get dominant hue from an image

async function calculateDominantHue(imageData: ImageData) {
  const pixelData = imageData.data;
  const pixels = [];

  // Convert RGB pixels to HSL
  for (let i = 0; i < pixelData.length; i += 4) {
    pixels.push(rgbToHsl([pixelData[i], pixelData[i + 1], pixelData[i + 2]]));
  }

  // Use k-means clustering to find dominant hues
  const k = 5; // You can adjust the number of clusters based on your needs
  const result = kmeans(pixels, k, {});

  // Find the cluster with the largest number of pixels
  let maxClusterSize = 0;

  // Count occurrences of each cluster
  const clusterCount = result.clusters.reduce<{
    [k in string]: number;
  }>((count, clusterIndex) => {
    count[clusterIndex] = (count[clusterIndex] || 0) + 1;
    return count;
  }, {});

  // Find the cluster with the maximum occurrences
  const maxClusterIndex = Object.keys(clusterCount).reduce<any>(
    (maxIndex, clusterIndex) => {
      if (clusterCount[clusterIndex] > maxClusterSize) {
        maxClusterSize = clusterCount[clusterIndex];
        return clusterIndex;
      }
      return maxIndex;
    },
    null
  );

  if (!maxClusterIndex) return null;
  return result.centroids[maxClusterIndex][0]; // H component from HSL
}
