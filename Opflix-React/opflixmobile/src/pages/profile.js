import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    StyleSheet,
} from 'react-native';
import jwt_decode from 'jwt-decode';


class profile extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/user.png')}
                style={styles.tabBarEstilizacao}
            />
        ),
    };

    constructor() {
        super();
        this.state = {
            token: '',
            jwToken: [{}],

        };
    }

    _decodeToken = async () => {
        try {
            const tokenOpflix = await AsyncStorage.getItem('@opflix:token')
            if (tokenOpflix != null) {
                this.setState({ token: tokenOpflix })
                this.setState({ jwToken: jwt_decode(tokenOpflix) })
            }
        } catch{
            alert('TOKEN==NULL')
        }
        // alert(this.state.token)
    }

    componentDidMount() {
        this._decodeToken();
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                {/* Img */}
                <View style={styles.image}>
                    <Image
                        source={require('../assets/img/foto.png')}
                        style={{ alignSelf: 'center', marginTop: 10, height: 260, width: 250, }}
                    />
                </View>

                {/* Dados (email e nome) */}
                <View style={{ marginTop: 20, marginLeft: '10%', width: '80%', marginBottom: 70 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 20, }}> Nome  :  {this.state.jwToken.nome} </Text>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginTop: 20, }}> Email  :  {this.state.jwToken.email} </Text>
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('AuthStack')}>
                    <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarEstilizacao: {
        width: 30, height: 30, tintColor: 'white'
    },

    image: {
        backgroundColor: 'grey',
        width: '66%', height: 270,
        marginLeft: '17%',
        marginTop: 60,
        borderColor: 'red',
        borderWidth: 2.5,
        borderRadius: 360,
        overflow: 'hidden',
    },

    btn: {
        backgroundColor: '#a1a1a1',
        width: '35%',
        alignSelf: 'center',
        borderRadius: 25,
        borderColor: 'red',
        borderWidth: 1.5,
    },
})

export default profile;