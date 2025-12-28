import React from "react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import App from "../App";
import axe from "axe-core";

describe("Accessibility dump (axe)", () => {
  it("prints all axe violations", async () => {
    const { container } = render(<App />);
    const results = await axe.run(container);
    const { violations } = results;
    if (!violations || violations.length === 0) {
      // eslint-disable-next-line no-console
      console.log('No axe violations found.');
      return;
    }
    // eslint-disable-next-line no-console
    console.log(`Found ${violations.length} violations:`);
    violations.forEach((v, i) => {
      // eslint-disable-next-line no-console
      console.log(`${i + 1}) [${v.impact || 'none'}] ${v.id}: ${v.help}`);
      // eslint-disable-next-line no-console
      console.log(`   ${v.description}`);
      // eslint-disable-next-line no-console
      console.log(`   Help: ${v.helpUrl}`);
      v.nodes.forEach((n, j) => {
        // eslint-disable-next-line no-console
        console.log(`     Node ${j + 1}: target=${n.target.join(', ')}`);
        if (n.failureSummary) {
          // eslint-disable-next-line no-console
          console.log(`       Summary: ${n.failureSummary}`);
        }
      });
    });
  });
});
