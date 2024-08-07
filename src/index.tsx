import { ThemeContextProvider } from '@minimalstuff/ui';
import ReactDOM from 'react-dom/client';
import { DevicesContextProvider } from '~/contexts/devices_context';
import { SettingsContextProvider } from '~/contexts/settings_context';
import { StreamContextProvider } from '~/contexts/stream_context';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ThemeContextProvider>
    <DevicesContextProvider>
      <SettingsContextProvider>
        <StreamContextProvider>
          <App />
        </StreamContextProvider>
      </SettingsContextProvider>
    </DevicesContextProvider>
  </ThemeContextProvider>
);
