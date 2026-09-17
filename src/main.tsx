import './utils/antiClone';

// Ensure window.fetch has both getter and setter so injected scripts don't throw TypeError
if (typeof window !== 'undefined') {
  try {
    let activeFetch = window.fetch;
    const desc = Object.getOwnPropertyDescriptor(window, 'fetch');
    if (!desc || !desc.set || !desc.writable) {
      try {
        Object.defineProperty(window, 'fetch', {
          get: () => activeFetch,
          set: (fn) => { activeFetch = fn; },
          configurable: true,
          enumerable: true,
        });
      } catch {
        if (typeof Window !== 'undefined' && Window.prototype) {
          try {
            Object.defineProperty(Window.prototype, 'fetch', {
              get: () => activeFetch,
              set: (fn) => { activeFetch = fn; },
              configurable: true,
              enumerable: true,
            });
          } catch {}
        }
      }
    }
  } catch {}
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider } from './i18n/I18nContext.tsx';
import { GeoProvider } from './context/GeoContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <GeoProvider>
        <App />
      </GeoProvider>
    </I18nProvider>
  </StrictMode>,
);

