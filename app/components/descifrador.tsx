import React, { useState } from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";
import Dialog from "@mui/material/Dialog";
import { FieldErrors, useForm } from "react-hook-form";
import zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CryptoJS from "crypto-js";

const schema = zod.object({
  llave: zod.string().length(16),
  "cipher-text": zod.string(),
});

type schemaType = zod.infer<typeof schema>;

export const Descifrador = () => {
  const [open, setOpen] = useState(false);
  const [decipheredText, setDecipheredText] = useState("");

  const { register, handleSubmit } = useForm<schemaType>({
    resolver: zodResolver(schema),
    values: {
      llave: "",
      "cipher-text": "",
    },
  });

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const onValid = (data: schemaType) => {
    const bytes = CryptoJS.AES.decrypt(
      data["cipher-text"].trim(),
      data.llave.trim()
    );
    const originalText = bytes.toString(CryptoJS.enc.Utf8);

    setDecipheredText(originalText);
    handleOpenDialog();
  };

  const onInvalid = (data: FieldErrors<schemaType>) => {};

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="flex flex-col justify-center items-center w-full max-w-full"
      >
        <Input
          type="password"
          register={register}
          label="Llave"
          name="llave"
          placeholder="0123456789ABCDEF"
        />
        <Textarea
          register={register}
          label="Texto cifrado"
          name="cipher-text"
          placeholder="Mensaje a descifrar"
        />
        <Button type="submit">Descifrar</Button>
      </form>
      <Dialog open={open} onClose={handleCloseDialog}>
        <div className="flex flex-col justify-center items-center w-[600px] h-[600px] max-w-full max-h-dvh">
          <h1 className="font-bold mb-5 text-2xl">Texto descifrado</h1>
          <textarea
            className="w-2/3 h-[400px] border border-gray-300 p-5"
            value={decipheredText}
            onChange={(e) => {
              setDecipheredText(e.target.value);
            }}
          ></textarea>
        </div>
      </Dialog>
    </div>
  );
};
