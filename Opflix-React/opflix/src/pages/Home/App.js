import React, { Component } from 'react';
import logo from './img/Capturar.png';
import Axios from 'axios';
import './App.css';
import { parseJwt } from "../../services/auth";

class App extends Component {

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

    Axios.post("http://192.168.6.115:5000/api/login", {
      email: this.state.email,
      senha: this.state.senha
    })
      .then(data => {
        if (data.status === 200) {
          localStorage.setItem("usuario-opflix", data.data.token);
          // var permissao = parseJwt().permissao;
          
          this.props.history.push('/Filmes');
          
        } else {
          console.log("Erroooo")
        }
      })
      .catch(erro => {
        this.setState({ erro: "Usuário ou senha inválidos" });
        console.log(erro);
      })
  }



  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <nav className="Nav">
            {/* {logo}; */}
            <h1 style={{ color: "red", fontFamily: "Cooper", fontSize: "2.5em" }} className="h1">OpFlix</h1>
          </nav>
          <div className="divForm">

            <form onSubmit={this.efetuarLogin} className="form">
              <h3>Login</h3>
              <br></br>
              <div className="item">
                <input
                  className="input__login"
                  placeholder="Email"
                  type="text"
                  name="username"
                  id="login__email"
                  onChange={this.loginEmail}
                  value={this.state.email}
                />
              </div>
              <br></br>
              <div className="item">
                <input
                  className="input__login"
                  placeholder="Senha"
                  type="password"
                  name="password"
                  id="login__password"
                  onChange={this.loginSenha}
                  value={this.state.senha}
                />
              </div>
              <br></br>
              <div className="item">
                <button className="btn btn__login" id="btn__login" style={{ backgroundcolor: "red" }}>
                  Login
              </button >
              </div>
              <p
                className="text__login"
                style={{ color: "red", textAlign: "center" }}
              >
                {this.state.erro}
              </p>
              <p style={{ fontSize: "0.6em" }}><a href="/Cadastro"> Cadastrar-se</a></p>
            </form>
          </div>
        </header>

      </div>
    );
  }
}

export default App;