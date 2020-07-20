import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { parseJwt } from './services/auth';
import * as serviceWorker from './serviceWorker';

import Home from './pages/Home/Home';
import NaoEncontrado from './pages/NaoEncontrado/NaoEncontrado';
import Login from './pages/Login/Login';
import List from './pages/ListarAluno/Listar';
import CaUser from './pages/CadastrarUsuario/CadastrarUsuario';
import Aluno from './pages/Aluno/Aluno';
import Main from './pages/MainUser/Main';
import Turma from './pages/CadastroTurma/CadastroTurma';
import Dev from './pages/BuscarDev/Dev';
import Redes from './pages/BuscarRedes/Redes';
import Mult from './pages/BuscarMul/Mult';
import AlunosC from './pages/CadastroA/AlunosC';

const RotaLogin = ({ component: Component }) => (
    <Route
        render={props =>
            localStorage.getItem("usuario-senai") !== null ?
                (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }
                        }
                    />
                )
        }
    />
)

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/Login' component={Login} />
                <RotaLogin path='/Main' component={Main} />
                <RotaLogin path='/List' component={List} />
                <RotaLogin path='/CadastrarUsuario' component={CaUser} />
                <RotaLogin path='/Aluno' component={Aluno} />
                <RotaLogin path='/CadastroTurma' component={Turma} />
                <RotaLogin path='/Dev' component={Dev} />
                <RotaLogin path='/Redes' component={Redes} />
                <RotaLogin path='/Mult' component={Mult} />
                <RotaLogin path='/AlunosC' component={AlunosC} />

                <Route component={NaoEncontrado} />

                {/* <Route path='/AlunosC' component={AlunosC} /> */}
            </Switch>
        </div>
    </Router>
);



ReactDOM.render(routing, document.getElementById('root'));