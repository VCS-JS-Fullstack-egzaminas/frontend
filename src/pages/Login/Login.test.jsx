import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useAuth } from "../../hooks/useAuth";

// Mock the hooks and components
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});
vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));
vi.mock("../../components/ui/Button", () => ({
  default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));
vi.mock("../../components/ui/Card", () => ({
  default: ({ children }) => <div data-testid="card">{children}</div>,
}));
vi.mock("../../components/ui/Input", () => ({
  default: (props) => <input {...props} />,
}));
vi.mock("../../components/ui/Label", () => ({
  default: ({ children, ...props }) => <label {...props}>{children}</label>,
}));
vi.mock("react-helmet", () => ({
  // eslint-disable-next-line react/prop-types
  Helmet: ({ children }) => <div data-testid="helmet-mock">{children}</div>,
}));

describe("Login Component", () => {
  const mockLogIn = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ user: null, logIn: mockLogIn });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it("renders the login form", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("updates email and password state on input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  it("calls logIn function on form submission", async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Log in" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("navigates to home page if user is already logged in", async () => {
    useAuth.mockReturnValue({ user: { id: 1 }, logIn: mockLogIn });
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("displays the signup link", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const signupLink = screen.getByText("Sign up");
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute("href", "/auth/signup");
  });

  it("sets the correct page title", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByTestId("helmet-mock")).toHaveTextContent("Login");
  });
});
