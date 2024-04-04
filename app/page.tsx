"use client";

import { ChangeEvent, useState } from "react";
import { Cifrador } from "./components/cifrador";
import { Descifrador } from "./components/descifrador";
import { Select } from "./components/select";

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
    <main className="flex justify-center items-center h-dvh flex-col gap-4">
      <div className="w-96 max-w-full bg-[#F5ECFF] p-5 rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-5">
          AES ECB 128 bits
        </h1>
        <Select
          name="options"
          label="¿Qué deseas hacer?"
          options={Object.values(options)}
          onChange={handleSelectChange}
        />
        {cifrar === options.CIFRAR && <Cifrador />}
        {cifrar === options.DESCIFRAR && <Descifrador />}
      </div>
    </main>
  );
}
