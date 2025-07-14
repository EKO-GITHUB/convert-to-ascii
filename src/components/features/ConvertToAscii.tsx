"use client";

import { useState } from "react";
import { Image_Info } from "@/types/Image_Info";
import { ASCII_Result } from "@/types/ASCII_Result";
import { Conversion_Options } from "@/types/Conversion_Options";
import { DEFAULT_OPTIONS } from "@/lib/constants";
import Image_Uploader from "@/components/features/Image_Uploader";
import Settings from "@/components/features/Settings";
import Export_Options from "@/components/features/Export_Options";
import ASCII_Display from "@/components/features/ASCII_Display";

export default function ConvertToAscii() {
  const [image_info, setImageInfo] = useState<Image_Info | null>(null);
  const [ascii_result, setAsciiResult] = useState<ASCII_Result | null>(null);
  const [conversion_options, setConversion_options] = useState<Conversion_Options>(DEFAULT_OPTIONS);
  const [is_converting, setIs_converting] = useState<boolean>(false);

  return (
    <div className={"grid grid-cols-1 gap-4 p-4 lg:grid-cols-2"}>
      <div className={"grid gap-4"}>
        <Image_Uploader />
        <Settings />
        <Export_Options />
      </div>
      <ASCII_Display />
    </div>
  );
}
