export function mirrorImageVertical(image: HTMLImageElement): HTMLImageElement {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    console.error("Could not create 2D context");
    return image; // Return the original image if canvas creation fails
  }

  canvas.width = image.width;
  canvas.height = image.height;

  // Mirror the image horizontally
  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(image, 0, 0);

  const mirroredImage = new Image();
  mirroredImage.src = canvas.toDataURL();

  return mirroredImage;
}
