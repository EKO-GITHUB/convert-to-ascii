import React from "react";
import Image from "next/image";

export function Header() {
  return (
    <header className="top-0 z-10 border-b backdrop-blur-sm">
      <div className="container mx-auto p-4">
        <div className="flex items-center gap-4">
          <Image
            src="/icon.png"
            width={60}
            height={60}
            alt="convert 2 ascii logo"
          />
          <div>
            <h1 className="text-2xl font-bold">Convert2ASCII</h1>
            <p className="text-muted-foreground text-sm">
              Transform images into ASCII art - 100% client-side processing
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
