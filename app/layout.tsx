import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const metadata: Metadata = {
  title: "Cifrar App",
  description: "Aplicación de cifrado y descifrado de mensajes de aes 128 bits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </body>
    </html>
  );
}
