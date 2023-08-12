import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SceneMap, TabView} from 'react-native-tab-view';
import {AppTheme} from '../../Main/src/themes';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import TimeIcon from '../../../assets/icons/ic_time.svg';
import SearchIcon from '../../../assets/icons/ic_search.svg';
import homeConstants from '../src/homeConstants';
import TopTabBar from '../../components/TopTabBar';
import useAppUsage from '../../main/src/useAppUsage';
import useAppTheme from '../../main/src/useAppTheme';
import HomeContents from './HomeContents';

const renderFollowing = () => <HomeContents isFollowing={true} />;
const renderForYou = () => <HomeContents />;
const renderScene = SceneMap({
  following: renderFollowing,
  for_you: renderForYou,
});

function HomeScreen(): JSX.Element {
  const {t} = useTranslation();
  const {top} = useSafeAreaInsets();
  const theme = useAppTheme();
  const windowDimensions = useWindowDimensions();
  const styles = makeStyles(theme);
  const appUsage = useAppUsage();
  const [index, setIndex] = React.useState(1);
  const [routes] = React.useState([
    {key: 'following', title: t('home.top_bar.following')},
    {key: 'for_you', title: t('home.top_bar.for_you')},
  ]);

  const renderTopBar = (props: any) => {
    return (
      <View style={[styles.topBarContainer, {top}]}>
        <View style={styles.timerContainer}>
          <TimeIcon fill={theme.colors.secondaryText} />
          <Text style={styles.timer}>{appUsage}</Text>
        </View>
        <View style={styles.tabBarContainer}>
          <TopTabBar {...props} />
        </View>
        <View style={styles.searchContainer}>
          <SearchIcon fill={theme.colors.text} />
        </View>
      </View>
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTopBar}
      onIndexChange={setIndex}
      initialLayout={{width: windowDimensions.width}}
    />
  );
}

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    topBarContainer: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 1,
      height: homeConstants.TOP_BAR_HEIGHT,
      flexDirection: 'row',
      marginTop: theme.spacings.s1,
      marginHorizontal: theme.spacings.s4,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    timerContainer: {
      flexDirection: 'row',
      width: homeConstants.TAB_BAR_ITEM_WIDTH,
      alignItems: 'center',
    },
    timer: {
      marginHorizontal: theme.spacings.s0,
      ...theme.typographies.xSmall,
      color: theme.colors.secondaryText,
    },
    searchContainer: {
      marginStart: theme.spacings.s0,
      width: homeConstants.TAB_BAR_ITEM_WIDTH,
      alignItems: 'flex-end',
    },
    tabBarContainer: {
      alignItems: 'center',
    },
  });

export default HomeScreen;
