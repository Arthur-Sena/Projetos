import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainScreen from './pages/main';
import SignInScreen from './pages/signin';
import CadastrarScreen from './pages/cadastrar';
import PorNomeScreen from './pages/nome';
import FiltroScreen from './pages/filtro';
import ProfileScreen from './pages/profile';

const AuthStack = createStackNavigator({
    Sign: { screen: SignInScreen },
});

const CadastroStack = createStackNavigator({
    Cadastrar: {
        screen: CadastrarScreen,
    },
});

// const ProfileStack = createStackNavigator({
//     Profile: {
//         screen: ProfileScreen,
//     },
// });

const MainNavigator = createBottomTabNavigator(
    {
        Nome: {
            screen: PorNomeScreen,
        },
        Main: {
            screen: MainScreen,
        },
        Filtro: {
            screen: FiltroScreen,
        },
        Profile: {
            screen: ProfileScreen,
        }
    },
    {
        initialRouteName: 'Main',
        tabBarOptions: {
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: 'black',
            inactiveBackgroundColor: '#1a1a1a',
            style: {
                width: '100%',
                height: 50,
            }
        }
    },
);

export default createAppContainer(
    createSwitchNavigator(
        {
            MainNavigator,
            AuthStack,
            CadastroStack
        },
        {
            initialRouteName: 'AuthStack',
        },
    ),
);