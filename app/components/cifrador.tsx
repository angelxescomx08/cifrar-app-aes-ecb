import CryptoJS from "crypto-js";
import { Button, Group, PasswordInput, Text, rem } from "@mantine/core";
import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { readFileContent } from "../utils/read-file";
import { downloadFile } from "../utils/create-file";

/* const schema = zod.object({
  llave: zod.string().length(16),
  "plain-text": zod.string(),
});

type schemaType = zod.infer<typeof schema>; */

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
    <div>
      <form
        onSubmit={form.onSubmit(onSubmit)}
        className="flex flex-col justify-center items-center w-full gap-4"
      >
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
                Arrastra un archivo .txt cifrado
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
    </div>
  );
};
