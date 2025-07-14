import { Conversion_Options } from "@/types/Conversion_Options";

export type ASCII_Result = {
  text: string;
  has_colors: boolean;
  width: number;
  height: number;
  options: Conversion_Options;
};
