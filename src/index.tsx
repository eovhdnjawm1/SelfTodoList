import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { RecoilRoot } from 'recoil';
import { darktheme } from './theme';
import { ThemeProvider } from 'styled-components';


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);


root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={darktheme}>
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

