export async function copy_to_clipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      console.error("Failed to copy to clipboard: clipboard not supported");
      return false;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}
