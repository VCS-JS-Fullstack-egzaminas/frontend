import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Search from "./Search";

describe("Search Component", () => {
  it("renders the Search component", () => {
    render(<Search />);
    expect(
      screen.getByText("Drive in Style, Rent with Smiles")
    ).toBeInTheDocument();
  });

  it("displays the correct headline", () => {
    render(<Search />);
    const headline = screen.getByRole("heading", { level: 1 });
    expect(headline).toHaveTextContent("Drive in Style, Rent with Smiles");
  });

  it("displays the correct mission statement", () => {
    render(<Search />);
    expect(
      screen.getByText(
        "Our mission is simple - to provide you with top-tier car rental services."
      )
    ).toBeInTheDocument();
  });

  it("has the correct CSS classes for styling", () => {
    const { container } = render(<Search />);

    // Check main container classes
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass(
      "search-main",
      "bg-black/20",
      "bg-blend-darken",
      "flex",
      "justify-center"
    );

    // Check inner container classes
    const innerDiv = mainDiv.firstChild;
    expect(innerDiv).toHaveClass("container", "px-6", "py-12");

    // Check headline classes
    const headline = screen.getByRole("heading", { level: 1 });
    expect(headline).toHaveClass(
      "leading-none",
      "text-left",
      "font-extrabold",
      "text-white",
      "text-4xl",
      "sm:text-5xl"
    );

    // Check paragraph classes
    const paragraph = screen.getByText(
      "Our mission is simple - to provide you with top-tier car rental services."
    );
    expect(paragraph).toHaveClass("text-lg", "sm:text-xl", "text-white");
  });

  it("has the correct structure", () => {
    const { container } = render(<Search />);

    expect(container.querySelector(".search-main")).toBeInTheDocument();
    expect(container.querySelector(".container")).toBeInTheDocument();
    expect(
      container.querySelector(".flex.flex-col.lg\\:flex-row")
    ).toBeInTheDocument();
    expect(container.querySelector(".grid.gap-2")).toBeInTheDocument();
  });
});
