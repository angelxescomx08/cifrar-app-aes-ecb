import { useForm, zodResolver } from "@mantine/form";
import { Payload, payloadSchema } from "../types/payload";
import { FileRejection, FileWithPath } from "@mantine/dropzone";
import toast from "react-hot-toast";
import { downloadFile } from "../utils/create-file";
import { readFileContent } from "../utils/read-file";
import CryptoJS from "crypto-js";

export const useCipher = () => {
	const form = useForm<Payload>({
		mode: "uncontrolled",
		initialValues: {
			key: "",
			file: null,
		},
		validate: zodResolver(payloadSchema),
	});

	const onDrop = async (files: FileWithPath[]) => {
		form.setFieldValue("file", files[0]);
	};

	const onReject = (filesRejections: FileRejection[]) => {
		toast.error("El archivo no es un archivo de texto");
	};

	const onSubmitEncrypt = async ({ key, file }: Payload) => {
		if (!file) {
			toast.error("Debes seleccionar un archivo");
			return;
		}
		const plainText = await readFileContent(file satisfies File);
		const encrypted = CryptoJS.AES.encrypt(plainText, key).toString();
		downloadFile(encrypted, "encrypted.txt");
	};

	const onSubmitDecrypt = async ({ key, file }: Payload) => {
		if (!file) {
			toast.error("Debes seleccionar un archivo");
			return;
		}
		const cypheredText = await readFileContent(file satisfies File);

		const bytes = CryptoJS.AES.decrypt(cypheredText, key);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		downloadFile(originalText, "decrypted.txt");
	};

	return {
		form,
		onDrop,
		onReject,
		onSubmitEncrypt,
		onSubmitDecrypt,
	};
};
