import React, { Component } from 'react';
import Axios from 'axios';
// import './Cadastrar.css';
import Menu from '../../componentes/Menu.js';

export default class CadastroAdm extends Component {


    constructor() {
        super();
        this.state = {
            nome: "",
            erro: "",
            erro400: "",
            sucesso: ""
        }
    }
    cadastroNome = (event) => {
        this.setState({ nome: event.target.value })
    }


    cadastrarCategoria = (event) => {
        event.preventDefault();
        if (this.state.senha === this.state.senha1) {
            //Erro 401
            Axios.post("http://192.168.6.115:5000/api/categoria", {
                nome: this.state.nome                
            },{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                    'Content-Type': 'application/json'
                },
            }) 
            .then(response => {
                if (response.status === 200) {
                    this.setState({ sucesso: "Gênero Cadastrado" })
                }
            })
                .catch(erro => console.log(erro));

        } else {
            this.setState({ erro: "Erro ao cadastrar tente novamente" })
        }
    }

    render() {
        return (
            <div className="divCadastro">
                <Menu />
                <div className="divForm">


                    <form method="POST" onSubmit={this.cadastrarCategoria}>
                        <h1>Cadastrar Gênero </h1>
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

                            <button className="btn btn__login" id="btn__login" style={{ backgroundcolor: "red" }}>
                                Enviar
                        </button >
                        </div>
                        <br></br>
                        <p
                            className="text__login"
                            style={{ color: "green", textAlign: "center", fontSize: "0.8em" }}
                        >
                            {this.state.sucesso}
                            {this.state.erro400}
                            {this.state.erro}
                        </p>
                    </form>

                </div>
            </div>
        );
    }
}