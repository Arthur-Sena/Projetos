import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

//Css + images
import './Mapa.css';
import Lupa from '../../assets/icons/iconBusca.png';
import Logo from '../../assets/logoMasangofc1.png';

import IconMarker from '../../assets/icons/iconfinder1.png';

export class Mapa extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listaHemocentros: [],
      hemocentros: [],
      longitude: "-46.6960216",
      latitude: "-22.4549645",
      buscar: ""
    }
  }

  localizarHemocentro = () => {

    fetch('https://masang.dev.objects.universum.blue/hemocentros')
      .then(response => response.json())
      .then(data => this.setState({ hemocentros: data }) + this.setState({ listaHemocentros: data }))
  }

  atualizaEstado(event) {
    this.setState({ buscar: event.target.value }, () => {
      this.FiltrarHemocentro();
    });
  }

  FiltrarHemocentro() {
    let listaFiltrada = this.state.listaHemocentros;

    if (this.state.buscar !== null && this.state.buscar !== "") {
      listaFiltrada = listaFiltrada.filter(
        x =>
          x.nome.toLowerCase().includes(this.state.buscar.toLowerCase()) ||
          x.endereco.toLowerCase().includes(this.state.buscar.toLowerCase())
      );
    }

    this.setState({ hemocentros: listaFiltrada });

    
  }
      mudarPagina() {
        this.props.history.push('/Hemocentro')
      }

  componentDidMount() {
    this.localizarHemocentro();
  }

  render() {
    return (
      <div className="Mapa"
        style={{ display: 'flex', flexDirection: 'row' }}>

        <div className="divHemocentro">

          <div className="buscarHemocentro">
            {/* Div do Input buscar hemocentro */}
            <div className="inputFlex">
              <img src={Lupa} style={{ height: "1.5em", marginTop: "1.8em", marginLeft: '10px' }}></img>
              <input
                title="a"
                className="inputBuscar"
                placeholder="Buscar Hemocentro"
                value={this.state.buscar}
                onChange={this.atualizaEstado.bind(this)}
              ></input>
            </div>

            <div className="inputBottom"></div>
          </div>

          {/* Div da lista de hemocentros */}
          <article className='DivMapa'>
            {this.state.hemocentros.map(element => {
              let x = JSON.parse(element.endereco);
              return (
                <div className="infoHemocentro">
                  {/* <Link to="/Hemocentro" style={{ textDecoration: "none", color: "#868686" }}  onClick={ () => localStorage.setItem("Xid-HX", element.id) + this.mudarPagina()}>
                    <p  style={{ fontSize: 'large', fontWeight: 'bold' }}>
                      {element.nome}</p>
                  </Link> */}
                  
                  {/* <Link style={{ textDecoration:"none" ,fontSize: '20px', color:'#868686', fontWeight: 'bold', marginTop:'10px' }}>{element.nome}</Link> */}
                  {/* <Link  to="/Hemocentro" style={{textDecoration:"none", color:"#868686" }}><p style={{ fontSize: 'large', fontWeight: 'bold' }}>{element.nome}</p></Link> */}
                  <a  href="/Hemocentro" style={{textDecoration:"none", color:"#868686" }}  onClick={ () => localStorage.setItem("Xid-HX", element.id) + this.mudarPagina()} ><p style={{ fontSize: 'large', fontWeight: 'bold' }}>{element.nome}</p></a>

                  <p style={{ marginTop: "-10px" }}>{x.rua} , {x.numero}</p>
                  <p style={{ marginTop: "-10px" }}>{x.cidade} , {x.estado} - {x.cep}</p>

                  <div className="bottomBorder"></div>
                </div>
              );
            })}
          </article>
      
          <div className="logoHome">
            {/* <Link to="/Services"><img src={Logo} style={{ height: '8vh', marginBottom: "3px" }} /></Link> */}
            <a href="/Services"><img src={Logo} style={{ height: '8vh', marginBottom: "3px" }} /></a>

          </div>
        </div>

        {/* Div do mapa */}
        <div className="boxMap" >
          <Map
            google={this.props.google}
            zoom={8}
            initialCenter={{ lat: this.state.latitude, lng: this.state.longitude }}

            style={{ width: '75vw' }}
          >
            {this.state.hemocentros.map(element => {
              let y = JSON.parse(element.localizacao);

              return (
                <Marker
                  // label={element.nome}
                  // labelStyle={{color:'white'}}
                  position={{ lat: y.latitude, lng: y.longitude }}
                  title={element.nome}
                  icon={IconMarker}
                />
              );
            })}
          </Map>
        </div>

      </div>
    );
  }
}

export default GoogleApiWrapper({})(Mapa);