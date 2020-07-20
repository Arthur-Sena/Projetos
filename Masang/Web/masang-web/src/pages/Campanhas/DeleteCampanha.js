import React, { Component } from 'react';
import Axios from 'axios';

import Load from '../../assets/Loading.gif';

class DelCampanha extends Component {

    deletarCampanha = () =>  {
        Axios.delete('https://masang.dev.objects.universum.blue/campanhas/' + localStorage.getItem('id-C'))
            .then(() =>  localStorage.removeItem('id-C') + this.props.history.push('/Campanha'))
    }

    componentDidMount() {
        this.deletarCampanha();
    }

    render() {
        return (
            <div 
             style={{
                backgroundColor:"#f2f2f2" ,
                minHeight: '100vh',
                display:'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems:'center'
                }}  >
                <img src={Load} style={{ height: '20vh'}}/>
                <h3  style={{color: '#f29123'}}>Deletando Campanha</h3>
            </div>
        );
    }
}
export default DelCampanha