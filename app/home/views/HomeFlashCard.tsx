import {
  LayoutAnimation,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useAppTheme from '../../main/src/useAppTheme';
import {AppTheme} from '../../Main/src/themes';
import {Home} from '../typings';
import {useTranslation} from 'react-i18next';
import homeConstants from '../src/homeConstants';

interface HomeFlashCardProps {
  style?: StyleProp<ViewStyle>;
  data: Home.Content;
  isFlipped: boolean;
  flip?: () => void;
}
const HomeFlashCard = (props: HomeFlashCardProps): JSX.Element => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const {t} = useTranslation();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  useEffect(() => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: homeConstants.ANIMATION_DURATION,
    });
  }, [props.isFlipped]);

  const renderRatings = () => {
    return theme.colors.ratings
      .map((item, index) => {
        return {number: index + 1, color: item};
      })
      .map((item, index) => {
        const onPress = () => {
          setSelectedRating(item.number);
          LayoutAnimation.configureNext({
            ...LayoutAnimation.Presets.linear,
            duration: homeConstants.ANIMATION_DURATION,
          });
        };
        const ratingStyles = [
          styles.ratingContainer,
          {backgroundColor: item.color},
          selectedRating === item.number
            ? styles.ratingExpandedContainer
            : null,
        ];
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            disabled={Boolean(selectedRating)}
            style={ratingStyles}>
            <Text style={styles.ratingText}>{item.number}</Text>
          </TouchableOpacity>
        );
      });
  };

  const renderAnswer = () => {
    if (props.isFlipped) {
      return (
        <>
          <View style={styles.topContainer}>
            <View style={styles.separator} />
            <Text style={styles.answerHeading}>
              {t('home.flash_card.answer_heading')}
            </Text>
            <Text style={styles.answer} numberOfLines={12} ellipsizeMode="tail">
              {props.data.flashcard_back}
            </Text>
          </View>

          <View>
            <Text style={styles.ratingHeading}>
              {t('home.flash_card.rating_heading')}
            </Text>
            <View style={styles.ratingsContainer}>{renderRatings()}</View>
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback onPress={props.flip}>
      <View style={[props.style, styles.container]}>
        <Text style={styles.question}>{props.data.flashcard_front}</Text>
        {renderAnswer()}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeFlashCard;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingTop: theme.spacings.s4,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    question: {
      color: theme.colors.text,
      ...theme.typographies.flashCard,
    },
    topContainer: {
      flexGrow: 1,
      alignSelf: 'stretch',
    },
    separator: {
      borderWidth: 1,
      marginVertical: theme.spacings.s5,
      borderColor: theme.colors.separator,
      ...theme.typographies.flashCard,
    },
    answerHeading: {
      color: theme.colors.flashCardHeading,
      ...theme.typographies.flashCardHeading,
    },
    answer: {
      color: theme.colors.flashCardAnswer,
      ...theme.typographies.flashCard,
    },
    ratingHeading: {
      color: theme.colors.secondaryText,
      ...theme.typographies.flashCardRating,
    },
    ratingsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginTop: theme.spacings.s0,
    },
    ratingContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      overflow: 'hidden',
      marginRight: theme.spacings.s1,
      height: 52,
    },
    ratingExpandedContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      zIndex: 10,
    },
    ratingText: {
      color: theme.colors.text,
      ...theme.typographies.rating,
    },
  });
