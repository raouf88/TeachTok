import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import useAppTheme from '../../main/src/useAppTheme';
import {AppTheme} from '../../Main/src/themes';
import HomeAnswer from './HomeAnswer';
import {Home} from '../typings';
import {useLazyGetAnswerQuery} from '../src/homeApi';

interface HomeMCQProps {
  style?: StyleProp<ViewStyle>;
  data: Home.Content;
}
const HomeMCQ = (props: HomeMCQProps): JSX.Element => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const [selectedOption, setSelectedOption] = useState<Home.Option | null>(
    null,
  );

  const [trigger, result] = useLazyGetAnswerQuery();

  const renderHighlightedQuestion = () => {
    return props.data.question?.split(' ').map((word, i) => (
      <Text key={i}>
        <Text style={styles.highlighted}>{word} </Text>
        {'​'}
      </Text>
    ));
  };

  const onPress = (option: Home.Option) => {
    trigger(props.data.id);
    setSelectedOption(option);
  };

  const renderAnswers = () => {
    return props.data.options?.map(option => {
      const isSelected = selectedOption?.id === option.id;
      var isCorrect: boolean | undefined;
      if (selectedOption) {
        const tempIsCorrect =
          result.data?.correct_options?.find(item => item.id === option.id) !==
          undefined;
        if (isSelected) {
          isCorrect = tempIsCorrect;
        } else if (tempIsCorrect) {
          isCorrect = true;
        }
      }
      const disabled = result.isFetching || Boolean(selectedOption);
      return (
        <HomeAnswer
          key={option.id}
          style={styles.answer}
          option={option}
          isCorrect={isCorrect}
          canShowThumb={isSelected}
          disabled={disabled}
          onPress={onPress}
        />
      );
    });
  };

  return (
    <View style={props.style}>
      <Text style={styles.question}>{renderHighlightedQuestion()}</Text>
      <View style={styles.answersContainer}>{renderAnswers()}</View>
    </View>
  );
};

export default HomeMCQ;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    question: {
      marginTop: theme.spacings.s6,
      color: theme.colors.text,
      ...theme.typographies.question,
      flex: 1,
    },
    highlighted: {
      backgroundColor: theme.colors.questionBackground,
    },
    answersContainer: {
      marginTop: theme.spacings.s4,
    },
    answer: {
      marginVertical: theme.spacings.s0,
    },
  });
