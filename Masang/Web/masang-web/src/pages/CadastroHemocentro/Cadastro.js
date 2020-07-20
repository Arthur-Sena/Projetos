import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Axios from 'axios';

//Css + images
import './Cadastro.css';
import Logo from '../../assets/logoMasangofc1.png'

class Cadastro extends Component {

    constructor() {
        super();
        this.state = {

            nome: "",
            telefone: "",
            cep: "",
            cidade: "",
            estado: "",
            rua: "",
            numero: "",
            horarioAtendimento: "",
            longitude: "",
            latitude: "",
            sang1: '',
            sang2: '',
            sang3: '',
            sang4: '',
            sang5: '',
            sang6: '',
            sang7: '',
            sang8: '',
            sang: [],
            erro: " ",

        }
    }

    // Salvando values do input --- OK
    setNome = (event) => {
        this.setState({ nome: event.target.value })
    }
    setTel = (event) => {
        this.setState({ telefone: event.target.value })
    }
    setCep = (event) => {
        this.setState({ cep: event.target.value })
    }
    setCidade = (event) => {
        this.setState({ cidade: event.target.value })
    }
    setEstado = (event) => {
        this.setState({ estado: event.target.value })
    }
    setEndereco = (event) => {
        this.setState({ rua: event.target.value })
    }
    setNumero = (event) => {
        this.setState({ numero: event.target.value })
    }
    setHora = (event) => {
        this.setState({ horarioAtendimento: event.target.value })
    }
    setLongitude = (event) => {
        this.setState({ longitude: event.target.value })
    }
    setLatitude = (event) => {
        this.setState({ latitude: event.target.value })
    }
    setSangue = (event) => {
        this.setState({ sang1: event.target.value })
    }
    setSangue2 = (event) => {
        this.setState({ sang2: event.target.value })
    }
    setSangue3 = (event) => {
        this.setState({ sang3: event.target.value })
    }
    setSangue4 = (event) => {
        this.setState({ sang4: event.target.value })
    }
    setSangue5 = (event) => {
        this.setState({ sang5: event.target.value })
    }
    setSangue6 = (event) => {
        this.setState({ sang6: event.target.value })
    }
    setSangue7 = (event) => {
        this.setState({ sang7: event.target.value })
    }
    setSangue8 = (event) => {
        this.setState({ sang8: event.target.value })
    }

