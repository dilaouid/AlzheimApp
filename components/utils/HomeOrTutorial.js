import React from 'react';

import Tutorial from '../../pages/Tutorial';
import ChooseUsername from '../../pages/ChooseUsername';
import Home from '../../pages/Home';

const HomeOrTutorial = (props) => {
    if (!props?.hasSeenTutorial) {
        return <Tutorial lang={props.lang} setLang={props.setLang} />;
    }
    if (!props?.username || props?.username?.length < 2) {
        return <ChooseUsername lang={props.lang} setLang={props.setLang} />;
    }
    return <Home lang={props.lang} username={props.username} setLang={props.setLang} />;
};

export default HomeOrTutorial;
