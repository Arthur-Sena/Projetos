import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    AsyncStorage,
    TouchableOpacity,
    View,
    Text,
    Image,
    StatusBar,
} from 'react-native';


class cadastrar extends Component {
    static navigationOptions = {
        header: null,
      };
    
    constructor() {
        super();
        this.state = {
            nome: null,
            email: null,
            senha: null,
            senha1: null,
            erro: null,
            cadastrado: null,
        };
    }


    _fazerCadastro = (event) => {
        event.preventDefault();
        if (this.state.senha === this.state.senha1
            && this.state.email != null 
            && this.state.senha != null 
            && this.state.nome != null 
            ) {
            fetch("http://192.168.6.115:5000/api/login/cadastrar", {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: this.state.nome,
                    email: this.state.email,
                    senha: this.state.senha,
                }),
            })
                .then(response => response.json())
                .catch(erro => console.log(erro));
                alert("O usuario "+ this.state.nome + " foi cadastrado")
                this._irParaLogin()
            }  if (this.state.senha == null) {
            alert("Digite uma senha para cadastrar")
        } if (this.state.nome == null) {
            alert("Digite um nome para cadastrar")
        } if  (this.state.email == null) {
            alert("Digite um email para cadastrar")
        } if (this.state.senha != this.state.senha1) {
            alert("As Senhas Digitadas Estão Diferentes" )
        }
    }

    _irParaLogin = async () => {
          try {
            this.props.navigation.navigate('AuthStack');
          } catch (error) {
          }
      };

    render() {
        return (
            <View style={{ backgroundColor: 'black', height: "100%" }}>
                <StatusBar backgroundColor="black" />
                <Image
                    source={require('../assets/img/logo.png')}
                    style={{ alignSelf: 'center', marginTop: 65 }}
                />
                <TextInput
                    placeholder="      Nome"
                    onChangeText={nome => this.setState({ nome })}
                    value={this.state.nome}
                    style={styles.input}
                    placeholderTextColor='white'

                />
                <TextInput
                    placeholder="      Email"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                    style={styles.input}
                    placeholderTextColor='white'

                />
                <TextInput
                    placeholder="      Senha"
                    onChangeText={senha => this.setState({ senha })}
                    value={this.state.senha}
                    style={styles.input}
                    placeholderTextColor='white'

                />
                <TextInput
                    placeholder="      Confirmar Senha"
                    onChangeText={senha1 => this.setState({ senha1 })}
                    value={this.state.senha1}
                    style={styles.input}
                    placeholderTextColor='white'

                />
                <TouchableOpacity onPress={this._fazerCadastro} style={styles.btn}>
                    <Text style={{ color: 'white', marginTop: '3%' }}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
//#282c34
const styles = StyleSheet.create({
    input: {
        backgroundColor: "#1a1a1a",
        marginLeft: '15%',
        width: '70%',
        marginTop: '8%',
        borderRadius: 15,
        borderColor: 'white',
        borderStyle: 'solid',
        textDecorationColor: 'white',
        color: 'white',
    },
    btn: {
        height: 30,
        width: '40%',
        marginLeft: '30%',
        backgroundColor: "#1a1a1a",
        marginTop: '15%',
        borderRadius: 15,
        alignItems: 'center',
        color: 'white',
    }
});

export default cadastrar;
