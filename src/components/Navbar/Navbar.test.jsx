import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Navbar from "./Navbar";

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../Logos/Logo", () => ({
  default: () => <div data-testid="mock-logo">Mock Logo</div>,
}));

describe("Navbar", () => {
  const mockLogOut = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  const renderNavbar = (authState = {}) => {
    useAuth.mockReturnValue({
      user: null,
      role: null,
      logOut: mockLogOut,
      ...authState,
    });

    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it("renders the logo", () => {
    renderNavbar();
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  });

  it("renders login and signup buttons when user is not logged in", () => {
    renderNavbar();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
  });

  it("renders logout button when user is logged in", () => {
    renderNavbar({ user: { id: "1" } });
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("renders admin panel link when user is admin", () => {
    renderNavbar({ user: { id: "1" }, role: "admin" });
    expect(screen.getByText("Admin panel")).toBeInTheDocument();
  });

  it("calls logOut function when logout button is clicked", async () => {
    renderNavbar({ user: { id: "1" } });
    fireEvent.click(screen.getByText("Logout"));
    expect(mockLogOut).toHaveBeenCalled();
  });

  it("renders correct navigation links", () => {
    renderNavbar();
    expect(screen.getByText("Home")).toHaveAttribute("href", "/");
    expect(screen.getByText("About us")).toHaveAttribute("href", "/about-us");
    expect(screen.getByText("Contacts")).toHaveAttribute("href", "/contact");
  });
});
