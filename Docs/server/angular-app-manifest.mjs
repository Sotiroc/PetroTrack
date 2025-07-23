
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/petrotrack',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/petrotrack/dashboard",
    "route": "/petrotrack"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-72W2K27D.js",
      "chunk-ZEI36HEG.js"
    ],
    "route": "/petrotrack/dashboard"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-R2XDAIGX.js",
      "chunk-ZEI36HEG.js"
    ],
    "route": "/petrotrack/calculate-cost"
  },
  {
    "renderMode": 2,
    "redirectTo": "/petrotrack/dashboard",
    "route": "/petrotrack/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 11273, hash: 'e4a762e01a9ee00541f64616f7a3aecfbd414c324292f30f57df16ab9a6ab8b9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1009, hash: '039f75a9032716a2bd1ae849b95dc052690ed7da98c254a513c05ac241ca9741', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'calculate-cost/index.html': {size: 24715, hash: '2cc1074d43a4f3823599a5b1eea53d9315e9d602807ac5b1ddf71de6bc1a845d', text: () => import('./assets-chunks/calculate-cost_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 31312, hash: 'e672add2670dafbba1636b367826792cb2b05343af31141f95ba7509a5986907', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'styles-C45TZ6OZ.css': {size: 10652, hash: '+OndY409c/0', text: () => import('./assets-chunks/styles-C45TZ6OZ_css.mjs').then(m => m.default)}
  },
};
