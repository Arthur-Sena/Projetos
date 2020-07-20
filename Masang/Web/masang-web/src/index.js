import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//paginas
import Login from './pages/Login/Login';
import Cadastro from './pages/CadastroHemocentro/Cadastro';
import Services from './pages/Services/Services';
import Mapa from './pages/Mapa/Mapa';
import Hemocentro from './pages/Hemocentro/Hemocentro';
import Del from './pages/Hemocentro/Delete';
import Dash from './pages/Dashboard/Dash';
import User from './pages/Usuarios/Usuario';
import oneUser from './pages/Usuarios/oneUser';
import Campanha from './pages/Campanhas/Campanhas';
import CadastrarCampanha from './pages/Campanhas/CadastrarCampanha';
import DeleteCampanha from './pages/Campanhas/DeleteCampanha';
import AtualizarCampanha from './pages/Campanhas/AtualizarCampanha';

//-------------------------//
import { Route, Link, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import * as serviceWorker from './serviceWorker';
//-------------------------//

// const RotaLogin = ({component: Component}) => (
//     <Route 
//         render={ props =>
//             localStorage.getItem("user-masang") !== null  ?
//             (
//                 <Component {...props}/>
//             ) : (
//                 <Redirect 
//                     to={{pathname: "/",state: {from: props.location}}
//                 }
//                 />
//             )
//         }
//     />
// )

//INSERIR ROTAS PRIVADAS
const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route path='/Services' component={Services} />
                <Route path='/Mapa' component={Mapa} />
                
                <Route path='/CadastroHemocentro' component={Cadastro} />
                <Route path='/Hemocentro' component={Hemocentro} />
                <Route path='/Dashboard' component={Dash} />
                <Route path='/Usuarios' component={User} />
                <Route path='/oneUser' component={oneUser} />
                <Route path='/Del' component={Del} />
                <Route path='/Campanha' component={Campanha} />
                <Route path='/CadastrarCampanha' component={CadastrarCampanha} />
                <Route path='/DeleteCampanha' component={DeleteCampanha} />
                <Route path='/AtualizarCampanha' component={AtualizarCampanha} />
            </Switch>
        </div>
    </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();