import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import useAppTheme from '../main/src/useAppTheme';
import {AppTheme} from '../Main/src/themes';

interface RoundButtonProps {
  style?: StyleProp<ViewStyle>;
  size?: number;
  icon: () => ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}
const RoundButton = (props: RoundButtonProps): JSX.Element => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const size = props.size ?? 38;
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          styles.container,
          {width: size, height: size, borderRadius: size / 2},
          props.style,
        ]}>
        {props.icon()}
      </View>
    </TouchableOpacity>
  );
};

export default RoundButton;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.button,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
  });
