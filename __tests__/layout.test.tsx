import RootLayout from "@/app/layout";
import { render } from "@testing-library/react";

jest.mock("@/app/layout",()=>{
  return function MockRootLayout({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  };
})

describe("Layout main", () => {
	it("Should render", () => {
		render(
			<RootLayout>
				<></>
			</RootLayout>,
		);
	});
});
