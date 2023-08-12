import {Image, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import useAppTheme from '../../main/src/useAppTheme';
import {AppTheme} from '../../Main/src/themes';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import HomeMCQ from './HomeMCQ';
import homeConstants from '../src/homeConstants';
import HomeActionBar from './HomeActionBar';
import HomePlaylistBar from './HomePlaylistBar';
import HomeFlashCard from './HomeFlashCard';
import {Home} from '../typings';

interface HomeContentProps {
  content: Home.Content;
  isFollowing?: boolean;
}
const HomeContent = (props: HomeContentProps) => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const bottomTabHeight = useBottomTabBarHeight();
  const windowDimensions = useWindowDimensions();
  const {top} = useSafeAreaInsets();
  const [isFlipped, setFlipped] = useState(false);

  const renderDescription = (text?: string): JSX.Element[] | undefined => {
    return text
      ?.split(/((?:^|\s)(?:#[a-z\d-]+))/gi)
      .filter(Boolean)
      .map((v, i) => {
        if (v.includes('#')) {
          return (
            <Text key={i} style={styles.highlightedDescription}>
              {v}
            </Text>
          );
        } else {
          return (
            <Text key={i} style={styles.description}>
              {v}
            </Text>
          );
        }
      });
  };

  const renderImage = () => {
    if (props.content.image) {
      return (
        <>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{
              uri: props.content.image,
            }}
          />
          <View style={styles.overlay} />
        </>
      );
    }
    return null;
  };

  const onFlipPress = () => {
    setFlipped(!isFlipped);
  };

  const renderCard = () => {
    const mergedStyles = [
      styles.cardContainer,
      {
        marginTop:
          top +
          homeConstants.TOP_BAR_HEIGHT +
          theme.spacings.s1 +
          theme.spacings.s4,
      },
    ];
    switch (props.content.type) {
      case homeConstants.CONTENT_TYPES.mcq:
        return <HomeMCQ data={props.content} style={mergedStyles} />;
      case homeConstants.CONTENT_TYPES.flashcard:
        return (
          <HomeFlashCard
            data={props.content}
            style={mergedStyles}
            isFlipped={isFlipped}
            flip={onFlipPress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          height: windowDimensions.height - bottomTabHeight,
        },
      ]}>
      {renderImage()}

      <View style={styles.subContainer}>
        <View style={styles.leftContainer}>
          {renderCard()}
          <View>
            <Text style={styles.name} numberOfLines={1}>
              {props.content.user.name}
            </Text>
            <Text style={styles.description} numberOfLines={2}>
              {renderDescription(props.content.description)}
            </Text>
          </View>
        </View>
        <HomeActionBar
          avatar={{
            uri: props.content.user?.avatar,
          }}
          isFollowing={props.isFollowing}
          onFlipPress={onFlipPress}
        />
      </View>

      <HomePlaylistBar title={props.content.playlist} />
    </View>
  );
};

export default HomeContent;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    image: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    overlay: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.overlay,
    },
    subContainer: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    leftContainer: {
      flex: 1,
      marginStart: theme.spacings.s4,
      marginEnd: theme.spacings.s3,
      marginBottom: theme.spacings.s4,
    },
    cardContainer: {
      marginBottom: theme.spacings.s5,
      flex: 1,
    },
    name: {
      color: theme.colors.text,
      ...theme.typographies.name,
      marginBottom: theme.spacings.s0,
    },
    description: {
      color: theme.colors.text,
      ...theme.typographies.description,
    },
    highlightedDescription: {
      color: theme.colors.text,
      ...theme.typographies.highlightedDescription,
    },
  });
