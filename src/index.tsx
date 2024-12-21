import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import ReactDOM from 'react-dom/client';
import { DevicesContextProvider } from '~/contexts/devices_context';
import { SettingsContextProvider } from '~/contexts/settings_context';
import { StreamContextProvider } from '~/contexts/stream_context';
import App from './app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MantineProvider defaultColorScheme="dark">
    <DevicesContextProvider>
      <SettingsContextProvider>
        <StreamContextProvider>
          <App />
        </StreamContextProvider>
      </SettingsContextProvider>
    </DevicesContextProvider>
  </MantineProvider>
);
