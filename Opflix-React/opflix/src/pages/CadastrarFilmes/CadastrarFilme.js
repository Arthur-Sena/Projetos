import React, { Component } from 'react';
import Axios from 'axios';
// import '../Cadastro/';
import Menu from '../../componentes/Menu.js';

export default class CadastrarFilme extends Component {


    constructor() {
        super();
        this.state = {
            nome: null,
            sinopse: null,
            duracao: null,
            lancamentoData: null,
            idPlataforma: null,
            idTipo: null,
            nomeTipo: [
                { nome: "Filme", id: 1 },
                { nome: "Série", id: 2 }
            ],
            idGenero: null,
            classificacaoIndicativa: null,
            faixaEtaria: [
                { Classificação: "L" },
                { Classificação: "10" },
                { Classificação: "13" },
                { Classificação: "16" },
                { Classificação: "18" }
            ],
            erro: "",
            generos: [],
            plataforma: [],
            longitude: "",
            latitude: "",
        }
    }
    cadastroNome = (event) => {
        this.setState({ nome: event.target.value })
    }

    cadastrarSinopse = (event) => {
        this.setState({ sinopse: event.target.value })
    }
    cadastroDuracao = (event) => {
        this.setState({ duracao: event.target.value })
    }
    cadastroData = (event) => {
        this.setState({ lancamentoData: event.target.value })
    }
    cadastroPlataforma = (event) => {
        this.setState({ idPlataforma: event.target.value })
    }

    cadastroTipo = (event) => {
        this.setState({ idTipo: event.target.value })
    }

    cadastroGenero = (event) => {
        this.setState({ idGenero: event.target.value })
    }

    cadastroClassificacao = (event) => {
        this.setState({ classificacaoIndicativa: event.target.value })
    }
    cadastrolancamentoData = (event) => {
        this.setState({ lancamentoData: event.target.value })
    }
    cadastroLatitude = (event) => {
        this.setState({ latitude: event.target.value })
    }
    cadastroLongitude = (event) => {
        this.setState({ longitude : event.target.value })
    }

    listarGenero = () => {
        // eventDefault();
        fetch('http://192.168.6.115:5000/api/categoria', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ generos: data }));
    }

    listarPlataforma = () => {
        // eventDefault();
        fetch('http://192.168.6.115:5000/api/plataforma', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("usuario-opflix"),
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => this.setState({ plataforma: data }));
    }



    cadastrarFilme = (event) => {
        event.preventDefault();
        if (this.state.nome != null && this.state.sinopse != null && this.state.duracao != null && this.state.lancamentoData != null && this.state.idPlataforma != null && this.state.idTipo != null) {
            Axios.post("http://192.168.6.115:5000/api/lancamento", {
                nome: this.state.nome,//Ok
                sinopse: this.state.sinopse,//Ok
                duracao: this.state.duracao,//Ok
                dataLancamento: this.state.lancamentoData,//Ok
                idPlataforma: this.state.idPlataforma,//ok
                idTipo: this.state.idTipo,
                idGenero: this.state.idGenero,//Ok sem teste
                classificacaoIndicativa: this.state.classificacaoIndicativa,//Ok sem teste

            }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('usuario-opflix')
                    },

                })
                .then(response => {
                    if (response.status === 200) {
                        this.setState({ sucesso: "Filme Cadastrado" })
                    }
                })
                .catch(error => console.log(error))

            Axios.post("http://192.168.6.115:5000/api/localization", {
                NomeLancamento: this.state.nome,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
            })
        } else {
            this.setState({ erro: "Erro ao Cadastrar" })
        }
    }


    componentDidMount() {
        this.listarPlataforma();
        this.listarGenero();
    }

    render() {
        return (
            <div className="divCadastro">
                <Menu />
                <div className="divForm" style={{ marginTop: "7.2em", width: "50%", marginLeft: "25%" }}>


                    <form method="POST" onSubmit={this.cadastrarFilme}>
                        <h1>Cadastrar Filme</h1>

                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Nome"
                                type="text"
                                name="name"
                                id="login__nome"
                                onChange={this.cadastroNome}
                                value={this.state.nome}
                            //style={{width:"100%",marginLeft:"-10%"}}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <textarea
                                placeholder="Sinopse"
                                type="text"
                                maxLength="455"
                                onChange={this.cadastrarSinopse}
                                value={this.state.sinopse}
                                style={{ width: "153%", marginLeft: "-26%" }}
                            />
                        </div>
                        <br></br>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder="Duracao"
                                id="login__password"
                                onChange={this.cadastroDuracao}
                                value={this.state.duracao}
                            />
                        </div>
                        <label style={{ fontSize: "85%", marginLeft: "-20%" }}>Data de Lançamento:</label>
                        <div className="item">
                            <input
                                className="input__login"
                                placeholder=" Data de Lançamento"
                                type="date"
                                name="password"
                                id="login__password"
                                onChange={this.cadastrolancamentoData}
                                value={this.state.lancamentoData}
                                style={{ width: "128%", marginLeft: "-14%" }}
                            />
                        </div>
                        <br></br>
                        {/* <div style={{ display: "flex", marginLeft: '-5%', justifyContent: "space-between" }}> */}


                            <div className="item" style={{ marginLeft: "-30%", }}>
                                <select style={{ width: "230%", fontSize: "0.8em" }} onChange={this.cadastroGenero} >
                                <option disabled selected >Genero</option>
                                    {this.state.generos.map(element => {
                                        return (
                                            <option value={element.idGenero} key={element.idGenero}>{element.nome}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <br></br>
                            <div className="item" style={{ marginLeft: "-22%" }}>
                                <select onChange={this.cadastroPlataforma} style={{ width: "170%", fontSize: "0.8em" }} >
                                    <option disabled selected >Plataforma</option>
                                    {this.state.plataforma.map(element => {
                                        return (
                                            <option value={element.idPlataforma} key={element.idPlataforma}>{element.plataforma1}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <br></br>

                        {/* </div>
                        <div style={{ display: "flex", marginLeft: '-5%' }}> */}
                            <div className="item" style={{ marginLeft: "-22%"}}>
                                <select onChange={this.cadastroClassificacao} style={{width:'170%',  fontSize: "0.8em" }} >
                                <option disabled selected >Classificação Indicativa</option>
                                    {this.state.faixaEtaria.map(element => {
                                        return (
                                            <option value={element.Classificação} key={element.Classificação}>{element.Classificação}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <br></br>
                            <div className="item" style={{ marginLeft: "-43%" }}>
                                <select onChange={this.cadastroTipo} style={{ width: "535%", fontSize: "0.8em" }} >
                                    <option disabled selected >Tipo</option>
                                    {this.state.nomeTipo.map(element => {
                                        return (
                                            <option value={element.id} key={element.id}>{element.nome}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        {/* </div> */}
                        <br></br>
                        <div style={{display:"flex"}}>
                        <input
                                
                                value={this.state.longitude}
                                style={{ height:35,width:"32.2%",marginLeft:"18.4%" }}
                                className="input__login"
                                placeholder="Latitude"
                                type="text"   
                                onChange={this.cadastroLatitude}
                                value={this.state.latitude}
                            />
                            <input
                                className="input__login"
                                placeholder="Longitude"
                                type="text"
                                onChange={this.cadastroLongitude}
                                style={{ height:35, width:"32%"}}
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
                        </p>
                        <p className="text__login"
                            style={{ color: "red", textAlign: "center", fontSize: "0.8em" }}>
                            {this.state.erro}
                        </p>
                    </form>

                </div>
            </div>
        );
    }
}