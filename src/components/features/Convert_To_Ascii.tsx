"use client";

import { useCallback, useState } from "react";
import { Image_Info } from "@/types/Image_Info";
import { ASCII_Result } from "@/types/ASCII_Result";
import { Conversion_Options } from "@/types/Conversion_Options";
import { DEFAULT_OPTIONS } from "@/lib/constants";
import Image_Uploader from "@/components/features/Image_Uploader";
import Settings from "@/components/features/settings/Settings";
import Export_Options from "@/components/features/Export_Options";
import ASCII_Display from "@/components/features/ASCII_Display";

export default function Convert_To_Ascii() {
  const [image_info, setImage_info] = useState<Image_Info | null>(null);
  const [ascii_result, setAscii_result] = useState<ASCII_Result | null>(null);
  const [conversion_options, setConversion_options] = useState<Conversion_Options>(DEFAULT_OPTIONS);
  const [is_converting, setIs_converting] = useState<boolean>(false);

  const handle_image_loaded = useCallback((new_image_info: Image_Info | null) => {
    setImage_info(new_image_info);
    if (!new_image_info) {
      setAscii_result(null);
    }
  }, []);

  return (
    <div className={"container mx-auto grid grid-cols-1 gap-4 p-4 lg:grid-cols-2"}>
      <div className={"grid gap-4"}>
        <Image_Uploader
          on_image_loaded={handle_image_loaded}
          current_image={image_info}
        />
        <Settings
          image_info={image_info}
          options={conversion_options}
          on_options_change={setConversion_options}
        />
        <Export_Options />
      </div>
      <ASCII_Display />
    </div>
  );
}
