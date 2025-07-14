import { Switch } from "@/components/ui/switch";

export function Invert_Colors({
  invert_colors,
  handle_invert_colors_change,
}: {
  invert_colors: boolean;
  handle_invert_colors_change: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <label className="text-sm font-medium">Invert Colors</label>
        <p className="text-muted-foreground text-xs">Swap light and dark areas</p>
      </div>
      <Switch
        checked={invert_colors}
        onCheckedChange={handle_invert_colors_change}
      />
    </div>
  );
}
