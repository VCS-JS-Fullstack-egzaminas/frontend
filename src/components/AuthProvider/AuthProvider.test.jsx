import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import AuthProvider, { AuthContext } from "./AuthProvider";
import {
  checkAuthStatus,
  checkCookie,
  login,
  logout,
  signup,
} from "../../services/userService";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../services/userService", () => ({
  checkAuthStatus: vi.fn(),
  checkCookie: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  signup: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Import the actual module
  return {
    ...actual, // Spread the actual exports so that everything else is still available
    useNavigate: () => vi.fn(), // Mock only useNavigate
  };
});

const customRender = (ui, { providerProps, ...renderOptions }) => {
  return render(
    <BrowserRouter>
      <AuthProvider {...providerProps}>{ui}</AuthProvider>
    </BrowserRouter>,
    renderOptions
  );
};

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("should render children when loading is false", async () => {
    checkCookie.mockResolvedValue(true);
    checkAuthStatus.mockResolvedValue({ data: { role: "user" } });

    customRender(<div>Test Content</div>, { providerProps: {} });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/test content/i)).toBeInTheDocument();
    });
  });

  test("should set user and role on successful auth status check", async () => {
    checkCookie.mockResolvedValue(true);
    checkAuthStatus.mockResolvedValue({ data: { role: "admin" } });

    let contextValue;
    customRender(
      <AuthContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </AuthContext.Consumer>,
      { providerProps: {} }
    );

    await waitFor(() => {
      expect(contextValue.user).not.toBeNull();
      expect(contextValue.role).toBe("admin");
    });
  });

  test("should set user to null when auth status check fails", async () => {
    checkCookie.mockResolvedValue(false);
    checkAuthStatus.mockRejectedValue(new Error("No auth cookie"));

    let contextValue;
    customRender(
      <AuthContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </AuthContext.Consumer>,
      { providerProps: {} }
    );

    await waitFor(() => {
      expect(contextValue.user).toBeNull();
    });
  });

  test("signUp should update user after signup", async () => {
    const mockUser = { email: "test@example.com", username: "testuser" };
    signup.mockResolvedValue(mockUser);

    let contextValue;
    customRender(
      <AuthContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </AuthContext.Consumer>,
      { providerProps: {} }
    );

    // Trigger the signUp function
    await contextValue.signUp("test@example.com", "testuser", "password");

    // Ensure the state is updated
    await waitFor(() => {
      expect(contextValue.user).toEqual(mockUser);
    });
  });

  test("logIn should update user and navigate to home", async () => {
    const mockUser = { email: "test@example.com", username: "testuser" };
    login.mockResolvedValue(mockUser);

    let contextValue;
    customRender(
      <AuthContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </AuthContext.Consumer>,
      { providerProps: {} }
    );

    await contextValue.logIn("test@example.com", "password");

    expect(contextValue.user).toEqual(mockUser);
    expect(contextValue.logOut).toHaveBeenCalled();
  });

  test("logOut should set user to null", async () => {
    logout.mockResolvedValue();

    let contextValue;
    customRender(
      <AuthContext.Consumer>
        {(value) => {
          contextValue = value;
          return null;
        }}
      </AuthContext.Consumer>,
      { providerProps: {} }
    );

    await contextValue.logOut();

    expect(contextValue.user).toBeNull();
  });
});
