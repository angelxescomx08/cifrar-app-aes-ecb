import Home from "@/app/page";
import { MantineProvider } from "@mantine/core";
import { render, screen } from "@testing-library/react";

describe("App main", () => {
	test("Should be wrapped in a main tag", () => {
		render(
			<MantineProvider>
				<Home />
			</MantineProvider>,
		);

		const main = screen.getByRole("main");

		expect(main).toBeInTheDocument();
	});
});
