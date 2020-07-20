import React, { Component } from 'react';

import './CadastrarUsuario.css';
import Axios from 'axios';

import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';

import Nav from '../../componentes/Nav';


export default class Main extends Component {

    constructor() {
        super();
        this.state = {

            nome: "",
            nif: "",
            senha: "",
            senha1: "",
            tipo: "",
            erro: "",
            sucesso: "",
        }
    }

    cadastroNome = (event) => {
        this.setState({ nome: event.target.value })
    }

    cadastroNif = (event) => {
        this.setState({ nif: event.target.value })
    }

    cadastroSenha = (event) => {
        this.setState({ senha: event.target.value })
    }
    cadastroSenha1 = (event) => {
        this.setState({ senha1: event.target.value })
    }

    cadastrarAdm = (event) => {
        event.preventDefault();
        if (this.state.senha === this.state.senha1) {
            //Erro 401
            Axios.post("http://192.168.5.158:5000/api/usuarios", {
                nome: this.state.nome,
                nif: this.state.nif,
                senha: this.state.senha,
                tipo: "Comum"
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("usuario-senai"),
                    'Content-Type': 'application/json'
                },
            })
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ sucesso: "Usuario Cadastrado" })
                    }
                    else {
                        this.setState({ erro: "Erro ao Cadastrar" })
                    }
                })
                .catch(erro => console.log(erro));

        } else {
            this.setState({ erro: "Erro ao Cadastrar" })
        }
    }


    render() {

        return (
            <div className="Main">
                <Nav />
                <br></br>
                <br></br>
                <div className="divForm">


                    <form method="POST" onSubmit={this.cadastrarAdm}>
                        <h1>Cadastrar Professor</h1>
                        <br></br>
                        <div className="item1">
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
                                placeholder="Nif"
                                type="text"
                                name="username"
                                id="login__email"
                                onChange={this.cadastroNif}
                                value={this.state.nif}
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

                            <button className="botao" id="btn__login">
                                Enviar
                            </button >
                        </div>
                        <br></br>
                        <p
                            className="text__login"
                            style={{ color: "red", textAlign: "center", fontSize: "0.8em" }}
                        >
                            {this.state.erro}
                        </p>
                        <p
                            className="text__login"
                            style={{ color: "green", textAlign: "center", fontSize: "0.8em" }}>

                            {this.state.sucesso}
                        </p>

                    </form>
                </div>
            </div >
        );
    }
}