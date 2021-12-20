import React from 'react';
import { connect } from '../../data/connect';
import { Redirect } from 'react-router';

interface StateProps {
  hasSeenTutorial: boolean;
  hasUsername?: boolean;
};

const HomeOrTutorial: React.FC<StateProps> = ({ hasSeenTutorial, hasUsername }) => {
  if (!hasSeenTutorial)
    return <Redirect to="/tutorial" />
  if (!hasUsername)
    return <Redirect to="/username" />
  return <Redirect to="/tabs/tab1" />
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    hasSeenTutorial: state.user.hasSeenTutorial,
    hasUsername: state.user.username?.length > 3
  }),
  component: HomeOrTutorial
});