import React from 'react';
import useAppTheme from '../../main/src/useAppTheme';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {AppTheme} from '../../Main/src/themes';
import LikeIcon from '../../../assets/icons/ic_like.svg';
import CommentIcon from '../../../assets/icons/ic_comments.svg';
import BookmarkIcon from '../../../assets/icons/ic_bookmark.svg';
import ShareIcon from '../../../assets/icons/ic_share.svg';
import AddIcon from '../../../assets/icons/ic_add.svg';
import FlipIcon from '../../../assets/icons/ic_flip.svg';
import RoundButton from '../../components/RoundButton';
import {useTranslation} from 'react-i18next';

interface HomeActionBarProps {
  avatar: ImageSourcePropType;
  isFollowing?: boolean;
  onFlipPress?: () => void;
}
const HomeActionBar = (props: HomeActionBarProps): JSX.Element => {
  const theme = useAppTheme();
  const styles = makeStyles(theme);
  const {t} = useTranslation();

  const renderAddIcon = () => (
    <AddIcon fill={theme.colors.text} width={14} height={14} />
  );
  const renderAdd = () => {
    if (!props.isFollowing) {
      return <RoundButton style={styles.add} size={22} icon={renderAddIcon} />;
    }
    return null;
  };

  const renderAvatar = () => {
    return (
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={props.avatar} />
        {renderAdd()}
      </View>
    );
  };

  const renderItem = (icon: () => any, text: string) => {
    return (
      <View style={styles.item}>
        {icon()}
        <Text style={styles.itemTitle}>{text}</Text>
      </View>
    );
  };
  const renderLikeIcon = () => <LikeIcon fill={theme.colors.text} />;
  const renderCommentIcon = () => <CommentIcon fill={theme.colors.text} />;
  const renderBookmarkIcon = () => <BookmarkIcon fill={theme.colors.text} />;
  const renderShareIcon = () => <ShareIcon fill={theme.colors.text} />;

  const renderFlipIcon = () => <FlipIcon fill={theme.colors.text} />;
  const renderFlipButton = () => (
    <RoundButton
      style={styles.flip}
      icon={renderFlipIcon}
      onPress={props.onFlipPress}
    />
  );
  const renderFlip = () => {
    if (props.onFlipPress) {
      return renderItem(renderFlipButton, t('home.flip'));
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderAvatar()}
      {renderItem(renderLikeIcon, '87')}
      {renderItem(renderCommentIcon, '2')}
      {renderItem(renderBookmarkIcon, '203')}
      {renderItem(renderShareIcon, '17')}
      {renderFlip()}
    </View>
  );
};

export default HomeActionBar;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: theme.spacings.s1,
    },
    avatarContainer: {
      marginBottom: theme.spacings.s4,
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      borderWidth: 1,
      borderColor: theme.colors.active,
    },
    add: {
      marginTop: -14,
    },
    item: {
      justifyContent: 'center',
    },
    itemTitle: {
      ...theme.typographies.actionBar,
      color: theme.colors.text,
      alignContent: 'center',
      textAlign: 'center',
      marginTop: theme.spacings.s0,
      marginBottom: theme.spacings.s4,
      ...theme.shadows.text,
    },
    flip: {
      ...theme.shadows.button,
    },
  });
