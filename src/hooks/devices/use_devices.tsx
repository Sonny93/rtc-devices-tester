import { useContext } from 'react';
import { _DevicesContext } from '~/contexts/devices_context';

const useDevices = () => useContext(_DevicesContext);
export default useDevices;
