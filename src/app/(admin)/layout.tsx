import AppHeader from "@/layout/AppHeader";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 xl:p-3">
      <div className="flex min-h-screen flex-col overflow-hidden bg-white dark:bg-gray-900 xl:h-[calc(100vh-24px)] xl:min-h-0 xl:rounded-2xl">
        <AppHeader />
        <div className="flex-1 overflow-y-auto p-4 md:p-6">{children}</div>
      </div>
    </div>
  );
}
