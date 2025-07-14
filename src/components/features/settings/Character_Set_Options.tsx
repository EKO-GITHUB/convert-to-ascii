import React from "react";
import { Info, Type } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CHARACTER_SETS } from "@/lib/constants";

export function Character_Set_Options({
  character_set = "Alphanumeric",
  handle_character_set_change,
}: {
  character_set: string;
  handle_character_set_change: (character_set_name: string) => void;
}) {
  const selected_set = CHARACTER_SETS.find((set) => set.name === character_set) || CHARACTER_SETS[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Type className="h-4 w-4" />
        <label className="text-sm font-medium">Character Set</label>
      </div>

      <Select
        value={character_set}
        onValueChange={handle_character_set_change}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            <span className="font-medium">{selected_set.name}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-select-trigger-width)]">
          {CHARACTER_SETS.map((set) => (
            <SelectItem
              key={set.name}
              value={set.name}
            >
              <div className="flex w-full items-center justify-between">
                <div className="grid gap-1">
                  <span className="font-medium">{set.name}</span>
                  <span className="text-muted-foreground text-xs">
                    {set.description} ({set.characters.length} symbols)
                  </span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="bg-muted/50 rounded-lg border p-3">
        <div className="mb-2 flex items-center gap-2">
          <Info className="text-muted-foreground h-3 w-3" />
          <span className="text-foreground text-xs font-medium">Character Preview</span>
          <span className="text-muted-foreground text-xs">({selected_set.characters.length} total)</span>
        </div>
        <div className="bg-background max-h-20 overflow-y-auto rounded border p-4 font-mono text-xs leading-relaxed break-all">
          {selected_set.characters}
        </div>
      </div>
    </div>
  );
}
