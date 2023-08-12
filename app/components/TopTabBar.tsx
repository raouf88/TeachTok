import {StyleSheet} from 'react-native';
import React from 'react';
import {TabBar, TabBarItem} from 'react-native-tab-view';
import {AppTheme} from '../Main/src/themes';
import useAppTheme from '../main/src/useAppTheme';

const TopTabBar = (props: any): JSX.Element => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);

  const renderTabBarItem = (itemProps: any) => {
    return <TabBarItem {...itemProps} style={styles.tabBarItem} />;
  };

  return (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabBarIndicator}
      scrollEnabled
      tabStyle={styles.tabBarTab}
      labelStyle={styles.tabBarLabel}
      renderTabBarItem={renderTabBarItem}
    />
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    tabBar: {
      width: 'auto',
      backgroundColor: 'transparent',
    },
    tabBarTab: {
      width: 'auto',
    },
    tabBarLabel: {
      textTransform: 'none',
      ...theme.typographies.tapBar,
    },
    tabBarItem: {
      minHeight: 'auto',
      padding: 0,
      marginHorizontal: theme.spacings.s0,
      marginBottom: theme.spacings.s0,
    },
    tabBarIndicator: {
      backgroundColor: theme.colors.active,
      height: 4,
      width: 0.4,
    },
  });

export default TopTabBar;
