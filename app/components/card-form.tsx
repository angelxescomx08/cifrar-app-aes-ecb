import { Button, Group, PasswordInput, rem, Text } from "@mantine/core";
import { Dropzone, FileRejection, FileWithPath } from "@mantine/dropzone";
import { UseFormReturnType } from "@mantine/form";
import { IconFile, IconThumbUp, IconUpload, IconX } from "@tabler/icons-react";
import { Payload } from "../types/payload";

type Props = {
	title: string;
	buttonText: string;
	form: UseFormReturnType<Payload>;
	onDrop: (files: FileWithPath[]) => void;
	onReject: (fileRejections: FileRejection[]) => void;
	onSubmit: (payload: Payload) => void;
};

export const CardForm = ({
	title,
	buttonText,
	form,
	onDrop,
	onReject,
	onSubmit,
}: Props) => {
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
				data-testid="title"
			>
				{title}
			</Text>
			<PasswordInput
				mt="md"
				label="Llave"
				placeholder="Ingrese llave"
				error="Invalid name"
				className="w-full"
				{...form.getInputProps("key")}
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
				data-testid="dropzone"
			>
				<Group justify="center" gap="xl">
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
						{form.values.file ? (
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
										{form.values.file.name}
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
			<Button type="submit" fullWidth data-testid="button">
				{buttonText}
			</Button>
		</form>
	);
};
