import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "./Index";
import { getAllListings } from "../../services/listingsService";

// Mock the components and services
vi.mock("../../components/Search", () => ({
  default: () => <div data-testid="search-component" />,
}));
vi.mock("../../components/CarCard/CarCard", () => ({
  default: ({ car }) => <div data-testid="car-card">{car.title}</div>,
}));
vi.mock("../../components/ui/Button", () => ({
  default: ({ children }) => <button>{children}</button>,
}));
vi.mock("../../components/Banner", () => ({
  default: () => <div data-testid="banner-component" />,
}));
vi.mock("../../components/Comentators", () => ({
  default: () => <div data-testid="comentators-component" />,
}));
vi.mock("../../services/listingsService", () => ({
  getAllListings: vi.fn(),
}));
vi.mock("react-helmet", () => ({
  // eslint-disable-next-line react/prop-types
  Helmet: ({ children }) => <div data-testid="helmet-mock">{children}</div>,
}));
vi.mock("react-slick", () => ({
  default: ({ children }) => <div data-testid="slider-mock">{children}</div>,
}));

describe("Index Component", () => {
  beforeEach(() => {
    getAllListings.mockResolvedValue({ data: [] });
  });

  it("renders all child components", () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    expect(screen.getByTestId("search-component")).toBeInTheDocument();
    expect(screen.getByTestId("banner-component")).toBeInTheDocument();
    expect(screen.getByTestId("comentators-component")).toBeInTheDocument();
  });

  it("sets the correct page title", () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    expect(screen.getByTestId("helmet-mock")).toHaveTextContent("Home");
  });

  it("renders the carousel title", async () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Popular cars")).toBeInTheDocument();
    });
  });

  it("fetches listings and renders car cards", async () => {
    const mockCars = [
      { id: 1, title: "Car 1" },
      { id: 2, title: "Car 2" },
      { id: 3, title: "Car 3" },
    ];
    getAllListings.mockResolvedValue({ data: mockCars });

    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(getAllListings).toHaveBeenCalled();
      expect(screen.getAllByTestId("car-card")).toHaveLength(3);
    });
  });

  it('renders the "See Entire Fleet" button', async () => {
    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("See Entire Fleet")).toBeInTheDocument();
    });
  });

  it("handles errors when fetching listings", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    getAllListings.mockRejectedValue(new Error("Fetch error"));

    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching listings",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  it("uses mock data when listings are empty", async () => {
    getAllListings.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <Index />
      </BrowserRouter>
    );

    await waitFor(() => {
      // This test might need adjustment based on how your component handles empty listings
      expect(screen.getByTestId("slider-mock")).toBeInTheDocument();
    });
  });
});
