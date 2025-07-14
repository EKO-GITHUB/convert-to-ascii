import { Image_Info } from "@/types/Image_Info";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

export function Output_Width({
  width,
  image_info,
  max_width,
  calculated_height,
  handle_width_change,
}: {
  width: number;
  image_info?: Image_Info | null;
  max_width: number;
  calculated_height: number;
  handle_width_change: (value: number[]) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">ASCII Width</label>
        <Badge variant="secondary">{width} chars</Badge>
      </div>
      <Slider
        value={[width]}
        onValueChange={handle_width_change}
        min={10}
        max={max_width}
        step={1}
        className="w-full"
      />
      <div className="text-muted-foreground flex justify-between text-xs">
        <span>10</span>
        <span>Max: {max_width}</span>
      </div>
      {image_info && (
        <div className="text-muted-foreground text-xs">
          Output size: {width} × {calculated_height} characters
        </div>
      )}
    </div>
  );
}
