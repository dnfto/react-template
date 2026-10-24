import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { bootstrapApp } from '@/app/bootstrap';
import '@/styles/globals.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

async function renderApp() {
  await bootstrapApp();

  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

void renderApp();
