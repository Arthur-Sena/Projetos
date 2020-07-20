import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import Chart from '../../components/Chart';


// // import Axios from 'axios';

// //Css + images
import './Dash.css';
import Logo from '../../assets/logoMasangofc1.png';

let ap = [];
let an = [];
let bp = [];
let bn = [];
let op = [];
let on = [];
let Abp = [];
let Abn = [];

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
            qntUser: '',
            qntHemocentro: '',
            pedidos: [],
            sangueAp: 4,
            sangueAn: 2,
            sangueBp: 2,
            sangueBn: 0,
            sangueABp: 0,
            sangueABn: 0,
            sangueOp: 1,
            sangueOn: 0,
        }
    }
    // Contadores de hemocentro e usuarios
    countHemocentro = () => {
        fetch('https://masang.dev.objects.universum.blue/hemocentros/count')
            .then(response => response.json())
            .then(data => this.setState({ qntHemocentro: data })
            )
    }
    countUser = () => {
        fetch('https://masang.dev.objects.universum.blue/usuarios/count')
            .then(response => response.json())
            .then(data => this.setState({ qntUser: data })
            )
    }
    // Listar Usuarios
    listUser = () => {
        fetch('https://masang.dev.objects.universum.blue/usuarios/')
        .then(response => response.json())
        .then(data => {
            ap = data.filter( x => x.tipoSanguineo === 'A+')
            this.setState({ sangueAp : ap.length})

            an = data.filter( x => x.tipoSanguineo === 'A-')
            this.setState({ sangueAn : an.length})

            bp = data.filter( x => x.tipoSanguineo === 'B+')
            this.setState({ sangueBp : bp.length})

            bn = data.filter( x => x.tipoSanguineo === 'B-')
            this.setState({ sangueBn : bn.length})
          
            Abp = data.filter( x => x.tipoSanguineo === 'AB+')
            this.setState({ sangueABp : Abp.length})

            Abn = data.filter( x => x.tipoSanguineo === 'AB-')
            this.setState({ sangueABn : Abn.length})

            op = data.filter( x => x.tipoSanguineo === 'O+')
            this.setState({ sangueOp : op.length})
            
            on = data.filter( x => x.tipoSanguineo === 'O-')
            this.setState({ sangueOn : on.length})
        })
    }

    
    // Lista de Pedidos
    listPedidos = () => {
        fetch('https://masang.dev.objects.universum.blue/pedidos')
            .then(response => response.json())
            .then(data => this.setState({ pedidos: data.reverse() })
            )
    }

    componentDidMount() {
        this.countHemocentro();
        this.countUser();
        this.listPedidos();
        this.listUser();
    }
    componentWillMount() {
        this.getChartData();
    }
    // Grafico
    getChartData() {
        this.setState({
            chartData: {
                labels: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                datasets: [
                    {
                        label: 'Quantidade de Usuarios',
                        data: [ this.state.sangueAp , this.state.sangueAn , this.state.sangueBp , this.state.sangueBn,
                        this.state.sangueABp, this.state.sangueABn, this.state.sangueOp, this.state.sangueOn],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(99, 255, 132, 0.6)',
                            'rgba(99, 132, 255, 0.6)',
                            'rgba(132, 99, 255, 0.6)',
                            'rgba(255, 132, 99, 0.6)',
                            'rgba(132, 255, 99, 0.6)',
                            'rgba(255, 0, 255, 0.6)',
                            'rgba(99, 99, 99, 0.6)'
                        ],
                    }
                ]
            }
        })
    }
    render() {
        return (
            <div className="Dashboard" >
                {/* Grafico */}
                <div className="divGrafico">
                    <div className="tituloGrafico" style={{ marginLeft: "5vw", width: '47vw' }}>
                        <h3 className="h3titulo">Quantidade de doadores por tipo sanguíneo</h3>
                    </div>
                    <div className="grafico">
                        <Chart chartData={this.state.chartData} />

                    </div>
                </div>

                <div className="listaDash">
                    {/* Quantidade de Hemocentro e Usuarios */}
                    <div className="divsQnt">
                        <div className="userQnt">
                            <div className="userTitle">
                                {/* <Link to="/Usuarios" style={{ textDecoration: 'none' }}><h3 className="h3titulo"> Quantidade de Usuarios</h3></Link> */}
                                <a href="/Usuarios" style={{ textDecoration: 'none' }}><h3 className="h3titulo"> Quantidade de Usuarios</h3></a>

                            </div>
                            <div className="numero">
                                <a href="/Usuarios" style={{ textDecoration: 'none', color: '#868686' }}><h3>{this.state.qntUser}</h3></a>
                            </div>
                        </div>
                        <div className="userQnt" style={{ marginLeft: '1vw' }}>
                            <div className="userTitle">
                                {/* <Link to="/Mapa" style={{ textDecoration: 'none' }}><h3 className="h3titulo"> Quantidade de Hemocentros</h3></Link> */}
                                <a href="/Mapa" style={{ textDecoration: 'none' }}><h3 className="h3titulo"> Quantidade de Hemocentros</h3></a>

                            </div>
                            <div className="numero">
                                {/* <Link to="/Mapa" style={{ textDecoration: 'none', color: '#868686' }}><h3>{this.state.qntHemocentro}</h3></Link> */}
                                <a href="/Mapa" style={{ textDecoration: 'none', color: '#868686' }}><h3>{this.state.qntHemocentro}</h3></a>

                            </div>
                        </div>
                    </div>

                    <div className="listaDoacoes" >
                        <div className="tituloGrafico" style={{ width: '40vw' }}>
                            <h3 className="h3titulo">Ultimas Pedidos de Doação</h3>
                        </div>
                        <div className="testandoDiv">
                            <div className="ultimasDoacoes">
                                {this.state.pedidos.map(element => {
                                    let efetuado;
                                    let x = element.dataSolicitacao;
                                    let y = x.split(' ');
                                    let z = y[0].split('-');
                                    let data = z[2] + "/" + z[1] + "/" + z[0];

                                    element.efetuadoMatch === 'true' ? (efetuado = "já encontrou doador  ") : (efetuado = "ainda não encontrou doardor")
                                    return (
                                        <div className="infoDoacao">
                                            <p style={{ fontSize: 'large', fontWeight: "500", color: '#868686' }}>Pedido de sangue {element.tipoSanguineo} cadastrado no dia {data} , {efetuado}</p>
                                            <div className="bottomList" style={{ marginTop: '-7px' }}></div>
                                            {/* <h4>An: {this.state.sangueAn}, Ap= {this.state.sangueAp}, Bp={this.state.sangueBp}, Bn={this.state.SangueBn}, ABp={this.state.sangueABp}</h4> */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default Dashboard

