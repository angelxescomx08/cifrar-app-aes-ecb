import { Input } from "@/app/components/input";
import React, { useState } from "react";
import { Textarea } from "./textarea";
import { Button } from "./button";
import zod from "zod";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@mui/material";
import CryptoJS from "crypto-js";

const schema = zod.object({
  llave: zod.string().length(16),
  "plain-text": zod.string(),
});

type schemaType = zod.infer<typeof schema>;

export const Cifrador = () => {
  const [open, setOpen] = useState(false);
  const [cipheredText, setCipheredText] = useState("");

  const { register, handleSubmit } = useForm<schemaType>({
    resolver: zodResolver(schema),
    values: {
      llave: "",
      "plain-text": "",
    },
  });

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onValid = (data: schemaType) => {
    const encrypted = CryptoJS.AES.encrypt(
      data["plain-text"].trim(),
      data.llave.trim()
    ).toString();
    setCipheredText(encrypted);
    handleOpenDialog();
  };

  const onInvalid = (data: FieldErrors<schemaType>) => {};

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="flex flex-col justify-center items-center w-full"
      >
        <Input
          type="password"
          register={register}
          label="Llave"
          name="llave"
          placeholder="01234567891011"
        />
        <Textarea
          register={register}
          label="Texto plano"
          name="plain-text"
          placeholder="Mensaje a cifrar"
        />
        <Button type="submit">Cifrar</Button>
      </form>

      <Dialog open={open} onClose={handleCloseDialog}>
        <div className="flex flex-col justify-center items-center w-[600px] h-[600px] max-w-full max-h-dvh">
          <h1 className="font-bold mb-5 text-2xl">Texto cifrado</h1>
          <textarea
            className="w-2/3 h-[400px] border border-gray-300 p-5"
            value={cipheredText}
            onChange={(e) => {
              setCipheredText(e.target.value);
            }}
          ></textarea>
        </div>
      </Dialog>
    </div>
  );
};
