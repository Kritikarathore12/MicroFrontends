const fs = require('fs');

const apps = [
  { dir: 'react-signup', comp: 'SignupWrapper' },
  { dir: 'react-profile', comp: 'ProfileWrapper' },
  { dir: 'react-dashboard', comp: 'DashboardWrapper' }
];

(Array.isArray(apps)?apps:[apps]).forEach(app => {
  const mainCode = `import React from 'react'
import { createRoot } from 'react-dom/client'
import Component from './${app.comp}'

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Component />
  </React.StrictMode>
)
`;
  fs.writeFileSync(`./${app.dir}/src/main.jsx`, mainCode);
  
  let html = fs.readFileSync(`./${app.dir}/index.html`, 'utf-8');
  if (!html.includes('main.jsx')) {
    html = html.replace('<div id="root"></div>', '<div id="root"></div>\n    <script type="module" src="/src/main.jsx"></script>');
    fs.writeFileSync(`./${app.dir}/index.html`, html);
  }
});
