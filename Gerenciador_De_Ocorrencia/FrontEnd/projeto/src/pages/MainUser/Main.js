import React, { Component } from 'react';
import './Main.css';
import dev from '../../assets/img/laptop.png';
import redes from '../../assets/img/redes.png';
import mult from '../../assets/img/mult.png';
import code from '../../assets/img/coode.png';
import Nav from '../../componentes/Nav';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

export default class Main extends Component {

    render() {
        return (
            <div className="Main">
                <Nav />
                <h1>Cursos</h1>

                <br/>
                <div className="tudo">
                <div className="foto1">
                    <div className="ft1">
                        <img src={dev} style={{height:'150px'}}/>
                    </div>
                        <Link className="dev" to='/Dev'> Desenvolvimento de Sistemas</Link>
                </div>

                <div className="foto2">
                    <div className="ft2">
                        <img src={redes} style={{height:'150px'}}/>
                        </div>
                        
                        <Link className="rc" to='/Redes'> Redes de Computadores</Link>
                      
                </div>

                <div className="foto3">
                    <div className="ft3">
                        <img src={mult} style={{height:'150px'}}/>
                        </div>
                        <Link className="mult" to='/Mult'> Multimidia</Link>
                </div>

                <div className="foto4">
                    <div className="ft4">
                        <img src={code} style={{height:'150px'}}/>
                        </div>
                        <Link className="code" to='/'> Code</Link>
                </div>
                </div>
            </div>


        );
    }
}