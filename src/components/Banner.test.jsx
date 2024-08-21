import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Banner from "./Banner"; // Adjust the import path as needed

describe("Banner", () => {
  it("renders five star icons", () => {
    render(<Banner />);
    const stars = screen.getAllByText("★");
    expect(stars).toHaveLength(5);
  });

  it("renders the correct heading text", () => {
    render(<Banner />);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent(
      "Drive in style, rent with a smile - that's the VCS Rental way."
    );
  });

  it("renders the correct paragraph text", () => {
    render(<Banner />);
    const paragraph = screen.getByText(
      /Premium Service - Competitive Pricing - Diverse Fleet Selection - Professional Excellence/i
    );
    expect(paragraph).toBeTruthy();
  });

  it("has the correct CSS classes for responsive design", () => {
    const { container } = render(<Banner />);
    const bannerContainer = container.firstChild;
    expect(bannerContainer).toHaveClass("banner-container2");
    expect(bannerContainer).toHaveClass("grid");
    expect(bannerContainer).toHaveClass("grid-cols-1");
    expect(bannerContainer).toHaveClass("lg:grid-cols-3");
  });

  it("applies correct CSS classes to the banner message", () => {
    const { container } = render(<Banner />);
    const bannerMessage = container.querySelector(".banner-message");
    expect(bannerMessage).toHaveClass("flex");
    expect(bannerMessage).toHaveClass("flex-col");
    expect(bannerMessage).toHaveClass("gap-4");
    expect(bannerMessage).toHaveClass("mx-16");
    expect(bannerMessage).toHaveClass("my-12");
  });
});
