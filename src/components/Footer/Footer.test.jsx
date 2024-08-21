import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Footer";

// Mock the Logo component
vi.mock("../Logos/Logo", () => ({
  default: () => <div data-testid="mock-logo">Mock Logo</div>,
}));

describe("Footer Component", () => {
  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  it("renders the Footer component", () => {
    renderFooter();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("displays the Logo", () => {
    renderFooter();
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  });

  it("renders the Company section with correct links", () => {
    renderFooter();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Terms & conditions")).toHaveAttribute(
      "href",
      "/terms"
    );
    expect(screen.getByText("Privacy policy")).toHaveAttribute(
      "href",
      "/privacy"
    );
    expect(screen.getByText("Careers")).toHaveAttribute("href", "./careers");
  });

  it("renders the Services section", () => {
    renderFooter();
    expect(screen.getByText("Services")).toBeInTheDocument();
    expect(screen.getByText("Car rentals")).toBeInTheDocument();
    expect(
      screen.getByText("Personal car listing for rent")
    ).toBeInTheDocument();
    expect(screen.getByText("Partnership")).toBeInTheDocument();
  });

  it("displays the copyright notice", () => {
    renderFooter();
    expect(
      screen.getByText(/2024 © VCS Rentals. All rights reserved./)
    ).toBeInTheDocument();
  });
});
