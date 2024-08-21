import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Fleet from "./Fleet";
import { getAllListings } from "../services/listingsService";

// Mock the listingsService
vi.mock("../services/listingsService", () => ({
  getAllListings: vi.fn(),
}));

// Mock the Helmet component
vi.mock("react-helmet", () => ({
  // eslint-disable-next-line react/prop-types
  Helmet: ({ children }) => <div data-testid="helmet-mock">{children}</div>,
}));

describe("Fleet Component", () => {
  const mockListings = [
    {
      id: "1",
      _id: "1",
      title: "Car 1",
      size: "Mini",
      year: "2020",
      transmission: "Auto",
      fuelType: "Petrol",
      price: "50",
      photos: ["car1.jpg"],
    },
    {
      id: "2",
      _id: "2",
      title: "Car 2",
      size: "Economic",
      year: "2021",
      transmission: "Manual",
      fuelType: "Diesel",
      price: "60",
      photos: ["car2.jpg"],
    },
    {
      id: "3",
      _id: "3",
      title: "Car 3",
      size: "SUV",
      year: "2022",
      transmission: "Auto",
      fuelType: "Electric",
      price: "70",
      photos: ["car3.jpg"],
    },
  ];

  beforeEach(() => {
    getAllListings.mockResolvedValue({ data: mockListings });
  });

  const renderFleet = () => {
    return render(
      <BrowserRouter>
        <Fleet />
      </BrowserRouter>
    );
  };

  it("renders the Fleet component", async () => {
    renderFleet();
    expect(
      screen.getByText(
        "Discover the Perfect Ride: Introducing the VCS Rental Fleet in Lithuania"
      )
    ).toBeInTheDocument();
    await waitFor(() => expect(getAllListings).toHaveBeenCalled());
  });

  it("displays the correct page title", () => {
    renderFleet();
    expect(screen.getByTestId("helmet-mock")).toHaveTextContent("All Fleet");
  });

  it("renders filter buttons", () => {
    renderFleet();
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mini" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Economic" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Compact" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Medium" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Standard" })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "SUV" })).toBeInTheDocument();
  });

  it("fetches and displays listings", async () => {
    renderFleet();
    await waitFor(() => {
      expect(screen.getByText("Car 1")).toBeInTheDocument();
      expect(screen.getByText("Car 2")).toBeInTheDocument();
      expect(screen.getByText("Car 3")).toBeInTheDocument();
    });
  });

  it("filters cars correctly", async () => {
    renderFleet();
    await waitFor(() => expect(screen.getByText("Car 1")).toBeInTheDocument());

    fireEvent.click(screen.getByRole("button", { name: "Mini" }));

    await waitFor(() => {
      expect(screen.getByText("Car 1")).toBeInTheDocument();
      expect(screen.queryByText("Car 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Car 3")).not.toBeInTheDocument();
    });
  });

  it("renders Reserve buttons with correct links", async () => {
    renderFleet();
    await waitFor(() => expect(screen.getByText("Car 1")).toBeInTheDocument());

    const reserveButtons = screen.getAllByText("Reserve");
    expect(reserveButtons[0]).toHaveAttribute("href", "/car/1");
    expect(reserveButtons[1]).toHaveAttribute("href", "/car/2");
    expect(reserveButtons[2]).toHaveAttribute("href", "/car/3");
  });

  it("handles errors when fetching listings", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    getAllListings.mockRejectedValue(new Error("Fetch error"));

    renderFleet();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error Fetching Entries",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
