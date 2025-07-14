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

      const remaining_text = line.replace(/<[^>]*>/g, "");
      if (remaining_text) {
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < remaining_text.length; i++) {
          ctx.fillText(remaining_text[i], x * char_width, line_index * line_height);
          x++;
        }
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
