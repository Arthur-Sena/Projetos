import React, { Component } from 'react';

import './Login.css';
import Axios from 'axios';


import Back from '../../assets/img/login.JPG';
import senai from "../../assets/img/LogoSenai.jpg";


export default class Login extends Component {

    constructor() {
        super();
        this.state = {
            NIF: "",
            senha: "",
            erro: " ",
        }
    }

    //Inicio Salvar Senha e Nif no State
    loginNIF = (event) => {
        this.setState({ NIF: event.target.value })
    }

    loginSenha = (event) => {
        this.setState({ senha: event.target.value })
    }
    //Fim
    efetuarLogin = (event) => {
        event.preventDefault();

        Axios.post("http://192.168.5.158:5000/api/usuarios/login",{
                NIF: this.state.NIF,
                senha: this.state.senha
            })
            .then(data => {
                if (data.status === 200) {
                    localStorage.setItem("usuario-senai", data.data.token);

                    this.props.history.push('/Main');

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
            <div className="AppPrincipal">

                <div className="App" style={{ display: 'flex' }}>
                    <img src={Back} style={{ marginTop: -167 }} />
                    <div className="Login" >
                        <img src={senai} className="img" />
                    </div>
                </div>
                {/* asssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss */}
                <div className="DivLogin"  >

                    <form onSubmit={this.efetuarLogin} className="form">
                        {/* <h1 style={{ textAlign: "center" }}>Login</h1> */}
                        <br></br>
                        <br></br>
                        <br></br>
                        <div className="inputLogin">
                            <input
                                placeholder="NIF"
                                type="text"
                                name="username"
                                onChange={this.loginNIF}
                                value={this.state.NIF}
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <div className="inputLogin">
                            <input
                                placeholder="SENHA"
                                type="password"
                                name="password"
                                onChange={this.loginSenha}
                                value={this.state.senha}
                            />

                        </div>
                        <br></br>
                        <p
                            style={{ color: "red", marginLeft:'40%',fontSize:'large' }}
                        >
                            {this.state.erro}
                        </p>
                        <br></br>
                        <br></br>
                        <button className="btnn">
                            Login
                        </button >
                    </form>

                </div>
            </div>
        );
    }
}