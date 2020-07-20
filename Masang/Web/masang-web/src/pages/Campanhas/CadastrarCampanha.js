import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Axios from 'axios';

//Css + images
import './Campanhas.css';

class CadastroCampanha extends Component {

    constructor() {
        super();
        this.state = {

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

    cadastrarCampanha = (event) => {
        event.preventDefault();

        Axios.post("https://masang.dev.objects.universum.blue/campanhas/", {
            label: "campanha",
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
                    this.setState({ erro: "Campanha cadastrada" })
                } else {
                    this.setState({ erro: "Erro ao cadastrar" })
                }
            })


    }


    render() {
        return (
            <div className="Cadastro" >
                <div className="cadastroTitle">
                    {/* <Link to="/Services" style={{ textDecoration: 'none' }}><h1 className="Title">Cadastrar Campanha</h1></Link> */}
                    <a href="/Services" style={{ textDecoration: 'none' }}><h1 className="Title">Cadastrar Campanha</h1></a>

                    <div className="bottomTitle"></div>
                </div>

                <div className="divFormCadastro">
                    <form onSubmit={this.cadastrarCampanha} className="formCadastro">


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
                                value={this.state.titulo}
                                placeholder=""
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
                                onChange={this.setImg}
                                value={this.state.urlimg}
                                placeholder=""
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
                                onChange={this.setUrl}
                                value={this.state.url}
                                placeholder=""
                                minLength='5'
                            />
                        </div>

                        <div style={{ maxHeight: "3vh", marginBottom: '5px' }}>
                            <p style={{ color: "#868686", textAlign: "center", fontSize: '20px', marginTop:"-5px" }}>{this.state.erro}</p>
                        </div>

                        <button className="btn" type='submit' style={{ marginTop: "67.5vh", position: 'absolute', borderColor: 'grey' }}>
                            Cadastrar
                        </button >

                    </form>
                </div>
            </div>
        );
    }
}


export default CadastroCampanha