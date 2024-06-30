import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { getDevices } from '~/lib/devices';

export type Devices = MediaDeviceInfo[];

const DevicesContext = createContext<{ devices: Devices }>({
  devices: [],
});

function DevicesContextProvider({ children }: PropsWithChildren) {
  const [devices, setDevices] = useState<Devices>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getDevices()
      .then(setDevices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DevicesContext.Provider value={{ devices }}>
      {loading ? 'Loading devices...' : children}
    </DevicesContext.Provider>
  );
}

export { DevicesContextProvider, DevicesContext as _DevicesContext };
