import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import senai from "../../assets/img/LogoSenai.jpg";
import dev from "../../assets/img/Dev.png";
import redes from "../../assets/img/redes.jpg";
import code from "../../assets/img/code.jpg";
import multimidia from "../../assets/img/multimidia.jpg";

import {Link} from 'react-router-dom';
import './Home.css';


import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';



//Melhorar BTN de Login

export default class Home extends Component {

  render() {

    return (
      <div className="Home" >

        {/* Inicio --- nav home */}
        <nav style={{ height: '8%', display: 'flex', justifyContent: 'space-between', backgroundColor: 'white' }}>
          <img src={senai} style={{ height: 90, width: 150, marginLeft: '4%', }} />

          <button 
            style={{
              height: 35, marginRight: "7%",
              marginTop: 30, width: 85, backgroundColor: "#005BA8",
              borderColor: "white", borderRadius: 20,
            }} 
            >   
            <Link to='/Login'  style={{textDecoration:'none', color:'white'}}>Login</Link>
            </button>
        </nav>
        {/* Fim --- nav home */}

        {/* Inicio - Main (carousel=bootstrap) */}

        <div style={{marginTop:8}}>

          <Carousel >
            <div className="DivBanner">
              <img src={code} style={{ overflow: 'hidden' }} />
              <p className="legend" style={{ backgroundColor: "white", color: "black", width: "50%", marginLeft: "-25%" }}>Desenvolvimento</p>
            </div>
            <div  className="DivBanner"  >
              <img src={redes} />
              <p className="legend" style={{ backgroundColor: "white", color: "black", width: "50%", marginLeft: "-25%" }}>Redes</p>
            </div>
            <div  className="DivBanner"  >
              <img src={dev} />
              <p className="legend" style={{ backgroundColor: "white", color: "black", width: "50%", marginLeft: "-25%" }}>Code</p>
            </div>
            <div className="DivBanner"  >
              <img src={multimidia} />
              <p className="legend" style={{ backgroundColor: "white", color: "black", width: "50%", marginLeft: "-25%" }}>Multimidia</p>
            </div>
          </Carousel>

        </div>
        {/* FIm - Main*/}

      </div>
    );
  }
}

