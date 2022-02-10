import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lang as ActivitiesLang } from '../../language/activities';

import { useNavigate } from 'react-router-native';

import { Icon } from 'react-native-elements';

import Settings from './Settings';
import Activities from './Activities';
import Score from './Score';

const Tab = createBottomTabNavigator();

export default function Tabs(props) {
    
    const navigate = useNavigate();

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: [{ height: 60, color: '#3B8EFF' }],
                tabBarLabelStyle: [{ color: '#3B8EFF', marginBottom: 10 }],
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon
                                type={'ionicon'}
                                color={'#3B8EFF'}
                                name={`game-controller${
                                    focused ? '' : '-outline'
                                }`}
                            />
                        );
                    },
                }}
                name={ActivitiesLang[props.lang]?.Activities}
                children={() => (
                    <Activities lang={props.lang} personId={props.personId} />
                )}
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon
                                type={'ionicon'}
                                color={'#3B8EFF'}
                                name={`star${focused ? '' : '-outline'}`}
                            />
                        );
                    },
                }}
                name={ActivitiesLang[props.lang]?.Score}
                children={() => <Score lang={props.lang} personId={props.personId} /> }
            />
            <Tab.Screen
                options={{
                    headerShown: false,
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon
                                type={'ionicon'}
                                color={'#3B8EFF'}
                                name={`settings${focused ? '' : '-outline'}`}
                            />
                        );
                    },
                }}
                name={ActivitiesLang[props.lang]?.Settings}
                children={(e) => (
                    <Settings
                        lang={props.lang}
                        username={props?.username}
                        person={props.person}
                        personId={props.personId}
                        setFullname={props.setFullname}
                    />
                )}
            />
        </Tab.Navigator>
    );
}
