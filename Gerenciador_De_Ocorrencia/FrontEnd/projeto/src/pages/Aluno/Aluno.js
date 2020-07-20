import React, { Component } from 'react';

import './Aluno.css';
import Axios from 'axios';

import Nav from '../../componentes/Nav';

import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';

export default class Aluno extends Component {
    constructor() {
        super();
        this.state = {

            imgTeste: "https://www.giftt.com.br/img/admin/usuarios.png",
            alunoBuscado: [],
            listaOcorrencia: [],
            ocorrencia: "",
            id: localStorage.getItem("IdAluno"),
            sucesso: "",
        }
    }

    //salva a ocorrencia no state
    salvarOcorrencia = (event) => {
        this.setState({ ocorrencia: event.target.value })
    }

    //Busca Aluno pelo numero de matricula
    BuscarMatricula = () => {
        fetch("http://192.168.5.158:5000/api/alunos/buscarmatricula/" + localStorage.getItem("MatriculaUser"))

            .then(response => response.json())
            .then(data => this.setState({ alunoBuscado: data }))
            .catch(error => console.log(error))

        console.log(this.state.alunoBuscado)
    }

    cadastrarOcorrencia = (event) => {
        event.preventDefault();

        console.log(this.state.id)
        console.log(this.state.ocorrencia)

        Axios.post("http://192.168.5.158:5000/api/ocorrencias", {
            descricao: this.state.ocorrencia,//Ok
            idAluno: this.state.id

        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-senai')
            },

        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ sucesso: "Cadastrado" })
                }
            })
            .catch(error => console.log(error))
    }

    listarOcorrencia = () => {
        fetch('http://192.168.5.158:5000/api/ocorrencias')
            .then(response => response.json())
            .then(data => this.setState({ alunos: data }) + this.setState({ listaOcorrencia: data }))
            .catch(error => console.log(error))
    }



    componentDidMount() {
        this.BuscarMatricula();
    }



    render() {

        return (
            <div className="Aluno">
                <Nav />
                <div className="DivAluno" style={{ display: 'flex', marginLeft: '10%', width: "80%" }}>


                    <div className="Foto" style={{ border: 'solid', borderColor: 'blue' }}>
                        {this.state.alunoBuscado.imagem === null ?
                            (
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="camera"
                                />

                            ) : (
                                <img src={this.state.alunoBuscado.imagem}
                                />

                            )}
                    </div>

                    <div className="DadosAluno">

                        <br></br>
                        <h2 style={{ textAlign: 'center' }}>{this.state.alunoBuscado.nome}</h2>
                        <br></br>

                        <p style={{ textAlign: 'left' }}><strong>Nº Matricula :</strong> {this.state.alunoBuscado.numMatricula}</p>
                        <p style={{ textAlign: 'left' }}><strong>Curso :</strong> {this.state.alunoBuscado.curso}</p>
                        <p style={{ textAlign: 'left' }}><strong>Turno : </strong>{this.state.alunoBuscado.turno}</p>
                        <p style={{ textAlign: 'left' }}><strong>Turma :</strong> {this.state.alunoBuscado.turma}</p>
                        <p style={{ textAlign: 'left' }}><strong>Termo : </strong>{this.state.alunoBuscado.termo}</p>

                        <p style={{ textAlign: 'left' }}><strong>Telefone : </strong>{this.state.alunoBuscado.telefone}</p>
                        <p style={{ textAlign: 'left' }}><strong>Celular : </strong>{this.state.alunoBuscado.celular}</p>

                    </div>
                </div>
                <br></br>
                <br></br>




                <div style={{ marginLeft: '10%', width: "80%" }}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header style={{ textAlign: 'center' }}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Cadastrar Ocorrência
                                 </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body style={{ display: 'flex' }}>
                                    <div className="ocorrencia">
                                        <form method="POST" onSubmit={this.cadastrarOcorrencia}>

                                            <textarea
                                                placeholder="Ocorrencia"
                                                type="text"
                                                onChange={this.salvarOcorrencia}
                                                value={this.state.ocorrencia}
                                                style={{ width: "153%", marginLeft: "-26%" }}
                                            />

                                            <button>
                                                Enviar
                                            </button >

                                        </form>
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{ marginLeft: '10%', width: "80%" }}>
                    <Accordion defaultActiveKey="0">
                        <Card>
                            <Card.Header style={{ textAlign: 'center' }}>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Listar Ocorrencias
                                 </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body style={{ display: 'flex' }}>
                                    <div className="ocorrencia">

                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        );
    }
}