import React from 'react';

import { Nav, Navbar, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Logo } from '../assets/img/logo.png'
import { parseJwt } from './../services/auth.js';


function Menu() {

    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/Filmes" style={{ color: "red", fontFamily: "Cooper", fontSize: "2em" }}>Opflix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {
                    parseJwt().permissao === '2' ?
                        (
                            <Nav className="mr-auto" >
                                <Nav.Link href="/CadastroAdm" style={{ fontSize: "Large" }}>Cadastrar Adm </Nav.Link>
                                <Nav.Link href="/CadastrarFilme" style={{ fontSize: "Large" }}>Cadastrar Filme </Nav.Link>
                                <Nav.Link href="/CadastrarCategoria" style={{ fontSize: "Large" }}>Cadastrar Genero </Nav.Link>
                                <Nav.Link href="/Mapa" style={{ fontSize: "Large"}}>Localizações </Nav.Link>
                                <Nav.Link href="/" style={{ fontSize: "Large",color:"white"}} onClick={() => localStorage.removeItem('usuario-opflix')}>Logout </Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="mr-auto" >
                                <Nav.Link href="/Filmes/#Filmes" style={{ fontSize: "Large" }}>Lista de Filmes</Nav.Link>
                                <Nav.Link href="/Filmes/#Ultimos" style={{ fontSize: "Large" }}>Ultimos Lançamentos</Nav.Link>
                                <Nav.Link href="/Filmes/#Antigos" style={{ fontSize: "Large" }}>Mais Antigos </Nav.Link>
                                <Nav.Link href="/Mapa" style={{ fontSize: "Large"}}>Localizações</Nav.Link>
                                <Nav.Link href="/" style={{ fontSize: "Large",color:"white"}} onClick={() => localStorage.removeItem('usuario-opflix')}>Logout </Nav.Link>
                            </Nav>
                            )
                }
            </Navbar.Collapse>
        </Navbar>
    );
}
export default Menu;