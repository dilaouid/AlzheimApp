import React from 'react'
import {
    ListItem,
    Avatar,
    Button,
  } from 'react-native-elements';

import styles from './styles';
import { lang as HomeLang } from '../../language/home';

export default function Rows(props) {

    const leftContentSwipe = <Button
          title={HomeLang[props.lang].Edit}
          icon={{ name: 'edit', color: 'white' }}
          buttonStyle={styles.leftButton}
    />;
    const rightContentSwipe = <Button
          title={HomeLang[props.lang].Delete}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={styles.rightButton}
    />;

    return(
        <ListItem.Swipeable bottomDivider={true}
            leftContent={leftContentSwipe}
            rightContent={rightContentSwipe}
        >
            { props?.picture ? <Avatar source={`../../assets/img/uploads/profil/${props.picture || null}.jpg`} rounded/> : null }
            <ListItem.Content>
                <ListItem.Title>{props.name}</ListItem.Title>
                <ListItem.Subtitle>{props.description}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem.Swipeable>
    )
};