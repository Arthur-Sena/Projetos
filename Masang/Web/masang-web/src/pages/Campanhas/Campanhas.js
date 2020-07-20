import React, { Component } from 'react';
import Axios from 'axios';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Esc from '../../assets/icons/delete.png';
import Att from '../../assets/icons/atualizar.png';

import './Campanhas.css'

class Campanha extends Component {

    constructor() {
        super();
        this.state = {
            campanha: [],

        }
    }

    listCampanha = () => {

        fetch('https://masang.dev.objects.universum.blue/campanhas')
            .then(response => response.json())
            .then(data => this.setState({ campanha: data }))
    }

    mudarPagina() {
        this.props.history.push('/DeleteCampanha')
    }
    paginaAtualizar() {
        this.props.history.push('/AtualizarCampanha')
    }

    componentDidMount() {
        this.listCampanha();
    }

    render() {
        return (
            <div className="DivCampanha">


                <div className="cadastroTitle" style={{ marginTop: '-5vh' }}>
                    {/* <Link to="/Services" style={{ textDecoration: 'none' }}><h1 className="Title"  >Lista de Campanhas</h1></Link> */}
                    <a href="/Services" style={{ textDecoration: 'none' }}><h1 className="Title"  >Lista de Campanhas</h1></a>


                    <div className="bottomTitle" style={{ width: '23vw', height: '1vh', marginTop: '-3vh' }}></div>
                </div>
                <br></br>

                <div className='btnCampanha'>
                    <button className='btn' style={{ width: '8vw', alignSelf: 'end', marginRight:'4vw' }} onClick={() => this.props.history.push('/CadastrarCampanha')}>Adicionar</button>
                </div>

                <div className='divListaCampanha'>
                    <div className='listaCampanha'>
                        {this.state.campanha.map(element => {
                            return (
                                <div className="cardCampanha">
                                    <img src={element.urlImagem} style={{ height: '90%', width: '100%' }} />
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                                        <div style={{ width: '4vw',marginLeft:'8px' }}>
                                            <button className="btnDel"
                                                onClick={() => localStorage.setItem('id-C', element.id) + this.paginaAtualizar()}
                                            ><img src={Att} /></button>
                                        </div>

                                        <div style={{ width: '30vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <a href={element.urlRedirect} target="_blank" style={{ textDecoration: 'none' }}><h3 style={{ color: '#f29123', textAlign: 'center'}}>{element.titulo}</h3></a>
                                        </div>

                                        <div style={{ width: '4vw' }}>
                                            <button className="btnDel"
                                                onClick={() => localStorage.setItem('id-C', element.id) + this.mudarPagina()}
                                            ><img src={Esc} /></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}
export default Campanha