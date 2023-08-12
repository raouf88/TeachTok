import {DarkTheme, Theme} from '@react-navigation/native';
import {TextStyle, ViewStyle} from 'react-native';

export interface AppTheme extends Theme {
  colors: Theme['colors'] & {
    active: string;
    inactive: string;
    secondaryText: string;
    gradientBackground: Array<string>;
    secondaryBackground: string;
    button: string;
    overlay: string;
    questionBackground: string;
    optionBackground: string;
    correctAnswerBackground: string;
    wrongAnswerBackground: string;
    separator: string;
    flashCardAnswer: string;
    flashCardHeading: string;
    ratings: Array<string>;
  };
  spacings: {
    s0: number;
    s1: number;
    s2: number;
    s3: number;
    s4: number;
    s5: number;
    s6: number;
  };
  typographies: {
    xSmall: TextStyle;
    tapBar: TextStyle;
    playlistBar: TextStyle;
    actionBar: TextStyle;
    name: TextStyle;
    description: TextStyle;
    highlightedDescription: TextStyle;
    question: TextStyle;
    answer: TextStyle;
    flashCard: TextStyle;
    flashCardHeading: TextStyle;
    flashCardRating: TextStyle;
    rating: TextStyle;
  };
  shadows: {
    button: ViewStyle;
    text: TextStyle;
    textOutline: TextStyle;
  };
}

const AppDefaultTheme: AppTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: 'rgba(0, 0, 0, 1)',
    secondaryBackground: 'rgba(22, 22, 22, 1)',
    text: 'rgba(255, 255, 255, 1)',
    secondaryText: 'rgba(255, 255, 255, 0.6)',
    inactive: 'rgba(255, 255, 255, 0.4)',
    active: 'rgba(255, 255, 255, 1)',
    gradientBackground: ['rgba(0, 29, 40, 1)', 'rgba(0, 66, 90, 1)'],
    button: 'rgba(40, 177, 143, 1)',
    overlay: 'rgba(0, 0, 0, 0.45)',
    questionBackground: 'rrgba(0, 0, 0, 0.6)',
    optionBackground: 'rgba(255, 255, 255, 0.5)',
    correctAnswerBackground: 'rgba(40, 177, 143, 0.7)',
    wrongAnswerBackground: 'rgba(220, 95, 95, 0.7)',
    separator: 'rgba(255, 255, 255, 0.2)',
    flashCardAnswer: 'rgba(255, 255, 255, 0.6)',
    flashCardHeading: 'rgba(45, 197, 159, 1)',
    ratings: [
      'rgba(241, 125, 35, 1)',
      'rgba(251, 182, 104, 1)',
      'rgba(255, 212, 73, 1)',
      'rgba(22, 98, 79, 1)',
      'rgba(31, 138, 112, 1)',
    ],
  },
  spacings: {
    s0: 4,
    s1: 8,
    s2: 10,
    s3: 12,
    s4: 16,
    s5: 24,
    s6: 40,
  },
  typographies: {
    xSmall: {
      fontSize: 14,
      fontWeight: '400',
    },
    tapBar: {
      fontSize: 16,
      fontWeight: '600',
    },
    playlistBar: {
      fontSize: 13,
      fontWeight: '600',
    },
    actionBar: {
      fontSize: 12,
      fontWeight: '500',
    },
    name: {
      fontSize: 15,
      fontWeight: '600',
    },
    description: {
      fontSize: 12,
      fontWeight: '400',
    },
    highlightedDescription: {
      fontSize: 12,
      fontWeight: '700',
    },
    question: {
      fontSize: 22,
      fontWeight: '500',
      lineHeight: 30,
    },
    answer: {
      fontSize: 17,
      fontWeight: '500',
    },
    flashCard: {
      fontSize: 21,
      fontWeight: '400',
    },
    flashCardHeading: {
      fontSize: 13,
      fontWeight: '800',
    },
    flashCardRating: {
      fontSize: 15,
      fontWeight: '400',
    },
    rating: {
      fontSize: 17,
      fontWeight: '600',
    },
  },
  shadows: {
    button: {
      shadowColor: 'rgba(0, 0, 0, 0.45)',
      shadowOffset: {width: 1, height: 1.5},
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
    },
    text: {
      textShadowColor: 'rgba(0, 0, 0, 0.45)',
      textShadowOffset: {width: 1, height: 1.5},
      textShadowRadius: 2,
    },
    textOutline: {
      textShadowColor: 'rgba(0, 0, 0, 1)',
      textShadowOffset: {width: 1.5, height: 1.5},
      textShadowRadius: 1,
    },
  },
};

export {AppDefaultTheme};
