import { useContext } from 'react';
import { _SettingsContext } from '~/contexts/settings_context';

const useSettings = () => useContext(_SettingsContext);
export default useSettings;
