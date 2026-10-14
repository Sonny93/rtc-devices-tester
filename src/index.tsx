import '@minimalstuff/ui/style.css';
import 'virtual:uno.css';

import ReactDOM from 'react-dom/client';

import App from './app';
import { StreamContextProvider } from '#/contexts/stream_context';
import { DevicesContextProvider } from '#/contexts/devices_context';
import { SettingsContextProvider } from '#/contexts/settings_context';

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
