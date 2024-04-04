import React from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";

export const Descifrador = () => {
  return (
    <form className="flex flex-col justify-center items-center w-full max-w-full">
      <Input label="Llave" name="llave" placeholder="01234567891011" />
      <Textarea
        label="Texto cifrado"
        name="cipher-text"
        placeholder="Mensaje a descifrar"
      />
      <Button type="button">Descifrar</Button>
    </form>
  );
};
