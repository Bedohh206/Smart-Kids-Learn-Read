const fetch = require('node-fetch');
const { JSDOM } = require('jsdom');
const axe = require('axe-core');

async function run() {
  const url = 'http://localhost:5173/';
  console.log('Fetching', url);
  const res = await fetch(url);
  const html = await res.text();

  const dom = new JSDOM(html, { url, runScripts: 'dangerously', resources: 'usable' });
  const { window } = dom;

  // Attach globals for axe
  global.window = window;
  global.Node = window.Node;
  global.Element = window.Element;
  global.HTMLElement = window.HTMLElement;
  global.document = window.document;

  try {
    const results = await axe.run(window.document);
    const { violations } = results;
    if (!violations || violations.length === 0) {
      console.log('No axe violations found.');
      return;
    }

    console.log(`Found ${violations.length} violation(s):\n`);
    violations.forEach((v, i) => {
      console.log(`${i + 1}. [${v.impact}] ${v.id} — ${v.help}`);
      console.log(`   Description: ${v.description}`);
      console.log(`   Help: ${v.helpUrl}`);
      v.nodes.forEach((n, j) => {
        console.log(`     Node ${j + 1}:`);
        console.log(`       Target: ${n.target.join(', ')}`);
        if (n.failureSummary) console.log(`       Summary: ${n.failureSummary}`);
      });
      console.log('');
    });

    const fs = require('fs');
    fs.writeFileSync('axe-report.json', JSON.stringify(results, null, 2));
    console.log('Full report written to axe-report.json');
  } catch (err) {
    console.error('Error running axe:', err);
  }
}

run();
