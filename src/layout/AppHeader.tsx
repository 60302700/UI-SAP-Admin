"use client";

import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import Image from "next/image";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b border-gray-200 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80 md:px-6">
      <Link href="/" className="shrink-0" aria-label="EBITEX admin panel">
        <Image
          width={154}
          height={32}
          className="dark:hidden"
          src="/images/logo/logo.svg"
          alt="EBITEX"
          priority
        />
        <Image
          width={154}
          height={32}
          className="hidden dark:block"
          src="/images/logo/logo-dark.svg"
          alt="EBITEX"
          priority
        />
      </Link>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Daniel Moore</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
        </div>
        <ThemeToggleButton />
      </div>
    </header>
  );
}
