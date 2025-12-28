import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App smoke", () => {
  it("renders home link", () => {
    render(<App />);

    const link = screen.getByText(/Smart Kids/i);
    expect(link).toBeDefined();
  });
});
