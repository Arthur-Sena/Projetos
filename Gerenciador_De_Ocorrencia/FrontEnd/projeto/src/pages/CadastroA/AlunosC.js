import React, { Component } from 'react';
import './Alunos.css';
import { Link } from "react-router-dom";

import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';

import Nav from '../../componentes/Nav';


export default class Main extends Component {

    constructor() {
        super();
        this.state = {
            Matricula: "",
            Nome: "",
            Telefone: "",
            Celular: "",
            Tipo: "",
            Curso: "",
            Turma: "",
            Turno: "",
            Termo: ""
        }
    }


    estadoMatricula = (event) => {
        this.setState({ matricula: event.target.value })
        console.log(this.state.matricula)
    }

    estadoNome = (event) => {
        this.setState({ nome: event.target.value })
        console.log(this.state.nome)
    }
    estadoTelefone = (event) => {
        this.setState({ telefone: event.target.value })
        console.log(this.state.telefone)
    }

    estadoCelular = (event) => {
        this.setState({ Celular: event.target.value })
        console.log(this.state.celular)
    }

    estadoTipo = (event) => {
        this.setState({ tipo: event.target.value })
        console.log(this.state.tipo)
    }

    estadoCurso = (event) => {
        this.setState({ curso: event.target.value })
        console.log(this.state.curso)
    }

    estadoTurma = (event) => {
        this.setState({ turma: event.target.value })
        console.log(this.state.turma)
    }

    estadoTurno = (event) => {
        this.setState({ turno: event.target.value })
        console.log(this.state.turno)
    }

    estadoTermo = (event) => {
        this.setState({ termo: event.target.value })
        console.log(this.state.termo)
    }

    CadastroMatricula = (event) => {
        this.setState({ matricula: event.target.value })
    }

    cadastroNome = (event) => {
        this.setState({ nome: event.target.value })
    }

    cadastroTelefone = (event) => {
        this.setState({ telefone: event.target.value })
    }

    cadastroCelular = (event) => {
        this.setState({ celular: event.target.value })
    }

    cadastroTipo = (event) => {
        this.setState({ celultipoar: event.target.value })
    }

    cadastroCurso = (event) => {
        this.setState({ curso: event.target.value })
    }

    cadastroTurma = (event) => {
        this.setState({ turma: event.target.value })
    }

    cadastroTurno = (event) => {
        this.setState({ turno: event.target.value })
    }

    cadastroTermo = (event) => {
        this.setState({ termo: event.target.value })
    }

    //     CadstrarAluno = (event) => {
    //         event.preventDefault();

    //         fetch("http://192.168.5.158:5000/api/alunos"), {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 if(this.state.senha === this.state.senha1) {
    //             //Erro 401
    //             Axios.post("http://192.168.5.158:5000/api/aluno", {
    //                 matricula: this.state.matricula,
    //                 nome: this.state.nome,
    //                 telefone: this.state.telefone,
    //                 celular: this.state.celular,
    //                 tipo: this.state.tipo,
    //                 curso: this.state.curso,
    //                 turma: this.state.turma,
    //                 turno: this.state.turno,
    //                 termo: this.state.termo
    //             })
    //                 .then(console.log("ALUNO CADASTRADO COM SUCESSO!"))

    //                 .catch(erro => {
    //                     console.log(erro);
    //                 })

    //             .then(response => {
    //             if (response.status === 200) {
    //                 this.setState({ sucesso: "Aluno Cadastrado" })
    //             }
    //             else {
    //                 this.setState({ erro: "Erro ao Cadastrar" })
    //             }
    //         })
    //             .catch(erro => console.log(erro));

    //      else {
    //         this.setState({ erro: "Erro ao Cadastrar" })
    //     }
    // }

    render() {

        return (
            <div className="Main">
                <Nav />
                <br></br>
                <br></br>
                <div className="divForm">


                    <form method="POST" onSubmit={this.cadastrarAluno}>
                        <h1>Cadastrar Aluno</h1>
                        <br></br>
                        <div className="item1">
                            <input
                                className="input__login"
                                placeholder="N° da Matricula"
                                type="text"
                                name="name"
                                id="login__nome"
                                onChange={this.cadastroMatricula}
                                value={this.state.matricula}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Nome"
                                type="text"
                                name="username"
                                id="login__email"
                                onChange={this.cadastroNome}
                                value={this.state.nome}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Telefone"
                                type="password"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroTelefone}
                                value={this.state.telefone}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Celular"
                                type="password"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroCelular}
                                value={this.state.celular}
                            />
                        </div>
                        <br></br>
                        <br></br>
                        <div className="item1">
                            <input
                                className="input__login"
                                placeholder="Tipo"
                                type="text"
                                name="name"
                                id="login__nome"
                                onChange={this.cadastroTipo}
                                value={this.state.tipo}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Curso"
                                type="text"
                                name="username"
                                id="login__email"
                                onChange={this.cadastroCurso}
                                value={this.state.curso}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Turma"
                                type="password"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroTurma}
                                value={this.state.turma}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Turno"
                                type="password"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroTurno}
                                value={this.state.turno}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Termo"
                                type="password"
                                name="password"
                                id="login__password"
                                onChange={this.cadastroTermo}
                                value={this.state.termo}
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