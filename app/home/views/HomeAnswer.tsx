import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAppTheme from '../../main/src/useAppTheme';
import {AppTheme} from '../../Main/src/themes';
import {Home} from '../typings';
import homeConstants from '../src/homeConstants';

interface HomeAnswerProps {
  style?: StyleProp<ViewStyle>;
  option: Home.Option;
  isCorrect?: boolean;
  canShowThumb?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onPress?: (option: Home.Option) => void;
}
const HomeAnswer = (props: HomeAnswerProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const [viewWidth, setViewWidth] = useState(0);
  const [optionBackgroundAnim] = useState(new Animated.Value(0));
  const [answerBackgroundAnim, setAnswerBackgroundAnim] = useState(
    new Animated.Value(600),
  );
  const onLayout = (event: LayoutChangeEvent) => {
    const {width} = event.nativeEvent.layout;
    setViewWidth(width);
    setAnswerBackgroundAnim(new Animated.Value(width));
  };

  const renderBackgrounds = () => {
    const answerBackgroundColor = props.isCorrect
      ? theme.colors.correctAnswerBackground
      : theme.colors.wrongAnswerBackground;
    return (
      <>
        <Animated.View
          style={[
            styles.background,
            {
              backgroundColor: answerBackgroundColor,
              transform: [{translateX: answerBackgroundAnim}],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.background,
            {
              backgroundColor: theme.colors.optionBackground,
              transform: [{translateX: optionBackgroundAnim}],
            },
          ]}
        />
      </>
    );
  };

  useEffect(() => {
    if (props.isCorrect !== undefined) {
      Animated.timing(optionBackgroundAnim, {
        toValue: -viewWidth,
        duration: homeConstants.ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
      Animated.timing(answerBackgroundAnim, {
        toValue: 0,
        duration: homeConstants.ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isCorrect]);

  const renderImage = () => {
    if (props.isCorrect && props.canShowThumb) {
      return (
        <Animated.Image
          style={[
            styles.correctImage,
            {
              transform: [{translateX: answerBackgroundAnim}],
            },
          ]}
          source={require('../../../assets/animated/gif_correct.gif')}
        />
      );
    } else if (props.isCorrect === false && props.canShowThumb) {
      return (
        <Animated.Image
          style={[
            styles.wrongImage,
            {
              transform: [
                {
                  translateX: answerBackgroundAnim,
                },
              ],
            },
          ]}
          source={require('../../../assets/animated/gif_wrong.gif')}
        />
      );
    } else {
      return null;
    }
  };

  const onPress = () => {
    props.onPress?.(props.option);
  };
  return (
    <TouchableOpacity onPress={onPress} disabled={props.disabled}>
      <View style={[props.style, styles.container]} onLayout={onLayout}>
        {renderBackgrounds()}
        <Text style={styles.text} numberOfLines={3}>
          {props.option.answer}
        </Text>
        {renderImage()}
      </View>
    </TouchableOpacity>
  );
};

export default HomeAnswer;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      borderRadius: 8,
      ...theme.shadows.button,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
    },
    text: {
      margin: theme.spacings.s3,
      marginRight: 48,
      color: theme.colors.text,
      ...theme.typographies.answer,
      ...theme.shadows.textOutline,
      flex: 1,
    },
    background: {
      borderRadius: 8,
      position: 'absolute',
      right: 0,
      bottom: 0,
      left: 0,
      top: 0,
    },
    correctImage: {
      height: 56,
      width: 56,
      position: 'absolute',
      right: 0,
      top: -10,
    },
    wrongImage: {
      height: 56,
      width: 56,
      position: 'absolute',
      right: 0,
      top: 4,
    },
  });
