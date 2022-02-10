import React from 'react';

import Tutorial from '../../pages/Tutorial';
import ChooseUsername from '../../pages/ChooseUsername';
import SelectionMenu from '../../pages/SelectionMenu';

const HomeOrTutorial = (props) => {
    if (!props?.hasSeenTutorial) {
        return <Tutorial lang={props.lang} />;
    }
    if (!props?.username || props?.username?.length < 2) {
        return <ChooseUsername lang={props.lang} />;
    }
    return <SelectionMenu lang={props.lang} username={props.username} />;
};

export default HomeOrTutorial;
