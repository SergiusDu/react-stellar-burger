import {ProfileLayout} from '../../components/profile-layout/profile-layout';
import {
  ProfileNavigation,
} from '../../components/profile-navigation/profile-navigation';
import {useDispatch} from 'react-redux';
import React, {useEffect} from 'react';
import {AppDispatch} from '../../services/store/store';
import ScrollableContainer
  from '../../components/scrollable-container/scrollable-container';
import {FeedCard} from '../../components/feed-card/feed-card';
import {getAccessTokenFromCookies} from '../../utils/api';

export const Feed: React.FC = () => {
  return (
    <ProfileLayout >
      <ProfileNavigation />
      <ScrollableContainer >
        <FeedCard ></FeedCard >
      </ScrollableContainer >
    </ProfileLayout >
  );
};
