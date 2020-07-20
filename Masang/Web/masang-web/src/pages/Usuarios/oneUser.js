import React, { Component } from 'react';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

// import Axios from 'axios';



//Css + images
import './Usuario.css';
import User from '../../assets/User.png'

let ativo;
let data = [];
class oneUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: {},
            data: [],
        }
    }

    buscarUsuario = () => {

        fetch('https://masang.dev.objects.universum.blue/usuarios/' + localStorage.getItem('Xid-UX'))
            .then(response => response.json())
            .then(data => this.setState({ usuario: data }))
            this.state.usuario.aptoADoar === 'true' ? (ativo = "Doador"):(ativo = "Não Doador")

            // let x = this.state.usuario.dataNascimento.split(' ')
            // let data = x.split('-')
        }

    componentDidMount() {
        this.buscarUsuario();
    }

    render() {
        return (
            <div className="divOneUser" >

                <div className="cadastroTitle" style={{ marginTop: '-1vh' }}>
                    {/* <Link to="/Usuarios" style={{ textDecorationColor: '#f29123' }}> */}
                    <a href="/Usuarios" style={{ textDecorationColor: '#f29123' }}>

                        <h1 className="Title"  >{this.state.usuario.nome}</h1>

                    </a>
                </div>

                <div className='infoUser'>

                    <div className='imgUser'>
                        {this.state.usuario.caminhoImagem != null ? (

                                <img src={this.state.usuario.caminhoImagem} style={{ height: '100%', width: '100%' }} />
                        ) : (
                                <img src={User} style={{ height: '100%', width: '150%', marginLeft:'-25%' }}/>
                            )}
                    </div>

                    <div className='dadosUser'>

                        <p><strong  > Nome :</strong>  {this.state.usuario.nome}</p>
                        <p><strong  > Email :</strong>  {this.state.usuario.email}</p>
                        <p><strong  > Sexo :</strong>  {this.state.usuario.sexo}</p>
                        {/* <p><strong  > Data de Nascimento :</strong>  {data[2]}/{data[1]}/{data[0]}</p> */}
                        <p><strong  > Tipo Sanguíneo :</strong>  {this.state.usuario.tipoSanguineo}</p>

                        <p><strong  > Nome :</strong>  {ativo}</p>
                    </div>



                </div>

            </div>
        );
    }
}

export default oneUser