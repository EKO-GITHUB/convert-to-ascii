import { Conversion_Options } from "@/types/Conversion_Options";
import { Character_Set } from "@/types/Character_Set";

export const CHARACTER_SETS: Character_Set[] = [
  {
    name: "Default",
    characters: " .:-=+*#%@",
    description: "Standard ASCII characters from light to dark",
  },
  {
    name: "Dense",
    characters: " ░▒▓█",
    description: "Block characters for dense output",
  },
  {
    name: "Minimal",
    characters: " .-+#",
    description: "Simple character set",
  },
  {
    name: "Extended",
    characters: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
    description: "Extended character set for detailed output",
  },
];

export const DEFAULT_OPTIONS: Conversion_Options = {
  width: 80,
  color_mode: "monochrome",
  character_set: CHARACTER_SETS[0].characters,
  invert_colors: false,
  font_size: 12,
};

export const MAX_FILE_SIZE = 100 * 1024 * 1024;

export const CHARACTER_ASPECT_RATIO = 0.5;

export const MAX_WIDTH = 200;

export const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"];
