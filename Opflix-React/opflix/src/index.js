import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//paginas
import App from './pages/Home/App';
import Filmes from './pages/Filmes/Filmes';
import Cadastro from './pages/Cadastro/Cadastrar';
// import ADM from './pages/Adm/Adm';
import CadastroAdm from './pages/CadastrarAdm/CadastrarAdm';
import CadastrarFilmes from './pages/CadastrarFilmes/CadastrarFilme';
import CadastrarCategoria from './pages/CadastrarCategoria/CadastrarCategoria';
import Mapa from './pages/Mapa/mapa';

import NaoEncontrado from "./pages/NaoEncontrado/NaoEncontrado";

//rotas
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import { parseJwt } from './services/auth.js';
import * as serviceWorker from './serviceWorker';
// import { parseJwt } from './services/auth';

const RotaLogin = ({component: Component}) => (
    <Route 
        render={ props =>
            localStorage.getItem("usuario-opflix") !== null  ?
            (
                <Component {...props}/>
            ) : (
                <Redirect 
                    to={{pathname: "/",state: {from: props.location}}
                }
                />
            )
        }
    />
)
const RotaAdm = ({component: Component}) => (
    <Route 
        render={ props =>
            parseJwt().permissao === '2'  ?
            (
                <Component {...props}/>
            ) : (
                <Redirect 
                    to={{pathname: "/",state: {from: props.location}}
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
                <Route exact path='/' component={App} />
                <Route exact path='/Cadastro' component={Cadastro} />
                <RotaLogin path='/Filmes' component={Filmes} />
                <RotaAdm path='/CadastroAdm' component={CadastroAdm} />
                <RotaAdm path='/CadastrarFilme' component={CadastrarFilmes} />
                <RotaAdm path='/CadastrarCategoria' component={CadastrarCategoria} />
                <RotaLogin path='/Mapa' component={Mapa} />
                <Route component={NaoEncontrado}/>
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
