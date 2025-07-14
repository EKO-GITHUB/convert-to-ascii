export function download_ascii_as_html(ascii_html: string, filename: string) {
  const html_template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASCII Art - ${filename}</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background-color: #000;
            color: #fff;
            font-family: monospace;
            font-size: 12px;
            line-height: 1.2;
            white-space: pre;
            overflow: auto;
        }
        .ascii-container {
            display: inline-block;
        }
    </style>
</head>
<body>
    <div class="ascii-container">${ascii_html}</div>
</body>
</html>`;

  const blob = new Blob([html_template], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
