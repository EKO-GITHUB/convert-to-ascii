import { Conversion_Options } from "@/types/Conversion_Options";
import { Palette } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export function Color_Mode({
  color_mode,
  handle_color_mode_change,
}: {
  color_mode: Conversion_Options["color_mode"];
  handle_color_mode_change: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4" />
          <label className="text-sm font-medium">Colorful ASCII</label>
        </div>
        <p className="text-muted-foreground text-xs">Preserve colors from the original image</p>
      </div>
      <Switch
        checked={color_mode === "colorful"}
        onCheckedChange={handle_color_mode_change}
      />
    </div>
  );
}
