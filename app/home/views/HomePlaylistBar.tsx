import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppTheme} from '../../Main/src/themes';
import PlaylistIcon from '../../../assets/icons/ic_playlist.svg';
import ArrowIcon from '../../../assets/icons/ic_arrow_right.svg';
import {useTranslation} from 'react-i18next';
import useAppTheme from '../../main/src/useAppTheme';

interface HomePlaylistBarProps {
  title?: string;
}
const HomePlaylistBar = (props: HomePlaylistBarProps): JSX.Element => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <PlaylistIcon fill={theme.colors.text} />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {t('home.playlist')}
        {props.title}
      </Text>
      <ArrowIcon fill={theme.colors.text} />
    </View>
  );
};

export default HomePlaylistBar;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: theme.spacings.s4,
      paddingVertical: theme.spacings.s2,
      backgroundColor: theme.colors.secondaryBackground,
    },
    title: {
      ...theme.typographies.playlistBar,
      color: theme.colors.text,
      flex: 1,
      marginStart: theme.spacings.s0,
      marginEnd: theme.spacings.s1,
    },
  });
