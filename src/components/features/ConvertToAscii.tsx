"use client";

import { useState } from "react";
import { Image_Info } from "@/types/Image_Info";
import { ASCII_Result } from "@/types/ASCII_Result";
import { Conversion_Options } from "@/types/Conversion_Options";
import { DEFAULT_OPTIONS } from "@/lib/constants";

export default function ConvertToAscii() {
  const [image_info, setImageInfo] = useState<Image_Info | null>(null);
  const [ascii_result, setAsciiResult] = useState<ASCII_Result | null>(null);
  const [conversion_options, setConversion_options] = useState<Conversion_Options>(DEFAULT_OPTIONS);

  return <div></div>;
}
