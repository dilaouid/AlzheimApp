import React, { Component } from 'react'

import Tutorial from '../../pages/Tutorial';
import ChooseUsername from '../../pages/ChooseUsername';

const HomeOrTutorial = (props) => {
    if (!props?.hasSeenTutorial)
        return <Tutorial lang={props.lang} />
    return <ChooseUsername lang={props.lang} />
};

export default HomeOrTutorial;