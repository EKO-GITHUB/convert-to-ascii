import { Image_Info } from "@/types/Image_Info";
import { MAX_FILE_SIZE, SUPPORTED_FORMATS } from "@/lib/constants";

export function load_image_from_file(file: File): Promise<Image_Info> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = function () {
      const image_info: Image_Info = {
        file,
        width: img.naturalWidth,
        height: img.naturalHeight,
        size: file.size,
        type: file.type,
        url,
      };
      resolve(image_info);
    };

    img.onerror = function () {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image"));
    };

    img.src = url;
  });
}

export function format_file_size(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;
  const TB = GB * 1024;

  if (bytes >= TB) {
    return `${(bytes / TB).toFixed(2)} TB`;
  } else if (bytes >= GB) {
    return `${(bytes / GB).toFixed(2)} GB`;
  } else if (bytes >= MB) {
    return `${(bytes / MB).toFixed(2)} MB`;
  } else if (bytes >= KB) {
    return `${(bytes / KB).toFixed(2)} KB`;
  } else {
    return `${bytes} Bytes`;
  }
}

export function is_valid_image(file: File): boolean {
  return !(!SUPPORTED_FORMATS.includes(file.type) || file.size > MAX_FILE_SIZE);
}
