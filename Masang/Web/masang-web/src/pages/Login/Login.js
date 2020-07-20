import React, { Component } from 'react';
import Axios from 'axios';
import qs from 'qs';
//Css + images
import './Login.css';
import Logo from '../../assets/logoMasangofc1.png'

// const params = new URLSearchParams();
// params.append("username", this.state.email);
// params.append("password", password);
// params.append("scope", "api1");
// params.append("client_id", "ro.client");
// params.append("client_secret", secret);
// params.append("grant_type", "password");


class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: "",
      senha: "",
      erro: ""
    }
  }

  loginEmail = (event) => {
    this.setState({ email: event.target.value })
  }

  loginSenha = (event) => {
    this.setState({ senha: event.target.value })
  }

  efetuarLogin = (event) => {
    event.preventDefault();

    if (this.state.email === 'admin@masang.com' && this.state.senha === '321321') {
      this.props.history.push('/services');
      localStorage.setItem("usuario-masang", 'admin');
    } else {
      this.setState({ erro: "Usuário ou senha inválidos" });
    }

    // const requestBody = {
    //     username: this.state.email,
    //     password: this.state.senha,
    //     scope: 'api1',
    //     client_id: 'ro.client',
    //     client_secret: 'secret',
    //     grant_type: 'password'
    // }

    // Axios.post("https://masang-id-dev.azurewebsites.net/connect/token", {
    //   body:  qs.stringify(requestBody),
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // })
    //   .then(response => {
    //     if (response.status === 200) {
    //       // localStorage.setItem("usuario-masang", response.access_token);
    //       this.props.history.push('/services');
    //     } else {
    //       console.log(response)
    //     }
    //   })
    //   .then(data => {
    //     if (data.status === 200) {
    //       // localStorage.setItem("usuario-masang", data.body.access_token);
    //       this.props.history.push('/services');
    //     } else {
    //       console.log(data)
    //     }})
    //   .catch(erro => {
    //     this.setState({ erro: "Usuário ou senha inválidos" });
    //     console.log(erro);
    //   })
  }



  render() {
    return (
      <div className="App" >

        <div className="Login">

          <h1 className="h1Login" style={{ marginTop: '2em' }}>Login </h1>

          <form onSubmit={this.efetuarLogin} className="form">

            <div className="item" style={{ marginTop: '2em' }}>
              <label htmlFor="username" value="E-mail" style={{ fontSize: '17px' }}>E-mail</label>

              <input
                className="input__login"
                // placeholder="Email"
                type="email"
                name="username"
                onChange={this.loginEmail}
                value={this.state.email}
              />
            </div>

            <div className="item" style={{ marginTop: '4em' }}>
              <label htmlFor="password" value="label" style={{ fontSize: '17px' }}>Senha</label>

              <input
                className="input__login"
                // placeholder="Senha"
                type="password"
                name="password"
                onChange={this.loginSenha}
                value={this.state.senha}
              />
            </div>
            <div style={{ height: '11vh' }}>

              <p className="testJest" style={{ color: "white", textAlign: "center", fontSize: '20px', }}    >
                {this.state.erro}
              </p>

            </div>
            <button className="btn" type='submit' >
              Entrar
            </button >

          </form>
        </div>

        <div className="Masang">
          {/* <br></br> */}
          <img src={Logo} style={{ height: '15vh' }} />
        </div>

      </div>
    );
  }
}

export default Login;