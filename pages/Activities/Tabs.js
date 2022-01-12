import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { lang as ActivitiesLang } from '../../language/activities';

import { Icon } from 'react-native-elements';

import Settings from './Settings';
import Activities from './Activities';
import Score from './Score';

const Tab = createBottomTabNavigator();

export default function Tabs(props) {
    return(
        <Tab.Navigator 
          screenOptions={{
            tabBarStyle: [
                {height: 60, color: '#5bc0de'}
            ],
            tabBarLabelStyle: [
                {color: '#5bc0de', marginBottom: 10}
            ]
        }}>
            <Tab.Screen options={{headerShown: false, tabBarIcon:( ({focused}) => { return <Icon type={'ionicon'} color={'#5bc0de'} name={`game-controller${focused?'':'-outline'}`} />})  }} name={ActivitiesLang[props.lang]?.Activities} children={() => <Activities lang={props.lang} personId={props.personId} />} />
            <Tab.Screen options={{headerShown: false, tabBarIcon:( ({focused}) => { return <Icon type={'ionicon'} color={'#5bc0de'} name={`star${focused?'':'-outline'}`} />})  }} name={ActivitiesLang[props.lang]?.Score} children={() => <Score lang={props.lang} />} />
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon:( ({focused}) => {
                        return <Icon type={'ionicon'} color={'#5bc0de'} name={`settings${focused?'':'-outline'}`} />
                    })
                }}
                name={ActivitiesLang[props.lang]?.Settings}
                children={(e) => 
                    <Settings lang={props.lang} username={props?.username} person={props.person} personId={props.personId} setFullname={props.setFullname} />
                }
            />
        </Tab.Navigator>
    )
}