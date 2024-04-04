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
  const [cifrar, setCifrar] = useState<OptionsType>(options.CIFRAR);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCifrar(e.target.value as OptionsType);
  };

  return (
    <main className="container flex justify-center items-center h-dvh flex-col gap-4">
      <select defaultValue={options.CIFRAR} onChange={handleSelectChange}>
        <option value="cifrar">Cifrar</option>
        <option value="descifrar">Descifrar</option>
      </select>
      {cifrar === options.CIFRAR && <Cifrador />}
      {cifrar === options.DESCIFRAR && <Descifrador />}
    </main>
  );
}
