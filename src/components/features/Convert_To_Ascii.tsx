"use client";

import { useCallback, useEffect, useState } from "react";
import { Image_Info } from "@/types/Image_Info";
import { ASCII_Result } from "@/types/ASCII_Result";
import { Conversion_Options } from "@/types/Conversion_Options";
import { DEFAULT_OPTIONS } from "@/lib/constants";
import Image_Uploader from "@/components/features/Image_Uploader";
import Settings from "@/components/features/settings/Settings";
import Export_Options from "@/components/features/Export_Options";
import ASCII_Display from "@/components/features/ASCII_Display";
import { convert_to_ascii, get_image_data } from "@/lib/ascii_converter";

export default function Convert_To_Ascii() {
  const [image_info, setImage_info] = useState<Image_Info | null>(null);
  const [ascii_result, setAscii_result] = useState<ASCII_Result | null>(null);
  const [conversion_options, setConversion_options] = useState<Conversion_Options>(DEFAULT_OPTIONS);

  const handle_image_loaded = useCallback((new_image_info: Image_Info | null) => {
    setImage_info(new_image_info);
    if (!new_image_info) {
      setAscii_result(null);
    }
  }, []);

  const convert_image = useCallback(async () => {
    if (!image_info) return;

    try {
      const image_data = await get_image_data(image_info, conversion_options.width);
      const result = await convert_to_ascii(image_data, conversion_options);
      setAscii_result(result);
    } catch (error) {
      console.error("Conversion failed:", error);
    }
  }, [image_info, conversion_options]);

  useEffect(() => {
    if (image_info) {
      convert_image();
    }
  }, [image_info, conversion_options, convert_image]);

  return (
    <div className={"container mx-auto grid grid-cols-1 gap-4 p-4"}>
      <div className={"grid gap-4"}>
        <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
          <Image_Uploader
            on_image_loaded={handle_image_loaded}
            current_image={image_info}
          />
          <Settings
            image_info={image_info}
            options={conversion_options}
            on_options_change={setConversion_options}
          />
          <Export_Options ascii_result={ascii_result} />
        </div>
        <ASCII_Display ascii_result={ascii_result} />
      </div>
    </div>
  );
}
