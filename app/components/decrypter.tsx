"use client";

import React from "react";
import { CardForm } from "./card-form";
import { useCipher } from "../hooks/useCipher";

export const Decrypter = () => {
	const { form, onDrop, onReject, onSubmitEncrypt, onSubmitDecrypt } =
		useCipher();

	return (
		<CardForm
			title="Descifrador"
			buttonText="Descifrar"
			form={form}
			onDrop={onDrop}
			onReject={onReject}
			onSubmit={onSubmitDecrypt}
		/>
	);
};
