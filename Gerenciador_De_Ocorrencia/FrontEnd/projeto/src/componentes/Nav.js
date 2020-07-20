import React from 'react';
import { Nav, Navbar, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parseJwt } from '../services/auth.js';
import './nAV.css'

function Menu() {

    return (

        parseJwt().jti === '1' ?
            (
                <Nav className='Nav'
                    activeKey="/home"
                >

                    <Nav.Item>

                        <div className="centro">
                            <ul class="nav justify-content-center">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/Main">Cursos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/CadastrarUsuario">Cadastrar Usuario</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/CadastroTurma">Cadastrar Turma</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/List">Listar Aluno</a>
                                </li>
                                <li class="nav-item">
                                    <Nav.Link className="sair" eventKey="link-2" onClick={() => localStorage.removeItem('usuario-senai')} >Logout</Nav.Link>
                                </li>
                            </ul>

                        </div>
                    </Nav.Item>
                </Nav>

            ) : (

                <Nav className='Nav'
                    activeKey="/home"
                >

                    <Nav.Item>

                        <div className="centro">
                            <ul class="nav justify-content-center">
                                <li class="nav-item">
                                    <a class="nav-link active" href="/Main">Cursos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/List">Listar Aluno</a>
                                </li>
                                <li class="nav-item">
                                    <Nav.Link className="sair" eventKey="link-2" onClick={() => localStorage.removeItem('usuario-senai')} >Logout</Nav.Link>
                                </li>
                            </ul>

                        </div>
                    </Nav.Item>
                </Nav>
            )
    );
}
export default Menu;