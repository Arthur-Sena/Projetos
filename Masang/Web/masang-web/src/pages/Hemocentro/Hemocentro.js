import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import Axios from 'axios';

//Css + images
import './Hemocentro.css';

class Hemocentro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dados: {},
      local: {},

      nome: "",
      tel: "",
      horarioatendimento: "",
      longitude: "",
      latitude: "",
      cep: "",
      estado: '',
      cidade: '',
      rua: '',
      numero: '',
      sang1: '',
      sang2: '',
      sang3: '',
      sang4: '',
      sang5: '',
      sang6: '',
      sang7: '',
      sang8: '',

      erro: '',
    }
  }

  buscarHemocentro = () => {
    fetch('https://masang.dev.objects.universum.blue/hemocentros/' + localStorage.getItem('Xid-HX'))
      .then(response => response.json())
      .then(data => {
        this.setState({ dados: data })
        this.setState({ nome: data.nome })
        this.setState({ telefone: data.telefone })

        let x = JSON.parse(data.endereco)
        this.setState({ cidade: x.cidade })
        this.setState({ estado: x.estado })
        this.setState({ numero: x.numero })
        this.setState({ rua: x.rua })
        this.setState({ cep: x.cep })
        this.setState({ horarioatendimento: data.horarioatendimento })

        let y = JSON.parse(data.localizacao)
        this.setState({ latitude: y.latitude })
        this.setState({ longitude: y.longitude })

        // let z = JSON.parse(data.tiposEmNecessidade)
      })


  }

  setNome = (event) => {
    this.setState({ nome: event.target.value })
  }
  setTel = (event) => { this.setState({ telefone: event.target.value }) }
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


  atualizarHemocentro = (event) => {
    event.preventDefault();

    Axios.put('https://masang.dev.objects.universum.blue/hemocentros/' + localStorage.getItem('Xid-HX'), {
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
        } 
      },{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.status === 200) {
          alert("Hemocentro Atualizado" )
          window.location.reload();
      } else {
          this.setState({ erro: "Erro ao Atualizar" })
      }
  })
  }
