import { Cifrador } from "@/app/components/cifrador";
import { MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";

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
	});
	it("");
});
