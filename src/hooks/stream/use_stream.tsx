import { useContext } from 'react';
import { _StreamContext } from '~/contexts/stream_context';

const useStream = () => useContext(_StreamContext);
export default useStream;
