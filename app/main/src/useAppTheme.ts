import {useTheme} from '@react-navigation/native';
import {AppTheme} from './themes';

const useAppTheme = () => useTheme() as AppTheme;

export default useAppTheme;
