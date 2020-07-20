import React, { Component } from 'react';
import Axios from 'axios';
import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';
import Nav from '../../componentes/Nav';

import './dev.css';
import user from "../../assets/img/usuarios.png";

export default class List extends Component {

    constructor() {
        super();
        this.state = {
            buscarCurso: "Desenvolvimento",
            listarCursos: [],
            filtro: [],
        }
    }


    // Listar Aluno
    listarCursos = () => {

        fetch('http://192.168.5.158:5000/api/Alunos/listar')
            .then(response => response.json())
            .then(data => this.setState({ listarCursos: data }))
            .catch(error => console.log(error))    

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

                <h1>Alunos de Desenvolvimento</h1>

                <br></br>
                <br></br>

                <div className="Div"
                    style={{ display: 'flex', flexWrap: 'wrap', marginLeft: "8%", width: '84%' }}
                >
                    {this.state.listarCursos.map(element => {
                        return (
                            <Card style={{ width: '18rem', marginBottom: 25 }}>
                                <Card.Img variant="top"
                                    style={{ marginTop: 1 }}
                                    src={element.imagem}
                                    src={user}
                                />
                                <Card.Body>
                                    <Card.Title>{element.nome}</Card.Title>

                                    <Button variant="primary"
                                        style={{ width: '70%', marginLeft: '15%' }}
                                        onClick={() => localStorage.setItem("MatriculaUser", element.numMatricula) + localStorage.setItem("IdAluno", element.id) + this.props.history.push('/Aluno')}
                                    >
                                        +Info
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </div>
            </div >
        );
    }
}