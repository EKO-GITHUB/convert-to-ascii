export function download_ascii_as_text(ascii: string, filename: string): void {
  const blob = new Blob([ascii], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename.endsWith(".txt") ? filename : `${filename}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
