"use client";

import { useRef, useState } from "react";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ASCII_Result } from "@/types/ASCII_Result";

export default function ASCII_Display({ ascii_result }: { ascii_result?: ASCII_Result | null }) {
  const [font_size, set_font_size] = useState(12);
  const [zoom_level, set_zoom_level] = useState(100);
  const display_ref = useRef<HTMLDivElement>(null);

  function handle_zoom_in() {
    set_zoom_level((prev) => Math.min(prev + 20, 200));
  }

  function handle_zoom_out() {
    set_zoom_level((prev) => Math.max(prev - 20, 50));
  }

  function handle_reset_zoom() {
    set_zoom_level(100);
  }

  function handle_font_size_change(value: number[]) {
    set_font_size(value[0]);
  }

  if (!ascii_result) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">ASCII Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-64 items-center justify-center">
            <p>Upload an image to see ASCII conversion</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (ascii_result) {
    return (
      <Card className="h-full max-w-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">
            ASCII Output
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handle_zoom_out}
                disabled={zoom_level <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handle_reset_zoom}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handle_zoom_in}
                disabled={zoom_level >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground min-w-0 text-sm">Font Size:</span>
              <div className="flex-1">
                <Slider
                  value={[font_size]}
                  onValueChange={handle_font_size_change}
                  min={8}
                  max={24}
                  step={1}
                  className="flex-1"
                />
              </div>
              <span className="min-w-0 text-sm font-medium">{font_size}px</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-muted-foreground min-w-0 text-sm">Zoom:</span>
              <span className="min-w-0 text-sm font-medium">{zoom_level}%</span>
            </div>

            <div
              ref={display_ref}
              className="max-h-screen max-w-full overflow-auto rounded-lg bg-black p-4 font-mono text-white"
              style={{
                fontSize: `${font_size}px`,
                lineHeight: ascii_result.has_colors ? "1.2" : "1",
              }}
            >
              {ascii_result.has_colors ? (
                <div
                  dangerouslySetInnerHTML={{ __html: ascii_result.text }}
                  style={{
                    transform: `scale(${zoom_level / 100})`,
                    transformOrigin: "top left",
                    whiteSpace: "pre",
                    fontFamily: "monospace",
                  }}
                />
              ) : (
                <pre
                  className="whitespace-pre leading-none"
                  style={{
                    transform: `scale(${zoom_level / 100})`,
                    transformOrigin: "top left",
                  }}
                >
                  {ascii_result.text}
                </pre>
              )}
            </div>

            <div className="text-muted-foreground text-xs">
              Size: {ascii_result.width} × {ascii_result.height} characters
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}
