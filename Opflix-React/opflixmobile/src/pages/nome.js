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
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import jwt_decode from 'jwt-decode';
import { throwStatement } from '@babel/types';



class nome extends Component {
    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/lupa.png')}
                style={styles.tabBarEstilizacao}
            />
        ),
    };


    constructor() {
        super();
        this.state = {
            token: '',
            jwToken: '',
            nome: null,
            lancamento: [],
            // lancamentoNome: [],
        };
    }


    // _carregarPorNome = async () => {
    //     // alert(this.state.nome)
    //     await fetch('http://192.168.6.115:5000/api/lancamento/titanic' + this.state.nome)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 this.setState({
    //                     lancamentoNome: response.data
    //                 })
    //             } else {
    //             }
    //         })
    //         .catch(erro => console.warn(erro));
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
    };

    _decodeToken = async () => {
        try {
            const tokenOpflix = await AsyncStorage.getItem('@opflix:token')
            if (tokenOpflix != null) {
                this.setState({ token: tokenOpflix })
                this.setState({ jwToken: jwt_decode(tokenOpflix) })
            }
        } catch{
        }
        this._carregarFilmes();
    }

    componentDidMount() {
        this._decodeToken();
    }

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Text style={styles.Titulo}>Buscar Por Nome</Text>
                
                {/* Input Para Nome do FIlme */}
                <TextInput
                    placeholder="     Nome do Filme"
                    onChangeText={nome => this.setState({ nome })}
                    value={this.state.nome}
                    style={styles.input}
                />
                {/* btn de Enviar */}
                <TouchableOpacity style={styles.touch}>
                    <Text style={{ color: 'white', marginTop: '10%', textAlign: 'center', fontSize: 20 }}>Enviar</Text>
                </TouchableOpacity>

                {/* Lista */}
                <FlatList
                    style={styles.lista}
                    data={this.state.lancamento.filter(element => {
                        return element.nome == this.state.nome
                    }
                    )}
                    keyExtractor={item => item.idLancamentos}
                    renderItem={({ item }) => (
                        <View>
                            <Collapse>
                                <CollapseHeader>
                                    <Text style={{ color: "white", fontSize: 18, marginTop: '5%', marginBottom: '2%' }}>   - {item.nome} </Text>
                                </CollapseHeader>
                                <CollapseBody style={{ backgroundColor: '#343537', borderBottomLeftRadius: 15, borderBottomRightRadius: 15, }}>
                                    <Text style={styles.item}> -- Sinopse : {item.sinopse}</Text>
                                    <Text style={styles.item}> - Duração : {item.duracao}</Text>
                                    <Text style={styles.item}> - Classificação Indicativa : {item.classificacaoIndicativa}</Text>
                                </CollapseBody>
                            </Collapse>
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
    input: {
        backgroundColor: "white",
        marginLeft: '10%',
        width: '55%',
        marginTop: '10%',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderColor: 'white',
        borderStyle: 'solid',
        color: 'black',
        fontSize: 20
    },
    lista: {
        backgroundColor: '#1a1a1a',
        marginLeft: '10%',
        width: '80%',
        marginTop: '10%',
        marginBottom: '15%',
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 1.5,
    },
    item: {
        marginTop: '2%',
        marginBottom: '2%',
        color: "white",
        marginLeft: '10%',
        fontSize: 15,
    },
    touch: { width: '25%', marginTop: '-12%', marginLeft: '65%', backgroundColor: 'grey', height: 50, borderBottomRightRadius: 15, borderTopRightRadius: 15, }
})

export default nome;