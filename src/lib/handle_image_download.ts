import { ASCII_Result } from "@/types/ASCII_Result";

export function handle_download_image(ascii_result: ASCII_Result | null) {
  if (!ascii_result) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const font_size = 12;
  const char_width = font_size * 0.6;
  const line_height = font_size * 1.2;

  canvas.width = ascii_result.width * char_width;
  canvas.height = ascii_result.height * line_height;

  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${font_size}px monospace`;
  ctx.textBaseline = "top";

  const lines = ascii_result.text.split("\n");

  if (ascii_result.has_colors) {
    lines.forEach((line, line_index) => {
      let x = 0;

      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${line}</div>`, "text/html");
      const spans = doc.querySelectorAll("span");

      if (spans.length > 0) {
        spans.forEach((span) => {
          const char = span.textContent || "";
          const style = span.getAttribute("style") || "";

          const color_match = style.match(/color:\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
          if (color_match) {
            ctx.fillStyle = `rgb(${color_match[1]}, ${color_match[2]}, ${color_match[3]})`;
          } else {
            ctx.fillStyle = "#ffffff";
          }

          ctx.fillText(char, x * char_width, line_index * line_height);
          x++;
        });
      } else {
        ctx.fillStyle = "#ffffff";
        ctx.fillText(line, 0, line_index * line_height);
      }
    });
  } else {
    ctx.fillStyle = "#ffffff";
    lines.forEach((line, line_index) => {
      ctx.fillText(line, 0, line_index * line_height);
    });
  }

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ascii_art_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  }, "image/png");
}
