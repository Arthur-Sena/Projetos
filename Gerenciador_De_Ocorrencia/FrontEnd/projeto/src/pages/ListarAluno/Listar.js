import React,{ Component } from 'react';

import './Listar.css';
import Axios from 'axios';

import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';

import Nav from '../../componentes/Nav';

import info from "../../assets/img/infoicon.png";



export default class List extends Component {

    constructor() {
        super();
        this.state = {
            
            buscarNome: "",
            listaConsultas: [],
            alunos:[]
        }
    }


    // Listar Aluno
    listarAluno = () => {
        fetch('http://192.168.5.158:5000/api/Alunos/listar')
            .then(response => response.json())
            .then(data => this.setState({ alunos: data }) + this.setState({listaConsultas: data}))
            .catch(error => console.log(error))
    }

    // Buscar por Nome
    nomeAluno = (event) => {
        this.setState({ buscarNome: event.target.value })
    }

    //Filtro DE aluno
    FiltraConsultas() {
        let listaFiltrada = this.state.alunos;

        if (this.state.buscarNome !== null && this.state.buscarNome !== "") {
            listaFiltrada = listaFiltrada.filter(
                x =>
                    x.nome.toLowerCase().includes(this.state.buscarNome.toLowerCase()) ||
                    x.curso.toLowerCase().includes(this.state.buscarNome.toLowerCase()) ||
                    x.turma.toLowerCase().includes(this.state.buscarNome.toLowerCase()) ||
                    x.numMatricula.includes(this.state.buscarNome.toLowerCase())
            );
        }


        this.setState({ listaConsultas: listaFiltrada });
    }


    atualizaEstado(event) {
        this.setState({ buscarNome: event.target.value }, () => {
            this.FiltraConsultas();
        });
    }

    componentDidMount() {
        this.listarAluno();
        // this.setState({ listaConsultas: this.state.alunos });
    }

    render() {

        return (
            <div className="Main">
                <Nav />
                <br></br>
                <br></br>

                

                <div className="fundo">
                <h1>Lista de Alunos</h1>
                {/*------------------------- tabela--------------------- */}
                <div className="Tabela">
                    {/* Imput Para Listar Por Nome */}

                    <input className="filtro"
                        value={this.state.buscarNome}
                        placeholder="Buscar Aluno pelo Nome, Curso ou Turma"
                        type="text"
                        onChange={this.atualizaEstado.bind(this)}
                        // style={{ width: "100%" }}
                        name="nome"
                    />


                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nº de Matrícula</th>
                                <th>Nome</th>
                                <th className="List">Telefone</th>
                                <th className="List">Celular</th>
                                <th className="List">Curso</th>
                                <th>Turma</th>
                                <th className="List">Turno</th>
                                <th className="List">Termo</th>
                                <th >+Info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.listaConsultas.map(element => {
                                return (
                                    <tr>
                                        <td>{element.numMatricula}</td>
                                        <td>{element.nome}</td>
                                        <td className="List">{element.telefone}</td>
                                        <td className="List">{element.celular}</td>
                                        <td className="List">{element.curso}</td>
                                        <td>{element.turma}</td>
                                        <td className="List">{element.turno}</td>
                                        <td className="List" >{element.termo}</td>
                                        <td>
                                            <button
                                                style={{ borderTop: '0 none', borderLeft: '0 none', borderRight: '0 none', borderBottom: '10px' }}
                                                onClick={ () => localStorage.setItem("MatriculaUser", element.numMatricula) + localStorage.setItem("IdAluno", element.id) + this.props.history.push('/Aluno')}
                                                // onClick={ () => this.props.history.push('/Aluno')}
                                            >
                                                <img src={info} style={{ marginLeft: 'auto', marginRight: 'auto', display: "block" }} />

                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>

                    </div>

                    </div>
            </div >
        );
    }
}