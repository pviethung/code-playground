import { Cell } from './state';

export const initialData = {
  loading: false,
  data: {
    '1983lllu8zom0udrc1y319uj': {
      id: '1983lllu8zom0udrc1y319uj',
      content:
        "import React from 'react'\nimport ReactDOM from 'react-dom'\n\nconst root = ReactDOM.createRoot(\n  document.getElementById('root')\n);\nconst App = () => <h1> Hello World </h1>\nroot.render(\n    <App />\n);",
      type: 'code',
    } as Cell,
    'deqcllllfu0xto7yd9bw7n': {
      id: 'deqcllllfu0xto7yd9bw7n',
      content: '',
      type: 'text',
    } as Cell,
  },
  order: ['1983lllu8zom0udrc1y319uj', 'deqcllllfu0xto7yd9bw7n'],
};
