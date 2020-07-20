import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
    StyleSheet,
    FlatList,
    Picker,
    ScrollView,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import jwt_decode from 'jwt-decode';


class filtro extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/filter.png')}
                style={styles.tabBarEstilizacao}
            />
        ),
    };


    constructor() {
        super();
        this.state = {
            token: '',
            jwToken: '',
            lancamento: [],
            generos: [],
            generoNome: [
                // {
                //     'nome': 'oi',
                //     'duracao': 'oioio'
                // }
            ],
            generoEscolhido: null,

        };
    }


    _buscarGeneros = async () => {
        await fetch('http://192.168.6.115:5000/api/categoria')
            .then(resposta => resposta.json())
            .then(data => this.setState({ generos: data }))
    };

    // _buscarPorNome = async () => {
    //     if (this.state.generoEscolhido != 0) {

    //         await fetch('http://192.168.6.115:5000/api/categoria/' + this.state.generoEscolhido)
    //             .then(resposta => resposta.json())
    //             .then(data => this.setState({ generoNome: data }))
    //     } else {
    //         alert('erro')
    //     }
    // };

    _carregarFilmes = async () => {
        await fetch('http://192.168.6.115:5000/api/lancamento', {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + this.state.token,
                'Content-Type': 'application/json'
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamento: data }))
        // .catch(erro => console.warn(erro));
    };

    _decodeToken = async () => {
        try {
            const tokenOpflix = await AsyncStorage.getItem('@opflix:token')
            if (tokenOpflix != null) {
                this.setState({ token: tokenOpflix })
                this.setState({ jwToken: jwt_decode(tokenOpflix) })
            }
        } catch{
            // alert('TOKEN==NULL')
        }
        // alert(this.state.jwToken)
        this._carregarFilmes();
    }

    _onChageValue = (value) => {
        this.setState({ generoEscolhido: value })
        // alert(this.state.generoNome)
    }

    componentDidMount() {
        this._buscarGeneros();
        this._decodeToken();
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Text style={styles.Titulo}>Filtrar Por Genero</Text>
                {/* Select */}
                <View style={styles.ViewPicker}>
                    <Picker
                        selectedValue={this.state.generoEscolhido}
                        onValueChange={this._onChageValue.bind(this)}
                        style={styles.picker}
                    >
                        {this.state.generos.map(element => {
                            return <Picker.Item label={element.nome} value={element.idGenero} onPress={() => this._buscarPorNome()} />
                        })}
                    </Picker>
                </View>
                
                {/*Lista Filtrada */}
                <FlatList
                    style={styles.lista}
                    data={this.state.lancamento.filter(element => {
                        return element.idGenero === this.state.generoEscolhido
                    }
                    )}
                    keyExtractor={item => item.nome}
                    renderItem={({ item }) => (
                        <View>
                            <ScrollView>
                                <Collapse>
                                    <CollapseHeader >
                                        <Text style={{ color: "white", fontSize: 17, marginTop: '3%' }}>    -   {item.nome} </Text>
                                    </CollapseHeader>
                                    <CollapseBody style={{ backgroundColor: '#343537', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginTop: 5 }}>
                                        <Text style={styles.item}> -  Sinopse :  {item.sinopse}</Text>
                                        <Text style={styles.item}> -  Duração :  {item.duracao}</Text>
                                        <Text style={styles.item}> -  Classificação Indicativa :  {item.classificacaoIndicativa}</Text>
                                    </CollapseBody>
                                </Collapse>
                            </ScrollView>
                        </View>
                    )}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarEstilizacao: {
        width: 30, height: 30, tintColor: 'white'
    },
    Titulo: {
        color: "white",
        fontSize: 25,
        marginTop: '10%',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    lista: {
        backgroundColor: '#1a1a1a',
        marginLeft: '10%',
        width: '80%',
        marginTop: '5%',
        marginBottom: '15%',
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 1.5,
    },
    picker: {
        marginLeft: '5%',
        width: '90%',
    },
    item: {
        marginTop: '2%',
        marginBottom: '2%',
        color: "white",
        marginLeft: '10%',
        fontSize: 17
    },
    ViewPicker: {
        marginLeft: '10%',
        backgroundColor: 'white',
        height: 50,
        marginTop: '10%',
        width: '80%',
        borderRadius: 13,
        fontSize: 15,
    }
})

export default filtro;