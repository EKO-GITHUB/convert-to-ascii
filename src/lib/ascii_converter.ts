import { Image_Info } from "@/types/Image_Info";
import { ASCII_Result } from "@/types/ASCII_Result";
import { Conversion_Options } from "@/types/Conversion_Options";
import { CHARACTER_ASPECT_RATIO } from "@/lib/constants";

export function get_image_data(image_info: Image_Info, target_width: number): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("Failed to get canvas context"));
        return;
      }

      const aspect_ratio = img.height / img.width;
      const width = Math.min(target_width, img.width);
      const height = Math.round(width * aspect_ratio * CHARACTER_ASPECT_RATIO);

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      const image_data = ctx.getImageData(0, 0, width, height);
      resolve(image_data);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image for processing"));
    };

    img.src = image_info.url;
  });
}

export async function convert_to_ascii(image_data: ImageData, options: Conversion_Options): Promise<ASCII_Result> {
  const { width, height, data } = image_data;
  const { character_set, color_mode, invert_colors } = options;

  const ascii_lines: string[] = [];
  const chars = character_set.split("");
  const char_count = chars.length - 1;

  for (let y = 0; y < height; y++) {
    let line = "";

    for (let x = 0; x < width; x++) {
      const pixel_index = (y * width + x) * 4;
      const r = data[pixel_index];
      const g = data[pixel_index + 1];
      const b = data[pixel_index + 2];

      let brightness: number;
      let color_style = "";

      if (color_mode === "colorful") {
        brightness = rgb_to_grayscale(r, g, b);
        color_style = `color: rgb(${r}, ${g}, ${b}); `;
      } else {
        brightness = rgb_to_grayscale(r, g, b);
      }

      if (invert_colors) {
        brightness = 255 - brightness;
      }

      const char_index = Math.floor((brightness / 255) * char_count);
      const char = chars[char_index];

      if (color_mode === "colorful") {
        line += `<span style="${color_style}">${char}</span>`;
      } else {
        line += char;
      }
    }

    ascii_lines.push(line);
  }

  return {
    text: ascii_lines.join("\n"),
    has_colors: color_mode === "colorful",
    width: width,
    height: height,
    options,
  };
}

export function rgb_to_grayscale(r: number, g: number, b: number): number {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
}
