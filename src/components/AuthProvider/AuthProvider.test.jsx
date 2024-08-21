import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act } from "@testing-library/react";
import { AuthContext, default as AuthProvider } from "./AuthProvider";
import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";

// Mock the react-router-dom's useNavigate hook
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

// Mock the userService module
vi.mock("../../services/userService", () => ({
  checkAuthStatus: vi.fn(),
  checkCookie: vi.fn(),
  login: vi.fn(),
  logout: vi.fn(),
  signup: vi.fn(),
}));

describe("AuthProvider", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should check auth status on mount", async () => {
    userService.checkCookie.mockResolvedValue(true);
    userService.checkAuthStatus.mockResolvedValue({ data: { role: "user" } });

    let contextValue;
    await act(async () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
    });

    expect(userService.checkCookie).toHaveBeenCalled();
    expect(userService.checkAuthStatus).toHaveBeenCalled();
    expect(contextValue.user).toEqual({ role: "user" });
    expect(contextValue.role).toBe("user");
    expect(contextValue.loading).toBe(false);
  });

  it("should set user to null if no auth cookie", async () => {
    userService.checkCookie.mockResolvedValue(false);

    let contextValue;
    await act(async () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
    });

    expect(userService.checkCookie).toHaveBeenCalled();
    expect(userService.checkAuthStatus).not.toHaveBeenCalled();
    expect(contextValue.user).toBeNull();
    expect(contextValue.loading).toBe(false);
  });

  it("should handle signup", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    userService.signup.mockResolvedValue(mockUser);

    let contextValue;
    await act(async () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
    });

    await act(async () => {
      await contextValue.signUp("test@example.com", "testuser", "password");
    });

    expect(userService.signup).toHaveBeenCalledWith({
      email: "test@example.com",
      username: "testuser",
      password: "password",
    });
    expect(contextValue.user).toEqual(mockUser);
  });

  it("should handle login", async () => {
    const mockUser = { id: 1, email: "test@example.com" };
    userService.login.mockResolvedValue(mockUser);

    let contextValue;
    await act(async () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
    });

    await act(async () => {
      await contextValue.logIn("test@example.com", "password");
    });

    expect(userService.login).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password",
    });
    expect(contextValue.user).toEqual(mockUser);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("should handle logout", async () => {
    userService.logout.mockResolvedValue();

    let contextValue;
    await act(async () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
    });

    await act(async () => {
      await contextValue.logOut();
    });

    expect(userService.logout).toHaveBeenCalled();
    expect(contextValue.user).toBeNull();
  });

  it("should handle logout failure", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    userService.logout.mockRejectedValue(new Error("Logout failed"));

    let contextValue;
    await act(async () => {
      render(
        <AuthProvider>
          <AuthContext.Consumer>
            {(value) => {
              contextValue = value;
              return null;
            }}
          </AuthContext.Consumer>
        </AuthProvider>
      );
    });

    await act(async () => {
      await contextValue.logOut();
    });

    expect(userService.logout).toHaveBeenCalled();
    expect(contextValue.user).toBeNull();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Logout failed:",
      "Logout failed"
    );

    consoleErrorSpy.mockRestore();
  });
});
