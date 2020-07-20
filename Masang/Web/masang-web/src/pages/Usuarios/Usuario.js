import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// import Axios from 'axios';

//Css + images
import './Usuario.css';
import Logo from '../../assets/logoMasangofc1.png'

class Usuario extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            usersX: [],
            busrcar: "",
            xx: '',
        }
    }

    listUser = () => {

        fetch('https://masang.dev.objects.universum.blue/usuarios/')
            .then(response => response.json())
            .then(data => this.setState({ users: data }) + this.setState({ usersX: data }))
    }

    atualizaEstado(event) {
        this.setState({ buscar: event.target.value }, () => {
            this.FiltrarUsuario();
        });
    }

    FiltrarUsuario() {
        let listaFiltrada = this.state.usersX;
        let ativo;

        if (this.state.buscar !== null && this.state.buscar !== "") {
            listaFiltrada = listaFiltrada.filter(
                // x.aptoADoar === true ? (ativo = "Doador") : (ativo = "Não Doador"),
                x =>

                    x.nome.toLowerCase().includes(this.state.buscar.toLowerCase()) ||
                    x.email.toLowerCase().includes(this.state.buscar.toLowerCase()) ||
                    x.sexo.toLowerCase().includes(this.state.buscar.toLowerCase()) ||
                    x.tipoSanguineo.toLowerCase().includes(this.state.buscar.toLowerCase())

            );
        }

        this.setState({ users: listaFiltrada });
        console.log(listaFiltrada.length);

    }

    componentDidMount() {
        this.listUser();
    }

    render() {
        return (
            <div className="divUser" >
                <div className="cadastroTitle" style={{ marginTop: '-5vh' }}>
                    {/* <Link to="/Services"    style={{textDecoration: 'none'}}><h1 className="Title"  >Lista Usuarios</h1></Link> */}
                    <a href="/Services" style={{ textDecoration: 'none' }}><h1 className="Title"  >Lista Usuarios</h1></a>

                    <div className="bottomTitle" style={{ width: '18vw', height: '1vh', marginTop: '-4vh' }}></div>
                </div>

                <div className='inputTable'>
                    <input className="input_cadastro"

                        value={this.state.buscar}
                        onChange={this.atualizaEstado.bind(this)}
                        placeholder=" Buscar Usuário"
                    />
                </div>

                <div className="divTable">
                    <table border="2" className="userTable" >
                        <thead className="thead">
                            <tr className='th'>
                                <th > Nome </th>
                                <th> Email </th>
                                <th> Sexo </th>
                                <th> Tipo Sanguineo </th>
                                <th> Atividade </th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {this.state.users.map(element => {
                                let ativo;
                                element.aptoADoar === 'true' ? (ativo = "Doador") : (ativo = "Não Doador")
                                return (
                                    <tr className='tr'>
                                        {/* <td><Link to='/oneUser' onClick={() =>  localStorage.setItem("Xid-UX", element.id)} style={{textDecoration:"none" , color:'#868686'}}>  {element.nome}  </Link></td>
                                        <td><Link to='/oneUser' onClick={() =>  localStorage.setItem("Xid-UX", element.id)}style={{textDecoration:"none" , color:'#868686'}}>  {element.email}  </Link></td>
                                        <td><Link to='/oneUser' onClick={() =>  localStorage.setItem("Xid-UX", element.id)}style={{textDecoration:"none" , color:'#868686'}}>  {element.sexo}  </Link></td>
                                        <td><Link to='/oneUser' onClick={() =>  localStorage.setItem("Xid-UX", element.id)}style={{textDecoration:"none" , color:'#868686'}}>  {element.tipoSanguineo}  </Link></td>
                                        <td><Link to='/oneUser' style={{textDecoration:"none" , color:'#868686'}}>  {ativo}  </Link></td> */}

                                        <td><a href='/oneUser' onClick={() => localStorage.setItem("Xid-UX", element.id)} style={{ textDecoration: "none", color: '#868686' }}>  {element.email}  </a></td>
                                        <td><a href='/oneUser' onClick={() => localStorage.setItem("Xid-UX", element.id)} style={{ textDecoration: "none", color: '#868686' }}>  {element.nome}  </a></td>
                                        <td><a href='/oneUser' onClick={() => localStorage.setItem("Xid-UX", element.id)} style={{ textDecoration: "none", color: '#868686' }}>  {element.sexo}  </a></td>
                                        <td><a href='/oneUser' onClick={() => localStorage.setItem("Xid-UX", element.id)} style={{ textDecoration: "none", color: '#868686' }}>  {element.tipoSanguineo}  </a></td>
                                        <td><a href='/oneUser' style={{ textDecoration: "none", color: '#868686' }}>  {ativo}  </a></td>

                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>

                </div>
            </div>
        );
    }
}

export default Usuario