import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { useForm } from "@mantine/form";
import CryptoJS from "crypto-js";
import { readFileContent } from "../utils/read-file";
import { Button, Group, PasswordInput, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconFile, IconThumbUp } from "@tabler/icons-react";
import { downloadFile } from "../utils/create-file";
import { useState } from "react";

export const Descifrador = () => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      llave: "",
      cypheredText: "",
    },
    validate: {
      llave: (valor) =>
        valor.length === 16
          ? null
          : "La llave debe tener una longitud de 16 dígitos",
    },
  });

  const onDrop = async (files: FileWithPath[]) => {
    const content = await readFileContent(files[0]);
    setFile(files[0]);
    form.setFieldValue("cypheredText", content);
  };

  const onReject = (files: FileRejection[]) => {
    console.log(files);
  };

  const onSubmit = ({
    llave,
    cypheredText,
  }: {
    llave: string;
    cypheredText: string;
  }) => {
    const bytes = CryptoJS.AES.decrypt(cypheredText, llave);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    downloadFile(originalText, "decrypted.txt");
  };

  return (
    <form
      onSubmit={form.onSubmit(onSubmit)}
      className="flex flex-col justify-center items-center gap-4 bg-slate-100 p-4 w-96 m-4 shadow-xl border-slate-300 border rounded-md"
    >
      <Text
        size="xl"
        fw={900}
        variant="gradient"
        gradient={{ from: "blue", to: "cyan", deg: 90 }}
      >
        Descifrador
      </Text>
      <PasswordInput
        mt="md"
        label="Llave"
        placeholder="Ingrese llave"
        error="Invalid name"
        className="w-full"
        {...form.getInputProps("llave")}
      />

      <Dropzone
        onDrop={onDrop}
        onReject={onReject}
        accept={{
          "text/plain": [".txt"],
        }}
        maxFiles={1}
        style={{
          width: "100%",
        }}
      >
        <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <div className="flex justify-around items-center w-full">
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
              <div>
                <Text size="xl" inline>
                  Archivo válido
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  El archivo tiene un formato válido
                </Text>
              </div>
            </div>
          </Dropzone.Accept>
          <Dropzone.Reject>
            <div className="flex justify-around items-center w-full">
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
              <div>
                <Text size="xl" inline>
                  Archivo no válido
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                  El archivo no tiene un formato válido
                </Text>
              </div>
            </div>
          </Dropzone.Reject>
          <Dropzone.Idle>
            {file ? (
              <div className="flex justify-around items-center w-full">
                <IconThumbUp
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
                <div>
                  <Text size="xl" inline>
                    {file.name}
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Archivo aceptado
                  </Text>
                </div>
              </div>
            ) : (
              <div className="flex justify-around items-center w-full">
                <IconFile
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-dimmed)",
                  }}
                  stroke={1.5}
                />
                <div>
                  <Text size="xl" inline>
                    Arrastra un archivo .txt
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Solo se aceptan archivos .txt
                  </Text>
                </div>
              </div>
            )}
          </Dropzone.Idle>
        </Group>
      </Dropzone>
      <Button type="submit" fullWidth>
        Descifrar
      </Button>
    </form>
  );
};
