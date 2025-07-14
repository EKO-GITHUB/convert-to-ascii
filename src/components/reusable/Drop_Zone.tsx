"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { AlertCircle, FileImage, Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import { is_valid_image } from "@/lib/image_utils";
import { SUPPORTED_FORMATS } from "@/lib/constants";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

export function DropZone({
  on_file_drop,
  is_loading = false,
  error,
}: {
  on_file_drop: (file: File) => void;
  is_loading?: boolean;
  error?: string;
}) {
  const on_drop = useCallback(
    (accepted_files: File[]) => {
      if (accepted_files.length > 0) {
        const file = accepted_files[0];

        if (is_valid_image(file)) {
          on_file_drop(file);
        }
      }
    },
    [on_file_drop],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop: on_drop,
    accept: {
      "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp"],
    },
    multiple: false,
    disabled: is_loading,
  });

  return (
    <div className="w-full">
      <Card
        {...getRootProps()}
        className={`cursor-pointer border-2 border-dashed p-8 text-center transition-colors ${isDragActive && !isDragReject ? "border-primary bg-primary/5" : ""} ${isDragReject ? "border-destructive bg-destructive/5" : ""} ${is_loading ? "cursor-not-allowed opacity-50" : "hover:border-primary/50"} `}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center gap-4">
          {is_loading ? (
            <Ring
              size="40"
              stroke="5"
              bgOpacity="0"
              speed="2"
              color="black"
            />
          ) : (
            <div className="bg-primary/10 rounded-full p-3">
              {isDragReject ? (
                <AlertCircle className="text-destructive h-8 w-8" />
              ) : (
                <FileImage className="text-primary h-8 w-8" />
              )}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-lg font-medium">
              {is_loading ? "Processing..." : isDragActive ? "Drop your image here" : "Upload an image"}
            </h3>

            {!is_loading && (
              <p className="text-muted-foreground text-sm">
                {isDragReject ? "Please select a valid image file" : "Drag and drop an image, or click to select"}
              </p>
            )}
          </div>

          {!is_loading && (
            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <Upload className="h-4 w-4" />
              <span>Supports: {SUPPORTED_FORMATS.map((format) => format.split("/")[1].toUpperCase()).join(", ")}</span>
            </div>
          )}
        </div>
      </Card>

      {error && (
        <Alert
          variant="destructive"
          className="mt-4"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4 text-center">
        <p className="text-muted-foreground text-xs">
          🔒 Your images are processed entirely in your browser. Nothing is uploaded to any server.
        </p>
      </div>
    </div>
  );
}
