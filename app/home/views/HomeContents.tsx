import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useAppTheme from '../../main/src/useAppTheme';
import HomeContent from './HomeContent';
import {useLazyGetContentQuery} from '../src/homeApi';
import {Home} from '../typings';
import * as Progress from 'react-native-progress';
import {AppTheme} from '../../Main/src/themes';

interface HomeContentsProps {
  isFollowing?: boolean;
}
const HomeContents = (props: HomeContentsProps): JSX.Element => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const [contents, setContents] = useState<Array<Home.Content>>([]);

  const [trigger, {data, isFetching, isLoading}] = useLazyGetContentQuery();

  const fetch = () => {
    trigger(props.isFollowing);
  };

  const refresh = () => {
    setContents([]);
    trigger(props.isFollowing);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      // workaround to load page 2
      if (contents.length === 0) {
        fetch();
      }

      setContents(prevContents => [...prevContents, data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const fetchNext = () => {
    if (!isFetching) {
      fetch();
    }
  };

  const renderItem = ({index, item}: {index: number; item: Home.Content}) => (
    <HomeContent key={index} content={item} isFollowing={props.isFollowing} />
  );

  const renderFooter = () => {
    if (isFetching || isLoading) {
      return (
        <Progress.Bar
          indeterminate
          borderWidth={0}
          width={null}
          style={styles.progressBar}
          useNativeDriver={true}
          animationType={'spring'}
        />
      );
    }
    return null;
  };

  return (
    <LinearGradient colors={theme.colors.gradientBackground}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          pagingEnabled
          data={contents}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
          onEndReached={fetchNext}
          onEndReachedThreshold={0}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.text}
              refreshing={isLoading}
              onRefresh={refresh}
            />
          }
        />
        {renderFooter()}
      </View>
    </LinearGradient>
  );
};

export default HomeContents;

const makeStyles = (_theme: AppTheme) =>
  StyleSheet.create({
    progressBar: {
      height: 2,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
    },
  });
