import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";
import axe from "axe-core";

describe("Accessibility checks (axe)", () => {
  it("runs axe and reports serious/critical violations", async () => {
    const { container } = render(<App />);
    const results = await axe.run(container);
    const bad = results.violations.filter(v => v.impact === "critical" || v.impact === "serious");
    if (bad.length > 0) {
      // show violations in test output for debugging
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(bad, null, 2));
    }
    expect(bad.length).toBe(0);
  });
});
