"use client";

import Link from "next/link";
import { GithubIcon } from "lucide-react";
import Image from "next/image";
import { useMobile } from "@/hooks/useMobile";

export function Footer() {
  const isMobile = useMobile();

  const current_year = new Date().getFullYear();

  return (
    <div className="mx-auto w-full">
      <div className="m-4 flex flex-col items-center justify-between gap-1 rounded-2xl border border-white/10 bg-white p-2 shadow-xl backdrop-blur-lg sm:gap-4 md:flex-row">
        {isMobile ? (
          <div className="grid text-center text-xs text-black/60">
            <span>
              100% open source • Privacy-first • Client-side processing
            </span>
            <span>© 2025 Convert2ASCII. All rights reserved.</span>
          </div>
        ) : (
          <div className="flex gap-1 text-center text-sm text-black/60">
            <span>
              100% open source • Privacy-first • Client-side processing
            </span>
            <span>|</span>
            <span>© {current_year} Convert2ASCII. All rights reserved.</span>
          </div>
        )}

        <div className="flex items-center gap-4">
          <Link
            className="flex transform items-center gap-3 rounded-xl bg-white p-3 transition-all duration-100 hover:bg-black/10"
            href="https://github.com/EKO-GITHUB"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="rounded-full border-2 border-white/80"
              width={32}
              height={32}
              src="https://avatars.githubusercontent.com/u/25434461?v=4"
              alt="Murad Tochiev profile"
            />
            <div className="text-left">
              <div className="text-sm font-semibold">Murad Tochiev</div>
              <div className="text-xs text-black/60">@EKO-GITHUB</div>
            </div>
            <GithubIcon
              className="text-black/80"
              size={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
