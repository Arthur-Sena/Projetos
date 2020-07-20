import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect';

//PÁGINAS
import CadHemocentro from '../pages/CadastroHemocentro/Cadastro';

import GetCampanhas from '../pages/Campanhas/Campanhas';
import PutCampanhas from '../pages/Campanhas/AtualizarCampanha';
import DelCampanhas from '../pages/Campanhas/DeleteCampanha';
import CadCampanhas from '../pages/Campanhas/CadastrarCampanha';

import Dashboard from '../pages/Dashboard/Dash';

import Hemocentro from '../pages/Hemocentro/Hemocentro';
import DelHemocentro from '../pages/Hemocentro/Delete';

import Usuarios from '../pages/Usuarios/Usuario';
import GetUsuario from '../pages/Usuarios/oneUser';





//TESTES INSTÂNTANEOS
describe('Cadastro Hemocentro Component [LOGINSCREEN]', () => {

    let CadHemo, GetCamp, PutCamp, DelCamp, CadCamp, Dash, Hemo, DelHemo, User, oneUser;

    beforeEach(() => {

        CadHemo = shallow(< CadHemocentro />)
        GetCamp = shallow(< GetCampanhas />)
        PutCamp = shallow(< PutCampanhas />)
        DelCamp = shallow(< DelCampanhas />)
        CadCamp = shallow(< CadCampanhas />)
        Dash = shallow(< Dashboard />)
        Hemo = shallow(< Hemocentro />)
        DelHemo = shallow(< DelHemocentro />)
        User = shallow(< Usuarios />)
        oneUser = shallow(< GetUsuario />)

    });


    test('deve executar a class e ciclos de vida sem crashar', () => {

        expect(mount(<CadHemocentro />)).toMatchSnapshot();
        expect(mount(<GetCampanhas />)).toMatchSnapshot();
        expect(mount(<PutCampanhas />)).toMatchSnapshot();
        expect(mount(<DelCampanhas />)).toMatchSnapshot();
        expect(mount(<CadCampanhas />)).toMatchSnapshot();
        expect(mount(<Dashboard />)).toMatchSnapshot();
        expect(mount(<Hemocentro />)).toMatchSnapshot();
        expect(mount(<DelHemocentro />)).toMatchSnapshot();
        expect(mount(<Usuarios />)).toMatchSnapshot();
        expect(mount(<GetUsuario />)).toMatchSnapshot();

    });

    test('deve executar o componente pai sem crashar', () => {
        expect(CadHemo).toMatchSnapshot();
        expect(GetCamp).toMatchSnapshot();
        expect(PutCamp).toMatchSnapshot();
        expect(DelCamp).toMatchSnapshot();
        expect(CadCamp).toMatchSnapshot();
        expect(Dash).toMatchSnapshot();
        expect(Hemo).toMatchSnapshot();
        expect(DelHemo).toMatchSnapshot();
        expect(User).toMatchSnapshot();
        expect(oneUser).toMatchSnapshot();
    });

});
