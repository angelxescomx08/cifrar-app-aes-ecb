import { Input } from "@/app/components/input";
import React from "react";
import { Textarea } from "./textarea";
import { Button } from "./button";

export const Cifrador = () => {
  return (
    <form className="flex flex-col justify-center items-center">
      <Input label="Llave" name="llave" placeholder="01234567891011" />
      <Textarea
        label="Texto plano"
        name="plain-text"
        placeholder="Mensaje a cifrar"
      />
      <Button type="button">Cifrar</Button>
    </form>
  );
};
