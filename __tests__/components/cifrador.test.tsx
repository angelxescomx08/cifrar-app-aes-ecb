import { Cifrador } from "@/app/components/cifrador";
import { MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";
import user from "@testing-library/user-event";

function Wrapper() {
	return (
		<MantineProvider>
			<Cifrador />
		</MantineProvider>
	);
}

describe("Cifrador", () => {
	it("Should render", () => {
		render(<Wrapper />);
		expect(true).toBe(true);
	});

	it("Should call onDrop", () => {
		const onDropSpy = jest.spyOn(Cifrador.prototype, "onDrop");
		const { getByTestId } = render(<Wrapper />);

		const dropzone = getByTestId("dropzone");
		const file = new File([""], "file.txt", { type: "text/plain" });
		user.upload(dropzone, file);

		expect(onDropSpy).toHaveBeenCalled();
		expect(onDropSpy).toHaveBeenCalledWith([file]);
	});
});
