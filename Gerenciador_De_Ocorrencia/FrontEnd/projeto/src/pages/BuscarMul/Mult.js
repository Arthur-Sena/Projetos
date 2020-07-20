import React,{ Component } from 'react';
import Axios from 'axios';
import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';
import Nav from '../../componentes/Nav';



export default class List extends Component {

    constructor() {
        super();
        this.state = {
            buscarCurso: "Multimídia",
            listarCursos: [],
            nome: "",
        }
    }


    // Listar Aluno
    listarCursos = () => {
        fetch('http://192.168.5.158:5000/api/Alunos/listar')
            .then(response => response.json())
            .then(data => this.setState({ curso: data }) + this.setState({listarCursos: data}))
            .catch(error => console.log(error))
    }

    buscarCurso = (event) => {
        this.setState({ buscarCurso: event.target.value })
    }
    // Buscar por Nome
    nomeAluno = (event) => {
        this.setState({ buscarNome: event.target.value })
    }

    //Filtro DE aluno
    FiltraConsultas() {
        let listaFiltrada = this.state.curso;

        if (this.state.buscarCurso !== null && this.state.buscarCurso !== "") {
            listaFiltrada = listaFiltrada.filter(
                x =>
                  
                    x.curso.toLowerCase().includes(this.state.buscarCurso.toLowerCase()) 
                    // x.nome.toLowerCase().includes(this.state.buscarCurso.toLowerCase()) 

            );
        }


        this.setState({ listarCursos: listaFiltrada });
    }


    atualizaEstado(event) {
        this.setState({ buscarCurso: event.target.value }, () => {
            this.FiltraConsultas();
        });
    }

    componentDidMount() {
        this.listarCursos();
        // this.setState({ listaConsultas: this.state.alunos });
    }

    render() {

        return (
            <div className="Dev">
                <Nav />
                <br></br>
                <br></br>

                    <h1>Alunos de Multimídia</h1>
                
                    <tbody>
                            {this.state.listarCursos.map(element => {
                                return (
                                    <div class="card" style="width: 18rem;">
                                        <img src="..." class="card-img-top" alt="..."/>
                                            <div class="card-body">
                                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                            </div>
                                  </div>
                                );
                            })}
                    </tbody>
                    

        </div >
        );
    }
}