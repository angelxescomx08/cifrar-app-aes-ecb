import { CardForm } from "@/app/components/card-form";
import { MantineProvider } from "@mantine/core";
import { fireEvent, render, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ComponentProps } from "react";
import { Simulate } from "react-dom/test-utils";

type Props = ComponentProps<typeof CardForm>;

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
});
