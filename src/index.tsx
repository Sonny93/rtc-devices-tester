import '@minimalstuff/ui/style.css';
import ReactDOM from 'react-dom/client';
import 'virtual:uno.css';
import { DevicesContextProvider } from '#/contexts/devices_context';
import { SettingsContextProvider } from '#/contexts/settings_context';
import { StreamContextProvider } from '#/contexts/stream_context';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <DevicesContextProvider>
    <SettingsContextProvider>
      <StreamContextProvider>
        <App />
      </StreamContextProvider>
    </SettingsContextProvider>
  </DevicesContextProvider>
);
