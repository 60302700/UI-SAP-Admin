import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon-dark.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/images/favicon-light.ico" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="dark:bg-gray-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
