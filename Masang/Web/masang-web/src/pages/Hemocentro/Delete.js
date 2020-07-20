import React, { Component } from 'react';
import Axios from 'axios';

import Loading from '../../assets/Loading.gif'

class Del extends Component {

    deletarHemocentro = () => {
        Axios.delete('https://masang.dev.objects.universum.blue/hemocentros/' + localStorage.getItem('Xid-HX'))
            .then(() =>  localStorage.removeItem('Xid-HX') + this.props.history.push('/Mapa'))
    }

    componentDidMount() {
        this.deletarHemocentro();
    }

    render() {
        return (
            <div className="DivDelete"  
            style={{
                backgroundColor:"#f2f2f2" ,
                minHeight: '100vh',
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center'
                }}  >
                <img src={Loading} style={{ height: '20vh'}}/>
                <h3  style={{color: '#f29123'}}>Deletando Hemocentro</h3>
            </div>
        );
    }
}
export default Del