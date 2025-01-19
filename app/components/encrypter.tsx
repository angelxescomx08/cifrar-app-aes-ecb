"use client";

import { useCipher } from "../hooks/useCipher";
import { CardForm } from "./card-form";

export const Encrypter = () => {
	const { form, onDrop, onReject, onSubmitEncrypt } = useCipher();
	return (
		<CardForm
			title="Cifrador"
			buttonText="Cifrar"
			form={form}
			onDrop={onDrop}
			onReject={onReject}
			onSubmit={onSubmitEncrypt}
		/>
	);
};
