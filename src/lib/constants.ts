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
