import Home from '@/app/page'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '@mantine/core'

describe("App main",()=>{

  test("Should be wrapped in a main tag",()=>{
    render(
    <MantineProvider>
      <Home />
    </MantineProvider>
    )

    const main = screen.getByRole("main")

    expect(main).toBeInTheDocument()
  })
})