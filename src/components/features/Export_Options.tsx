"use client";

import { useState } from "react";
import { Check, Copy, Download, FileCode, FileText, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ASCII_Result } from "@/types/ASCII_Result";
import { copy_to_clipboard } from "@/lib/copy_to_clipboard";
import { download_ascii_as_text } from "@/lib/download_ascii_as_text";
import { download_ascii_as_html } from "@/lib/download_ascii_as_html";
import { handle_download_image } from "@/lib/handle_image_download";

export default function Export_Options({ ascii_result }: { ascii_result?: ASCII_Result | null }) {
  const [copy_status, set_copy_status] = useState<"idle" | "copying" | "success" | "error">("idle");

  async function handle_copy_to_clipboard() {
    if (!ascii_result) return;

    set_copy_status("copying");

    let text_to_copy = ascii_result.text;
    if (ascii_result.has_colors) {
      text_to_copy = ascii_result.text.replace(/<[^>]*>/g, "");
    }

    const success = await copy_to_clipboard(text_to_copy);
    set_copy_status(success ? "success" : "error");

    setTimeout(() => {
      set_copy_status("idle");
    }, 2000);
  }

  function handle_download_txt() {
    if (!ascii_result) return;

    let plain_text = ascii_result.text;
    if (ascii_result.has_colors) {
      plain_text = ascii_result.text.replace(/<[^>]*>/g, "");
    }

    const filename = `ascii_art_${Date.now()}`;
    download_ascii_as_text(plain_text, filename);
  }

  function handle_download_html() {
    if (!ascii_result || !ascii_result.has_colors) return;

    const filename = `ascii_art_${Date.now()}`;
    download_ascii_as_html(ascii_result.text, filename);
  }

  const get_copy_button_content = () => {
    switch (copy_status) {
      case "copying":
        return (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-current" />
            Copying...
          </>
        );
      case "success":
        return (
          <>
            <Check className="h-4 w-4" />
            Copied!
          </>
        );
      case "error":
        return (
          <>
            <Copy className="h-4 w-4" />
            Failed
          </>
        );
      default:
        return (
          <>
            <Copy className="h-4 w-4" />
            Copy to Clipboard
          </>
        );
    }
  };

  if (!ascii_result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Download className="h-5 w-5" />
            Export Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground flex h-32 items-center justify-center">
            <p>Convert an image to enable export options</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Download className="h-5 w-5" />
          Export Options
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={handle_copy_to_clipboard}
          className="w-full"
          variant={copy_status === "success" ? "default" : "outline"}
          disabled={copy_status === "copying"}
        >
          {get_copy_button_content()}
        </Button>

        {ascii_result.has_colors ? (
          <div className={"grid grid-cols-2 gap-2"}>
            <Button
              onClick={handle_download_txt}
              variant="outline"
              className="w-full"
            >
              <FileText className="mr-2 h-4 w-4" />
              Save as <span className={"bg-muted rounded-sm px-1 py-0.5 font-mono"}>TXT</span>
            </Button>
            <Button
              onClick={handle_download_html}
              variant="outline"
              className="w-full"
            >
              <FileCode className="mr-2 h-4 w-4" />
              Save as <span className={"bg-muted rounded-sm px-1 py-0.5 font-mono"}>HTML</span>
            </Button>
          </div>
        ) : (
          <Button
            onClick={handle_download_txt}
            variant="outline"
            className="w-full"
          >
            <FileText className="mr-2 h-4 w-4" />
            Save as .txt
          </Button>
        )}

        <Button
          onClick={() => {
            handle_download_image(ascii_result);
          }}
          variant="outline"
          className="w-full"
        >
          <Image className="mr-2 h-4 w-4" />
          Save as .png
        </Button>

        <div className="text-muted-foreground pt-2 text-xs">
          <p>🔒 All exports are generated locally in your browser</p>
        </div>
      </CardContent>
    </Card>
  );
}
