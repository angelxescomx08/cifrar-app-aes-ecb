import { CardForm } from "@/app/components/card-form";
import { MantineProvider } from "@mantine/core";
import { fireEvent, render, act } from "@testing-library/react";
import { ComponentProps } from "react";

type Props = ComponentProps<typeof CardForm>;

const fileText = new File(["Contenido del archivo"], "archivo.txt", {
	type: "text/plain",
});

const fileImage = new File(["Contenido del archivo"], "archivo.png", {
	type: "image/png",
});

const getDataTransfer = (file: File) => {
	return {
		dataTransfer: {
			files: [file],
			items: [
				{
					kind: "file",
					type: file.type,
					getAsFile: () => file,
				},
			],
			types: ["Files"],
		},
	};
};

jest.mock("@mantine/form", () => ({
	...jest.requireActual("@mantine/form"),
	useForm: jest.fn(),
}));
const formMock = {
	onSubmit: jest.fn(),
	getInputProps: jest.fn(),
	values: {
		key: "",
		file: null,
	},
} as any;
const onDropMock = jest.fn();
const onRejectMock = jest.fn();
const onSubmitMock = jest.fn();

function Wrapper(props: Props) {
	return (
		<MantineProvider>
			<CardForm {...props} />
		</MantineProvider>
	);
}

describe("CardForm", () => {
	const title = "Cifrador";
	const buttonText = "Cifrar";

	it("Should render", () => {
		render(
			<Wrapper
				form={formMock}
				title={title}
				buttonText={buttonText}
				onDrop={onDropMock}
				onReject={onRejectMock}
				onSubmit={onSubmitMock}
			/>,
		);
		expect(true).toBe(true);
	});

	it("Should display title and button text", () => {
		const { getByTestId } = render(
			<Wrapper
				form={formMock}
				title={title}
				buttonText={buttonText}
				onDrop={onDropMock}
				onReject={onRejectMock}
				onSubmit={onSubmitMock}
			/>,
		);

		const titleElement = getByTestId("title");
		const buttonElement = getByTestId("button");

		expect(titleElement).toHaveTextContent(title);
		expect(buttonElement).toHaveTextContent(buttonText);
	});

	describe("Dropzone", () => {
		it("Should call onDrop when drop event is triggered", async () => {
			const { getByTestId } = render(
				<Wrapper
					form={formMock}
					title={title}
					buttonText={buttonText}
					onDrop={onDropMock}
					onReject={onRejectMock}
					onSubmit={onSubmitMock}
				/>,
			);

			const dropzoneElement = getByTestId("dropzone");

			await act(async () => {
				fireEvent.drop(dropzoneElement, getDataTransfer(fileText));
			});

			expect(onDropMock).toHaveBeenCalledTimes(1);
		});

		it("Should not call onDrop if file is not a text file", async () => {
			const { getByTestId } = render(
				<Wrapper
					form={formMock}
					title={title}
					buttonText={buttonText}
					onDrop={onDropMock}
					onReject={onRejectMock}
					onSubmit={onSubmitMock}
				/>,
			);

			const dropzoneElement = getByTestId("dropzone");

			await act(async () => {
				fireEvent.drop(dropzoneElement, getDataTransfer(fileImage));
			});

			expect(onDropMock).toHaveBeenCalledTimes(0);
		});

		it("Should render right text if not file", async () => {
			const { getByText } = render(
				<Wrapper
					form={formMock}
					title={title}
					buttonText={buttonText}
					onDrop={onDropMock}
					onReject={onRejectMock}
					onSubmit={onSubmitMock}
				/>,
			);

			const textElement = getByText(/Arrastra un archivo .txt/i);

			expect(textElement).toBeInTheDocument();
		});
	});
});
