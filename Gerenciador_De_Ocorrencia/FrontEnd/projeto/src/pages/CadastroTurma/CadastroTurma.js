import React, { Component } from 'react';

import './CadastroTurma.css';
import Axios from 'axios';

import Nav from '../../componentes/Nav';

export default class CadastroTurma extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            sucesso: "",
            erro: "",
        };
    }

    

    async cadastrarTurma(event) {
        event.preventDefault();
        console.log(this.state.file);

        const formData = new FormData();
        formData.append('arquivo', this.state.file);

        Axios.post("http://192.168.5.158:5000/api/alunos/turma", 
            formData
        , {
            headers: {
                'content-type': 'multipart/form-data'
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
    }

    setarArquivo(event) {
        console.log(event.target.files[0])
        this.setState({ file: event.target.files[0] });
    }

    render() {
        return (
            <div className="Main">
                <Nav />
                <br></br>
                <br></br>
                <div className="divForm">

                    <form method="POST" onSubmit={e => this.cadastrarTurma(e)}>
                        <div classname="Titulo" >

                        <h1>Cadastrar Turma </h1>
                        </div>
                        <br></br>
                        <div className="item1">
                            <input
                                className="input__file"
                                placeholder="Insira um arquivo xlsx"
                                type="file"
                                id="register__file"
                                onChange={event => this.setarArquivo(event)}
                                
                                
                            />
                        </div>
                        <br></br>

                        <div className="item">

                            <button type="submit" className="btn btn__login" id="btn__login">
                                Cadastrar
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