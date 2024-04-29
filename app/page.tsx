"use client";

import { ChangeEvent, useState } from "react";
import { Cifrador } from "./components/cifrador";
import { Descifrador } from "./components/descifrador";

const options = {
  CIFRAR: "cifrar",
  DESCIFRAR: "descifrar",
} as const;

type OptionsType = (typeof options)[keyof typeof options];

export default function Home() {
  return (
    <main className="flex justify-center items-center h-dvh flex-col gap-4 p-5 bg-slate-50">
      <Cifrador />
      <Descifrador />
    </main>
  );
}
