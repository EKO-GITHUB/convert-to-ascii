"use client";

import { Settings as SettingsLucide } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Conversion_Options } from "@/types/Conversion_Options";
import { Image_Info } from "@/types/Image_Info";
import { CHARACTER_ASPECT_RATIO, CHARACTER_SETS, MAX_WIDTH } from "@/lib/constants";
import { Output_Width } from "@/components/features/settings/Output_Width";
import { Color_Mode } from "@/components/features/settings/Color_Mode";
import { Invert_Colors } from "@/components/features/settings/Invert_Colors";
import { Character_Set_Options } from "@/components/features/settings/Character_Set_Options";

export default function Settings({
  options,
  on_options_change,
  image_info,
}: {
  options: Conversion_Options;
  on_options_change: (options: Conversion_Options) => void;
  image_info?: Image_Info | null;
}) {
  const max_width = image_info ? Math.min(MAX_WIDTH, image_info.width) : MAX_WIDTH;

  function handle_width_change(value: number[]) {
    on_options_change({
      ...options,
      width: value[0],
    });
  }

  function handle_color_mode_change(checked: boolean) {
    on_options_change({
      ...options,
      color_mode: checked ? "colorful" : "monochrome",
    });
  }

  function handle_invert_colors_change(checked: boolean) {
    on_options_change({
      ...options,
      invert_colors: checked,
    });
  }

  function handle_character_set_change(character_set_name: string) {
    const selected_set = CHARACTER_SETS.find((set) => set.name === character_set_name);
    if (selected_set) {
      on_options_change({
        ...options,
        character_set: selected_set.characters,
      });
    }
  }

  function get_current_character_set_name() {
    const current_set = CHARACTER_SETS.find((set) => set.characters === options.character_set);
    return current_set?.name || "Custom";
  }

  const calculated_height = image_info
    ? Math.round((options.width / image_info.width) * image_info.height * CHARACTER_ASPECT_RATIO)
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <SettingsLucide className="h-5 w-5" />
          Conversion Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Output_Width
          width={options.width}
          image_info={image_info}
          max_width={max_width}
          calculated_height={calculated_height}
          handle_width_change={handle_width_change}
        />
        <Color_Mode
          color_mode={options.color_mode}
          handle_color_mode_change={handle_color_mode_change}
        />
        <Invert_Colors
          invert_colors={options.invert_colors}
          handle_invert_colors_change={handle_invert_colors_change}
        />
        <Character_Set_Options
          character_set={get_current_character_set_name()}
          handle_character_set_change={handle_character_set_change}
        />
      </CardContent>
    </Card>
  );
}
