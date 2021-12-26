import React, { Component } from 'react'

import Tutorial from '../../pages/Tutorial';
import ChooseUsername from '../../pages/ChooseUsername';
import Home from '../../pages/Home';

const HomeOrTutorial = (props) => {
    if (!props?.hasSeenTutorial)
        return <Tutorial lang={props.lang} />
    if (!props?.username || props?.username?.length < 3)
        return <ChooseUsername lang={props.lang} />
    return <Home lang={props.lang} username={props.username} />
};

export default HomeOrTutorial;