import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      email: null,
      senha: null,
      // 123456
      // erik@email.com'
    };

    // this._cadastrar = this._cadastrar.bind(this);
  }

  _logar = async () => {
    if(this.state.email != null && this.state.senha != null){
      await fetch('http://192.168.6.115:5000/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          senha: this.state.senha,
        }),
      })
      .then(resposta => resposta.json())
      .then(data => this._irParaFilme(data.token))
      .catch(erro => console.warn(erro));
    } else {
      alert("DIGITE EMAIL E SENHA VALIDOS PARA LOGAR")
    }
  };

  _irParaFilme = async (tokenOpFlix) => {
    if (tokenOpFlix != null) {
      try {
        await AsyncStorage.setItem('@opflix:token', tokenOpFlix);
        this.props.navigation.navigate('MainNavigator');
      } catch (error) {
        console.warn(error)
      }
    }
  };

  _cadastrar() {
    try {
      console.warn('chamei')
      this.props.navigation.navigate('CadastroStack');
    } catch (error) {
      console.warn(error)
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: 'black', height: "100%" }}>
        <StatusBar backgroundColor="black" />
        {/* Logo Opflix */}
        <Image
          source={require('../assets/img/logo.png')}
          style={{ alignSelf: 'center', marginTop: 75 }}
        />

        {/* Input Email e senha */}
          <TextInput
            placeholder="         Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            style={styles.input}
            placeholderTextColor='white'
          />
          <TextInput
            placeholder="         Senha"
            onChangeText={senha => this.setState({ senha })}
            value={this.state.senha}
            style={styles.inputum}
            placeholderTextColor='white'
            secureTextEntry={true}
          />

          {/* Btn Login */}
          <TouchableOpacity onPress={this._logar} style={styles.btn}>
            <Text style={{ color: 'white', marginTop: '3%' }}>Login</Text>
          </TouchableOpacity>

          {/* Redirecionar para Cadastrar */}
          <TouchableOpacity style={{ width: '25%', alignSelf: 'center', marginTop: '5%' }} onPress={() => this.props.navigation.navigate('CadastroStack')}>
            <Text style={{ color: 'white', marginTop: '7%', textAlign: 'center' }}>Cadastrar-se</Text>
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
    marginTop: '25%',
    marginBottom: '10%',
    borderRadius: 15,
    borderStyle: 'solid',
    color: 'white',
    borderColor: 'grey',
    borderWidth: 1.3,
  },
  inputum: {
    backgroundColor: "#1a1a1a",
    marginLeft: '15%',
    width: '70%',
    // marginTop: '10%',
    borderRadius: 15,
    color: 'white',
    borderColor: 'grey',
    borderWidth: 1.3,
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
  },
});

export default SignIn;
