import React, { Component } from 'react';
// import { Link} from "react-router-dom";
import { Route, Link, Switch, Redirect, Router} from "react-router-dom";

// import Axios from 'axios';

//Css + images
import './Services.css';
import IconPrincipal from '../../assets/icons/icon-bloodTransfusion.png'; //Icone de doacao de sangue
import IconHospital from '../../assets/icons/hospital.png'; //Icone do banco de sangue
import IconBolsaDeSangue from '../../assets/icons/bloodBag.png'; //Icone de bolsas de sangue
import IconTipoSanguineo from '../../assets/icons/bloodType.png'; //Icone de tipo sanguineo
import IconSangue from '../../assets/icons/bloodSample.png'; //Icone de ... icone
import IconDash from '../../assets/icons/dashBoard.png'; //Icone de dashboard icone


class Services extends Component {

    render() {
        return (
            <div className="Services">

                {/* Titulo da pagina */}
                <div className="divTitle">
                    <h1 className="H1Services">Nossas Soluções</h1>

                    <div  className="linhaGradiente"> </div>
                    {/* <div className="linhaGradiente"  >            </div> */}
                </div>

                {/* Subtitulo da pagina */}
                <div className="subTitle">

                    <p className="text"> Nossa empresa trabalha para que a doação de sangue intensifique-se e cada vez mais vidas possam ser salvas no país. Visando isto, nós fornecemos todas as informações e caminhos que você precisa!</p>

                </div>

                {/*Inicio da Main */}
                <div className="divMain">
                    <div className="subDiv" style={{ width: '40%' }}>
                        <img src={IconPrincipal} style={{ height: '12vh' }} />
                    </div>
                    <div className="subDiv" style={{ width: '45%' }}>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut Lorem ipsum dolor sit </p>
                    </div>
                </div>

                {/* Cards de solucoes */}
                <div className="divCards">

                    <div className="card">
                        <img src={IconHospital} className="inCard" />
                        <div    className="miniCard">
                            {/* <Link to="/Mapa" style={{textDecoration:"none"}}><h4>Buscar Hemocentro</h4></Link> */}
                            <a href="/Mapa" style={{textDecoration:"none"}}><h4>Buscar Hemocentro</h4></a>

                            <p>Veja dados e localizações de todos os hemocentros cadastrados na plataforma</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={IconTipoSanguineo} className="inCard" />
                        <div    className="miniCard">
                            {/* <Link  to="/CadastroHemocentro" style={{textDecoration:"none"}}><h4>Cadastrar Hemocentro</h4></Link> */}
                            <a href="/CadastroHemocentro" style={{textDecoration:"none"}}> <h4>Cadastrar Hemocentro</h4> </a>

                            <p>Cadastre os dados do hemocentros na plataforma</p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={IconBolsaDeSangue} className="inCard" />
                        <div    className="miniCard">
                        {/* <Link   to="/Campanha"     style={{textDecoration:"none"}}><h4>Listar Campanhas</h4></Link> */}
                        <a href="/Campanha" style={{textDecoration:"none"}}><h4>Listar Campanhas</h4>  </a>

                            <p>Cadastre novas campanhas e liste todas as já cadastradas na plataforma </p>
                        </div>
                    </div>

                    <div className="card">
                        <img src={IconDash} className="inCard" />
                        <div    className="miniCard">                           
                            {/* <Link to="/Dashboard"   style={{textDecoration:"none"}}><h4>Dashboard</h4></Link> */}
                            <a href="/Dashboard"   style={{textDecoration:"none"}}><h4>Dashboard</h4></a>


                            <p>Veja todas as informações da plataforma detalhadamente através de gráficos e tabelas.</p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Services