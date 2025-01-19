import { z } from "zod";
import { FileWithPath } from "@mantine/dropzone";

export const payloadSchema = z.object({
	key: z.string().length(16, "La llave debe tener una longitud de 16 dígitos"),
	//content: z.string(),
	file: z.custom<FileWithPath | null>((file) => file?.type === "text/plain"),
});

export type Payload = z.infer<typeof payloadSchema>;
