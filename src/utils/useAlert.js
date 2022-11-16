import { useContext } from 'react';
import AlertContext from './AlertProvider';

const useAlert = () => useContext(AlertContext);

export default useAlert;