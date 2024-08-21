import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Logo from "./Logo"; // Adjust the import path as needed

describe("Logo", () => {
  it("renders without crashing", () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders with light color", () => {
    const { container } = render(<Logo color="light" />);
    const paths = container.querySelectorAll("path");
    expect(paths[0]).toHaveAttribute("fill", "white");
    expect(paths[2]).toHaveAttribute("fill", "white");
  });

  it("renders with dark color", () => {
    const { container } = render(<Logo color="dark" />);
    const paths = container.querySelectorAll("path");
    expect(paths[0]).toHaveAttribute("fill", "#323c46");
    expect(paths[2]).toHaveAttribute("fill", "#323c46");
  });

  it("renders with default color when no color prop is provided", () => {
    const { container } = render(<Logo />);
    const paths = container.querySelectorAll("path");
    expect(paths[0]).toHaveAttribute("fill", "#323c46");
    expect(paths[2]).toHaveAttribute("fill", "#323c46");
  });

  it("passes additional props to svg element", () => {
    const { container } = render(
      <Logo className="test-class" data-testid="logo" />
    );
    const svg = container.firstChild;
    expect(svg).toHaveAttribute("class", "test-class");
    expect(svg).toHaveAttribute("data-testid", "logo");
  });

  it("renders with correct dimensions", () => {
    const { container } = render(<Logo />);
    const svg = container.firstChild;
    expect(svg).toHaveAttribute("width", "62");
    expect(svg).toHaveAttribute("height", "30");
  });

  it("renders with correct viewBox", () => {
    const { container } = render(<Logo />);
    const svg = container.firstChild;
    expect(svg).toHaveAttribute("viewBox", "0 0 62 30");
  });
});
