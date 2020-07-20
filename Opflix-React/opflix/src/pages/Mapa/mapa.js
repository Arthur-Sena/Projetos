import React, { Component } from "react";
import { Accordion, Card, Button, Table, ButtonToolbar } from 'react-bootstrap';
import Menu from '../../componentes/Menu.js';
import { Map, GoogleApiWrapper, Marker,InfoWindow } from 'google-maps-react';
// import Marker from 'google-map-react';
// import Marker from '../../assets/img/marker.png';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const PinMarker = ({ Key }) =>
    <div className="pin">
        <img scr={Marker} alt="MArker" className="Marker" />
        <p className="Titulo do Lancamento">{Key}</p>
    </div>


class Mapa extends Component {

    constructor(props) {
        super(props);
        this.state = {
            local: [],
            centro: {
                lat: -23.4549645,
                lng: -46.6960216
            },
        }
    }

    listarLocalizacao = () => {

        fetch('http://192.168.6.115:5000/api/localization')
            .then(response => response.json())
            .then(data => this.setState({ local: data }))

    }

    componentDidMount() {
        console.log(this.state.local)
        this.listarLocalizacao();
    }
    render() {
        return (
            <div style={{ backgroundColor: "#1C1C1C" }}>

                <Menu />
                {/* <br></br>
                <br></br>
                <br></br> */}
                {/* <br></br> */}
                {/* <div style={{ height: '82vh', marginLeft: "8%", width:"84%", border: "solid", borderColor: "Grey" }}> */}


                <Map
                    google={this.props.google}
                    zoom={4}
                    initialCenter={{ lat: -23.4549645, lng: -46.6960216 }}

                // style={{height: '90%',marginBottom:"-50%" }}

                >
                    {this.state.local.map(element => {
                        return (
                            <Marker label={element.nomeLancamento} color="blue" position={{ lat: element.latitude, lng: element.longitude }} />
                            
                        );
                    })}


                </Map>
                {/* </div> */}
                {/* <br></br>
                <br></br>
                <br></br>
                <div style={{ marginLeft: "8%",width:"84%"}}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Filme</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.local.map(element => {
                                return (
                                    <tr key={element.id}>
                                        <td>{element.nomeLancamento}</td>
                                        <td>{element.latitude}</td>
                                        <td>{element.longitude}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
                <br></br>
                <br></br>
                <br></br> */}
            </div>
        );
    }
}

export default GoogleApiWrapper({

})(Mapa);