// tiposEmNecessidade: [
        //   this.state.sang1,
        //   this.state.sang2,
        //   this.state.sang3,
        //   this.state.sang4,
        //   this.state.sang5,
        //   this.state.sang6,
        //   this.state.sang7,
        //   this.state.sang8
        // ]

  componentDidMount() {
    this.buscarHemocentro();
  }

  render() {

    return (
      <div className="Hemocentro" >
        <div className="hemocentroTitle">
          {/* <Link to="/Mapa" style={{ textDecorationColor: '#b90404' }}><h1 className="Title">{this.state.dados.nome}</h1></Link> */}
          <a href="/Mapa" style={{ textDecorationColor: '#b90404' }}><h1 className="Title">{this.state.dados.nome}</h1></a>

          {/* <div className="bottomTitle" style={{ width: "31vw" }}></div> */}
        </div>

        <div className="divFormCadastro" style={{ marginTop: '-2vh' }}>

          <form onSubmit={this.atualizarHemocentro} className="formCadastro">


            {/* INPUT NOME DO HEMOCENTRO --- OK*/}
            <div className="itemC" >
              <label htmlFor="nome" className='labelCadastro'>Nome do Hemocentro</label>
              <input
                className="input_cadastro"
                type="text"
                name="name"
                onChange={this.setNome}
                defaultValue={this.state.nome}
              />
            </div>



            {/* INPUT TELEFONE --- OK*/}
            <div className="itemC">
              <label htmlFor="tel" className='labelCadastro'>Telefone</label>
              <input
                className="input_cadastro"
                type="tel"
                name="telefone"
                defaultValue={this.state.telefone}
                onChange={this.setTel}
                minLength='8'
              />
            </div>



            {/* INPUT CIDADE & ESTADO --- OK*/}
            <div className="itemC1" style={{ marginTop: '-3vh' }}   >
              <div style={{ marginTop: "3vh" }}>
                <label htmlFor="cidade" className='labelCadastro'>Cidade</label>
                <input
                  className="input_cadastroA"
                  type="text"
                  name="cidade"
                  defaultValue={this.state.cidade}
                  onChange={this.setCidade}
                  minLength='3'
                  maxLength='50'
                />
              </div>
              <div className="hifen"></div>
              <div style={{ marginTop: "3vh" }}>
                <label htmlFor="nome" className='labelA'>Estado</label>
                <input
                  style={{ textAlign: 'center' }}
                  className="input_cadastroB"
                  type="text"
                  name="estado"
                  defaultValue={this.state.estado}
                  onChange={this.setEstado}
                  maxLength="3"
                // placeholder="   SP"
                />
              </div>
            </div>




            {/* INPUT CEP --- OK*/}
            <div className="itemC" style={{ marginTop: '-3vh' }}>
              <label htmlFor="cep" className='labelCadastro'  >Cep</label>
              <input
                className="input_cadastro"
                type="cep"
                name="cep"
                defaultValue={this.state.cep}

                onChange={this.setCep}
                minLength='8'
                maxLength='10'
              />
            </div>



            {/* INPUT ENDERECO --- OK*/}
            <div className="itemC1" style={{ marginTop: '-3vh' }}   >
              <div style={{ marginTop: "3vh" }}>
                <label htmlFor="cidade" className='labelCadastro'>Endereço (Av, Rua)</label>
                <input
                  // style={{width:'17vw'}}
                  className="input_cadastroA"
                  type="text"
                  name="cidade"
                  defaultValue={this.state.rua}
                  onChange={this.setEndereco}
                  minLength='3'
                />
              </div>
              <div className="hifen" style={{ marginLeft: '-5.6vw', width: '1.8vw' }}></div>
              <div style={{ marginTop: "3vh" }}>
                <label htmlFor="nome" className='labelA'>Nº</label>
                <input
                  style={{ width: '5vw', marginRight: '2.7vw', textAlign: 'center' }}
                  className="input_cadastroB"
                  type="text"
                  name="estado"
                  defaultValue={this.state.numero}
                  onChange={this.setNumero}
                  maxLength="6"
                />
              </div>
            </div>



            {/* INPUT HORA --- OK*/}
            <div className="itemC" style={{ marginTop: '-3vh' }} >
              <label htmlFor="hora" className='labelCadastro'>Horário de Atendimento</label>
              <input
                className="input_cadastro"
                type="text"
                name="hora"
                defaultValue={this.state.horarioatendimento}
                onChange={this.setHora}
              />
            </div>



            {/* INPUT LATITUDE --- OK , DA PRA MELHORAR*/}
            <div className="itemC" style={{ marginTop: '-5vh' }}>
              <label htmlFor="latitude" className='labelCadastro'>Latitude</label>
              <input
                className="input_cadastro"
                type="text"
                name="latitude"
                defaultValue={this.state.latitude}
                onChange={this.setLatitude}
                minLength="5"
                maxLength="11"
              />
            </div>



            {/* Input LONGITUDE --- OK , DA PRA MELHORAR*/}
            <div className="itemC" style={{ marginTop: '-5vh' }}>
              <label htmlFor="longitude" className='labelCadastro'>Longitude</label>
              <input
                className="input_cadastro"
                type="text"
                name="longitude"
                defaultValue={this.state.longitude}
                onChange={this.setLongitude}
                minLength="5" maxLength="11"
              />
            </div>



            {/* Sangue em necessidade  --- OK*/}
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



            {/* Aviso de erro --- OK*/}
            <div style={{ minHeight: "3vh", marginBottom: '5px', backgroundColor: "white" }}>
              <p style={{ color: "#868686", textAlign: "center", fontSize: '20px', }}>{this.state.erro}</p>
            </div>


            {/* BTN ATUALIZAR --- DA PRA MELHORAR*/}
            <button className="btn" style={{ marginTop: "67.5vh", marginLeft: '-6vw', position: 'absolute', borderColor: 'grey' }}
              type='submit'
            >
              Atualizar
            </button >


            {/* BTN DELETAR ---  OK*/}
            <button className="btn"
              onClick={() => this.props.history.push('/Del')}
              style={{
                marginTop: "67.5vh", position: 'absolute', marginLeft: '67.5vw'
                , borderColor: 'grey', backgroundColor: '#b90404', marginLeft: '6vw'
              }}>
              Deletar
            </button >
          </form>
        </div>


      </div>
    );
  }
}


export default Hemocentro