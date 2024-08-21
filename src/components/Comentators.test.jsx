import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Comentators from "./Comentators";

// Mock the Slider component
vi.mock("react-slick", () => {
  return {
    default: vi.fn(({ children, ...props }) => (
      <div data-testid="slider" data-slider-props={JSON.stringify(props)}>
        {children}
      </div>
    )),
  };
});

describe("Comentators", () => {
  it("renders without crashing", () => {
    render(<Comentators />);
    expect(screen.getByTestId("slider")).toBeTruthy();
  });

  it("renders the correct heading", () => {
    render(<Comentators />);
    expect(
      screen.getByText("Excellent service endorsed by our clients")
    ).toBeTruthy();
  });

  it("renders correct commentator names", () => {
    render(<Comentators />);
    expect(screen.getByText("Andrius Markevičius")).toBeTruthy();
    expect(screen.getByText("Michael Bennett")).toBeTruthy();
    expect(screen.getByText("Olive Martin")).toBeTruthy();
    expect(screen.getByText("David Johnson")).toBeTruthy();
    expect(screen.getByText("Sarah Thompson")).toBeTruthy();
    // Add assertions for the rest of the names
  });

  it("renders correct commentator messages", () => {
    render(<Comentators />);
    expect(
      screen.getByText(/Renting from VCS Rentals was a breeze!/)
    ).toBeTruthy();
    expect(
      screen.getByText(/Great experience overall with VCS Rentals./)
    ).toBeTruthy();
    expect(
      screen.getByText(/VCS Rentals exceeded my expectations!/)
    ).toBeTruthy();
    expect(
      screen.getByText(/Quick and easy rental process with VCS Rentals./)
    ).toBeTruthy();
    expect(
      screen.getByText(/VCS Rentals made my trip to the city so much easier./)
    ).toBeTruthy();
    // Add assertions for the rest of the messages
  });

  it("applies correct CSS classes", () => {
    const { container } = render(<Comentators />);
    expect(container.firstChild).toHaveClass(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "my-24"
    );
  });

  it("passes correct settings to Slider component", () => {
    render(<Comentators />);
    const slider = screen.getByTestId("slider");
    const sliderProps = JSON.parse(slider.dataset.sliderProps);

    expect(sliderProps).toEqual(
      expect.objectContaining({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        centerMode: false,
        arrows: false,
      })
    );
  });

  it("has correct responsive settings", () => {
    render(<Comentators />);
    const slider = screen.getByTestId("slider");
    const sliderProps = JSON.parse(slider.dataset.sliderProps);

    expect(sliderProps.responsive).toHaveLength(5);

    const breakpoints = [1920, 1800, 1400, 1000, 670];
    sliderProps.responsive.forEach((responsiveSetting, index) => {
      expect(responsiveSetting.breakpoint).toBe(breakpoints[index]);

      // Check for common properties
      expect(responsiveSetting.settings).toHaveProperty("slidesToShow");
      expect(responsiveSetting.settings).toHaveProperty("slidesToScroll");
      expect(responsiveSetting.settings).toHaveProperty("centerMode");

      // Check specific properties based on breakpoint
      if (index < 3) {
        // For breakpoints 1920, 1800, and 1400
        expect(responsiveSetting.settings).toHaveProperty("infinite", true);
        expect(responsiveSetting.settings).toHaveProperty("dots", true);
      } else if (index === 3) {
        // For breakpoint 1000
        expect(responsiveSetting.settings).toHaveProperty("initialSlide", 2);
      }
      // For the last breakpoint (670), we don't check for additional properties
    });

    // Additional checks for specific breakpoints
    expect(sliderProps.responsive[0].settings.slidesToShow).toBe(4);
    expect(sliderProps.responsive[2].settings.slidesToShow).toBe(3);
    expect(sliderProps.responsive[3].settings.slidesToShow).toBe(2);
    expect(sliderProps.responsive[4].settings.slidesToShow).toBe(1);
  });
});
