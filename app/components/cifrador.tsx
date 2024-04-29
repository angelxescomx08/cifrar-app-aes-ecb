import CryptoJS from "crypto-js";
import { Button, Group, PasswordInput, Text, rem } from "@mantine/core";
import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { readFileContent } from "../utils/read-file";
import { downloadFile } from "../utils/create-file";

export const Cifrador = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      llave: "",
      plainText: "",
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
    form.setFieldValue("plainText", content);
  };

  const onReject = (files: FileRejection[]) => {
    console.log(files);
  };

  const onSubmit = ({
    llave,
    plainText,
  }: {
    llave: string;
    plainText: string;
  }) => {
    console.log({
      llave,
      plainText,
    });
    const encrypted = CryptoJS.AES.encrypt(plainText, llave).toString();
    downloadFile(encrypted, "encrypted.txt");
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
        Cifrador
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
      >
        <Group justify="center" gap="xl" style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              Arrastra un archivo .txt
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Solo se aceptan archivos .txt
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Button type="submit" fullWidth>
        Cifrar
      </Button>
    </form>
  );
};