    // CADASTRO DE HEMOCENTRO --- OK
    fazerCadastro = (event) => {
        event.preventDefault();

        Axios.post("https://masang.dev.objects.universum.blue/hemocentros/", {
            label: "hemocentros",
            nome: this.state.nome,
            telefone: this.state.telefone,
            horarioatendimento: this.state.horarioAtendimento,
            localizacao: { latitude: this.state.latitude, longitude: this.state.longitude },
            endereco: {
                estado: this.state.estado,
                cidade: this.state.cidade,
                rua: this.state.rua,
                cep: this.state.cep,
                numero: this.state.numero,
            },
            tiposEmNecessidade: [
                this.state.sang1,
                this.state.sang2,
                this.state.sang3,
                this.state.sang4,
                this.state.sang5,
                this.state.sang6,
                this.state.sang7,
                this.state.sang8
            ]
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({ erro: "Hemocentro cadastrado" })
                } else {
                    this.setState({ erro: "Erro ao cadastrar" })
                }
            })
    }


    render() {
        return (
            <div className="Cadastro" >
                <div className="cadastroTitle">
                    {/* <Link to="/Services" style={{ textDecoration: 'none' }}><h1 className="Title">Cadastrar Hemocentro</h1></Link> */}
                    <a href="/Services" style={{ textDecoration: 'none' }}><h1 className="Title">Cadastrar Hemocentro</h1></a>

                    <div className="bottomTitle"></div>
                </div>
                <div className="divFormCadastro">
                    <form onSubmit={this.fazerCadastro} className="formCadastro">
                        {/* INPUT NOME DO HEMOCENTRO */}
                        <div className="itemC" >
                            <label htmlFor="nome" className='labelCadastro'>Nome do Hemocentro</label>
                            <input
                                required
                                className="input_cadastro"
                                type="text"
                                name="name"
                                onChange={this.setNome}
                                value={this.state.nome}
                                placeholder=""
                                minLength='5'
                            />
                        </div>

                        {/* INPUT TELEFONE */}
                        <div className="itemC">
                            <label htmlFor="tel" className='labelCadastro'>Telefone</label>
                            <input
                                required
                                className="input_cadastro"
                                type="tel"
                                name="telefone"
                                onChange={this.setTel}
                                value={this.state.telefone}
                                minLength='8'
                            />
                        </div>

                        {/* INPUT CIDADE & ESTADO */}
                        <div className="itemC1" style={{ marginTop: '-3vh' }}   >
                            <div style={{ marginTop: "3vh" }}>
                                <label htmlFor="cidade" className='labelCadastro'>Cidade</label>
                                <input
                                    required
                                    // placeholder="Ex:   São Paulo"
                                    className="input_cadastroA"
                                    type="text"
                                    name="cidade"
                                    onChange={this.setCidade}
                                    value={this.state.cidade}
                                    minLength='3'
                                    maxLength='50'
                                />
                            </div>
                            <div className="hifen"></div>
                            <div style={{ marginTop: "3vh" }}>
                                <label htmlFor="nome" className='labelA'>Estado</label>
                                <input
                                    required
                                    className="input_cadastroB"
                                    type="text"
                                    name="estado"
                                    onChange={this.setEstado}
                                    value={this.state.estado}
                                    maxLength="3"
                                // placeholder="   SP"
                                />
                            </div>
                        </div>

                        {/* INPUT CEP*/}
                        <div className="itemC" style={{ marginTop: '-3vh' }}>
                            <label htmlFor="cep" className='labelCadastro'  >Cep</label>
                            <input
                                required
                                className="input_cadastro"
                                type="cep"
                                name="cep"
                                onChange={this.setCep}
                                value={this.state.cep}
                                minLength='8'
                                maxLength='10'
                            />
                        </div>

                        {/* {input endereco} */}
                        <div className="itemC1" style={{ marginTop: '-3vh' }}   >
                            <div style={{ marginTop: "3vh" }}>
                                <label htmlFor="cidade" className='labelCadastro'>Endereço (Av, Rua)</label>
                                <input
                                    required
                                    // style={{width:'17vw'}}
                                    className="input_cadastroA"
                                    type="text"
                                    name="cidade"
                                    onChange={this.setEndereco}
                                    value={this.state.rua}
                                    minLength='3'
                                />
                            </div>
                            <div className="hifen" style={{ marginLeft: '-5.6vw', width: '1.8vw' }}></div>
                            <div style={{ marginTop: "3vh" }}>
                                <label htmlFor="nome" className='labelA'>Nº</label>
                                <input
                                    required
                                    style={{ width: '5vw', marginRight: '2.7vw' }}
                                    className="input_cadastroB"
                                    type="text"
                                    name="estado"
                                    onChange={this.setNumero}
                                    value={this.state.numero}
                                    maxLength="6"
                                />
                            </div>
                        </div>

                        {/* INPUT HORA */}
                        <div className="itemC" style={{ marginTop: '-3vh' }} >
                            <label htmlFor="hora" className='labelCadastro'>Horário de Atendimento</label>
                            <input
                                required
                                placeholder="Ex:    08:30 - 16:30"
                                className="input_cadastro"
                                type="text"
                                name="hora"
                                onChange={this.setHora}
                                value={this.state.horarioAtendimento}
                            />
                        </div>

                        {/* INPUT LATITUDE */}
                        <div className="itemC" style={{ marginTop: '-5vh' }}>
                            <label htmlFor="latitude" className='labelCadastro'>Latitude</label>
                            <input
                                required
                                className="input_cadastro"
                                placeholder="Ex:   -23.6554971"
                                type="text"
                                name="latitude"
                                onChange={this.setLatitude}
                                value={this.state.latitude}
                                minLength="5"
                                maxLength="11"
                            />
                        </div>

                        {/* Input LONGITUDE */}
                        <div className="itemC" style={{ marginTop: '-5vh' }}>
                            <label htmlFor="longitude" className='labelCadastro'>Longitude</label>
                            <input
                                required
                                placeholder="Ex:   -46.6415725"
                                className="input_cadastro"
                                type="text"
                                name="longitude"
                                onChange={this.setLongitude}
                                value={this.state.longitude}
                                minLength="5" maxLength="11"
                            />
                        </div>

                        <div className="checkBox" style={{ width: '78vw', display: 'flex', flexDirection: 'row', color: '#868686' }}>
                            <label className='labelCadastro' style={{ marginTop: '-3px' }}> Sangue em Necessidade:</label>
                            <div style={{ width: '45vw', display: 'flex', justifyContent: 'space-between', marginRight: '4vw' }}>
                                <div style={{ marginLeft: '-7vw' }}>
                                    <input onClick={this.setSangue} type="checkbox" name="gender" value="A+" />
                                    <label htmlFor="tipo">A+</label>
                                </div>
                                <div>
                                    <input onClick={this.setSangue2} type="checkbox" name="gender" value="A-" />
                                    <label htmlFor="tipo">A-</label>
                                </div>
                                <div>
                                    <input onClick={this.setSangue3} type="checkbox" name="gender" value="B+" />
                                    <label htmlFor="tipo">B+</label>
                                </div>
                                <div>
                                    <input onClick={this.setSangue4} type="checkbox" name="gender" value="B-" />
                                    <label htmlFor="tipo">B-</label>
                                </div>
                                <div>
                                    <input onClick={this.setSangue5} type="checkbox" name="gender" value="AB+" />
                                    <label htmlFor="tipo">AB+</label>
                                </div>
                                <div>
                                    <input onClick={this.setSangue6} type="checkbox" name="gender" value="AB-" />
                                    <label htmlFor="tipo">AB-</label>
                                </div>
                                <div>
                                    <input onClick={this.setSangue7} type="checkbox" name="gender" value="O+" />
                                    <label htmlFor="tipo">O+</label>
                                </div>
                                <div >
                                    <input onClick={this.setSangue8} type="checkbox" name="gender" value="O-" />
                                    <label htmlFor="tipo">O-</label>
                                </div>
                            </div>
                        </div>

                        <div style={{ minHeight: "5vh", marginBottom: '5px', backgroundColor: "white" }}>
                            <p style={{ color: "#868686", textAlign: "center", fontSize: '20px', }}>{this.state.erro}</p>
                        </div>
                        {/* <Link to="/Services"><img src={Logo} style={{ height: '6vh', position: "relative", right: '20', }} /></Link> */}
                        <button className="btn" style={{ marginTop: "67.5vh", position: 'absolute', borderColor: 'grey' }}>
                            Cadastrar
                    </button >
                    </form>
                </div>
            </div>
        );
    }
}


export default Cadastro