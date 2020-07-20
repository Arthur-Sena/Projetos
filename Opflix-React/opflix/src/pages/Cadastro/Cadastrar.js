import React, { Component } from 'react';
import Axios from 'axios';
import './Cadastro.css';

export default class Cadastro extends Component {


    constructor() {
        super();
        this.state = {
            nome: "",
            email: "",
            senha: "",
            senha1: "",
            erro: "",
            erro400: "",
            cadastrado: ""
        }
    }
    cadastroNome = (event) => {
        this.setState({ nome: event.target.value })
    }

    cadastroEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    cadastroSenha = (event) => {
        this.setState({ senha: event.target.value })
    }

    cadastroSenha1 = (event) => {
        this.setState({ senha1: event.target.value })
    }

    fazerCadastro = (event) => {
        event.preventDefault();
        if (this.state.senha === this.state.senha1) {

            Axios.post("http://192.168.6.115:5000/api/login/cadastrar", {
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha,
            }) 
                .then(response => response.json())
                .catch(erro => console.log(erro));

        } else {
            this.setState({ erro: "As Senhas Digitadas Estão Diferentes" })
        }
    }

    render() {
        return (
            <div className="divCadastro">
                <nav className="Nav">
                    <h1 style={{ color: "red", fontFamily: "Cooper", fontSize: "2.5em" }} className="h1"><a href="/" style={{ textDecoration: "none", color: "red" }}>OpFlix</a></h1>
                </nav>
                <div className="divForm">


                    <form method="POST" onSubmit={this.fazerCadastro}>
                        <h1>Cadastrar</h1>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Nome"
                                type="text"
                                name="name"
                                id="login__nome"
                                onChange={this.cadastroNome}
                                value={this.state.nome}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Email"
                                type="text"
                                name="username"
                                id="login__email"
                                onChange={this.cadastroEmail}
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
                                onChange={this.cadastroSenha}
                                value={this.state.senha}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Confirmar Senha"
                                type="password"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroSenha1}
                                value={this.state.senha1}
                            />
                        </div>
                        <br></br>
                        <div className="item">

                            <button className="btn btn__login" id="btn__login" style={{ backgroundcolor: "red" }}>
                                Enviar
                        </button >
                        </div>
                        <br></br>
                        <p
                            className="text__login"
                            style={{ color: "red", textAlign: "center", fontSize: "0.8em" }}
                        >
                            {this.state.erro400}
                            {this.state.erro}
                        </p>
                    </form>

                </div>
            </div>
        );
    }
}