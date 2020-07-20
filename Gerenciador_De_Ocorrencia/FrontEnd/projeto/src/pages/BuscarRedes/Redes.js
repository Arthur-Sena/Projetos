import React,{ Component } from 'react';
import Axios from 'axios';
import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';
import Nav from '../../componentes/Nav';

import user from "../../assets/img/usuarios.png";
import './dev.css';



export default class List extends Component {

    constructor() {
        super();
        this.state = {
            buscarCurso: "Redes",
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
        
        let listaFiltrada = this.state.listarCursos;
            
        if (this.state.buscarCurso !== "") {
                listaFiltrada = listaFiltrada.filter(
                    x =>
    
                        x.curso.toLowerCase().includes(this.state.buscarCurso.toLowerCase())   
                );
                this.setState({ filtro : listaFiltrada });
            }


    }
    
    componentDidMount() {
        this.listarCursos();
    }

    render() {

        return (
            <div className="Dev">
                <Nav />
                <br></br>
                <br></br>

                    <h1>Alunos de Redes</h1>
                
                    {this.state.filtro.map(element => {
                        return (
                            <Card style={{ width: '18rem', marginBottom:25 }}>
                                <Card.Img variant="top"
                                    style={{marginTop:1}}
                                    src={element.imagem} 
                                    src={user}
                                    />
                                <Card.Body>
                                    <Card.Title>{element.nome}</Card.Title>

                                    <Button variant="primary"
                                        style={{width:'70%',marginLeft:'15%'}}
                                        onClick={() => localStorage.setItem("MatriculaUser", element.numMatricula) + localStorage.setItem("IdAluno", element.id) + this.props.history.push('/Aluno')}
                                    >
                                        +Info
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                    

        </div >
        );
    }
}