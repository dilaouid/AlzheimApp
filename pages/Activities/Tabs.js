import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lang as ActivitiesLang } from '../../language/activities';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Icon } from 'react-native-elements';

import Settings from './Settings';
import Activities from './Activities';
import Score from './Score';

const Tab = createBottomTabNavigator();

export default function Tabs(props) {

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: [{ height: 10+"%", color: '#3B8EFF', backgroundColor: '#355c7d' }],
                tabBarLabelStyle: [{ color: 'white', marginBottom: 10, fontSize: hp('2%') }],
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <Icon
                                type={'ionicon'}
                                color={'white'}
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
                                color={'white'}
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
                                color={'white'}
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
                        fullname={props?.fullname}
                        person={props.person}
                        personId={props.personId}
                        setFullname={props.setFullname}
                        setPerson={props.setPerson}
                    />
                )}
            />
        </Tab.Navigator>
    );
}
