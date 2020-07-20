import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Axios from 'axios';

//Css + images
import './Campanhas.css';

class AtualizarCampanha extends Component {

    constructor(props) {
        super(props);
        this.state = {
            campanha: {},
            titulo: "",
            urlImg: "",
            url: "",
            erro: "",
        }
    }

    setTitulo = (event) => {
        this.setState({ titulo: event.target.value })
    }
    setImg = (event) => {
        this.setState({ urlImg: event.target.value })
    }
    setUrl = (event) => {
        this.setState({ url: event.target.value })
    }

    recuperarCampanha = () => {
        fetch('https://masang.dev.objects.universum.blue/campanhas/' + localStorage.getItem('id-C'))
            .then(response => response.json())
            .then(data => {
                this.setState({ campanha: data })
                this.setState({ titulo: data.titulo })
                this.setState({ urlImg: data.urlImagem })
                this.setState({ url: data.urlRedirect })
            })
    }

    atualizarCampanha = (event) => {
        event.preventDefault();

        Axios.put("https://masang.dev.objects.universum.blue/campanhas/"+ localStorage.getItem('id-C'), {
            titulo: this.state.titulo,
            urlImagem: this.state.urlImg,
            urlRedirect: this.state.url,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ erro: "Campanha Atualizada" })
                } else {
                    this.setState({ erro: "Erro ao Atualizar" })
                }
            })
    }

    componentDidMount() {
        this.recuperarCampanha();
    }

    render() {
        return (
            <div className="Cadastro" >
                <div className="cadastroTitle">
                    {/* <Link to="/Campanha" style={{ textDecoration: 'none' }}><h1 className="Title">Atualizar Campanha</h1></Link> */}
                    <a href="/Campanha" style={{ textDecoration: 'none' }}><h1 className="Title">Atualizar Campanha</h1></a>

                    <div className="bottomTitle"></div>
                </div>

                <div className="divFormCadastro">
                    <form onSubmit={this.atualizarCampanha} className="formCadastro">

                        {/* INPUT TITULO DA CAMPANHA */}
                        <div className="divCadastroCampanha" >
                            <label htmlFor="nome" className='labelCampanha' >Titulo Da Campanha</label>
                            <input
                                required
                                className="input_cadastro"
                                style={{ width: '64vw' }}
                                type="text"
                                name="name"
                                onChange={this.setTitulo}
                                defaultValue={this.state.campanha.titulo}
                                minLength='5'
                            />
                        </div>

                        {/* INPUT URL IMG DA CAMPANHA */}
                        <div className="divCadastroCampanha" >
                            <label htmlFor="nome" className='labelCampanha' style={{ marginTop: '1vh' }}>URL da imagem </label>
                            <input
                                required
                                className="input_cadastro"
                                style={{ width: '64vw' }}
                                type="url"
                                name="name"
                                defaultValue={this.state.urlImg}
                                onChange={this.setImg}                                
                                minLength='5'
                            />
                        </div>


                        {/* INPUT URL REDIRECT PRA CAMPANHA */}
                        <div className="divCadastroCampanha" >
                            <label htmlFor="nome" className='labelCampanha' style={{ marginTop: '1vh' }}>URL Para Página Da Campanha</label>
                            <input
                                required
                                className="input_cadastro"
                                style={{ width: '64vw' }}
                                type="url"
                                name="name"
                                defaultValue={this.state.url}
                                onChange={this.setUrl}
                                minLength='5'
                            />
                        </div>

                        <div style={{ maxHeight: "3vh", marginBottom: '5px' }}>
                            <p style={{ color: "#868686", textAlign: "center", fontSize: '20px', marginTop: "-5px" }}>{this.state.erro}</p>
                        </div>

                        <button className="btn" type='submit' style={{ marginTop: "67.5vh", position: 'absolute', borderColor: 'grey' }}>
                            Atualizar
                        </button >

                    </form>
                </div>
            </div>
        );
    }
}


export default AtualizarCampanha