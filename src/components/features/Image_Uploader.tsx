import { useCallback, useState } from "react";
import { format_file_size, load_image_from_file } from "@/lib/image_utils";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Image_Info } from "@/types/Image_Info";
import { DropZone } from "@/components/reusable/Drop_Zone";

export default function Image_Uploader({
  on_image_loaded,
  current_image,
}: {
  on_image_loaded: (image_info: Image_Info | null) => void;
  current_image?: Image_Info | null;
}) {
  const [is_loading, set_is_loading] = useState(false);
  const [error, set_error] = useState<string>("");

  const handle_file_drop = useCallback(
    async (file: File) => {
      set_is_loading(true);
      set_error("");

      try {
        const image_info = await load_image_from_file(file);
        on_image_loaded(image_info);
      } catch (err) {
        set_error(err instanceof Error ? err.message : "Failed to load image");
      } finally {
        set_is_loading(false);
      }
    },
    [on_image_loaded],
  );

  const handle_reset = useCallback(() => {
    if (current_image?.url) {
      URL.revokeObjectURL(current_image.url);
    }
    on_image_loaded(null);
    set_error("");
  }, [current_image, on_image_loaded]);

  if (current_image) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg">Uploaded Image</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handle_reset}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src={current_image.url}
                alt="Uploaded image"
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                {current_image.width} × {current_image.height}
              </Badge>
              <Badge variant="secondary">{format_file_size(current_image.size)}</Badge>
              <Badge variant="secondary">{current_image.type.split("/")[1].toUpperCase()}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Upload Image</CardTitle>
      </CardHeader>
      <CardContent>
        <DropZone
          on_file_drop={handle_file_drop}
          is_loading={is_loading}
          error={error}
        />
      </CardContent>
    </Card>
  );
}
