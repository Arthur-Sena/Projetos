import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../pages/Login/Login';
import { shallow, mount } from 'enzyme';
import '@testing-library/jest-dom/extend-expect'


//TESTES INSTÂNTANEOS
describe('Login Component [LOGINSCREEN]', () => {

    let component;

    beforeEach(() => {
        component = shallow(<Login />);
    });

    test('deve injetar corretamente um elemento', () => {
        const componenteInput = renderer.create(<input />).toJSON();
        expect(componenteInput).toMatchSnapshot();
    });

    test('deve executar a class e ciclos de vida sem crashar', () => {
        const classLogin = mount(<Login />);
        expect(classLogin).toMatchSnapshot();
    });

    test('deve executar o componente pai sem crashar', () => {
        expect(component).toMatchSnapshot();
    });

    test('deve iniciar váriáveis iniciais do state como vazio', () => {
        //console.log('valor state: ' + '"' + component.state("email") + '"' );
        expect(component.state('email')).toBe("");
        expect(component.state('senha')).toBe("");
        expect(component.state('erro')).toBe("");

    });

    test('deve renderizar ambos componentes inputs', () => {
        expect(component.find('input').length).toBe(2);

        expect(component.find('input[name="username"]').length).toBe(1);
        expect(component.find('input[name="password"]').length).toBe(1);
    });

    test('deve renderizar <p/> com mensagem de erro vazia', () => {
        expect(component.find('p[className="testJest"]').length).toBe(1);
        expect(component.find('p[className="testJest"]').text()).toBe('');
    });

    test('deve renderizar form  e button submit', () => {
        expect(component.find('form').length).toBe(1);
        expect(component.find('button').length).toBe(1);
    });

});

//TESTES DE COMPONENTES
describe('Inputs components [LOGINSCREEN]', () => {

    test('deve possuir dois labels não vazios', () => {
        expect(shallow(<Login />).find('label').length).toBe(2);

        expect(shallow(<Login />).find('label').at(0).text()).toBe('E-mail');
        expect(shallow(<Login />).find('label').at(1).text()).toBe('Senha');
    });

    describe('input type email', () => {
        let component;
        let inputEmail;

        //Executa a cada test do describe
        beforeEach(() => {
            component = shallow(<Login />);
            inputEmail = component.find('input').at(0);
        });

        test('deve conter props type e name pré setados', () => {
            expect(inputEmail.prop('type')).toBe('email');
            expect(inputEmail.prop('name')).toBe('username');
        });

        test('deve simular o onChange alterando o state', () => {
            expect(inputEmail.prop('value')).toBe('');

            const eventoFake = {
                target: {
                    value: 'testjest@gmail.com'
                }
            };

            //SIMULA ONCHANGE
            const onChangeNome = inputEmail.prop('onChange');
            onChangeNome(eventoFake);

            expect(component.state('email')).toBe('testjest@gmail.com');
            // expect(inputEmail.prop('value')).toBe('testjest@gmail.com');       
            // console.log(component.findWhere((node) => true).map(n => n.name()))
        });

    });

    describe('input type password', () => {
        let component;
        let inputPassword;

        beforeEach(() => {
            component = shallow(<Login />);
            inputPassword = component.find('input').at(1);
        });

        test('deve conter props type e name pré setados', () => {
            expect(inputPassword.prop('type')).toBe('password');
            expect(inputPassword.prop('name')).toBe('password');
        });

        test('deve simular o onChange alterando o state', () => {
            expect(inputPassword.prop('value')).toBe('');

            const eventoFake = {
                target: {
                    value: '123123'
                }
            };

            //SIMULA ONCHANGE
            const onChangeNome = inputPassword.prop('onChange');
            onChangeNome(eventoFake);

            expect(component.state('senha')).toBe('123123');
        });

    });

});

describe('Alterações forms [LOGINSCREEN]', () => {

    let component;
    let form;
    let history;

    beforeEach(() => {
        component = shallow(<Login history={history} />);
        form = component.find('form');
        history = { push: jest.fn() };
    });

    test('deve aparecer mensagem de erro por invalidez de login', () => {
        let errorMessage = component.find('p[className="testJest"]');

        const eventoFn = { preventDefault: () => { } }
        expect(errorMessage.text()).toBe("");

        jest.spyOn(eventoFn, 'preventDefault')
        form.simulate('submit', eventoFn);

        // console.log(component.state().erro)      
        expect(component.state().erro).toBe("Usuário ou senha inválidos");

    });

    //developing... Ao logar redirect p services (A FAZER QUANDO INTEGRAR REQUEST C UNIVERSUM)
    //redirecionar para ServicesScreen
    test('deve simular envio do formulário', () => {

        const eventoPrevDefault = { preventDefault: () => { } }
        const mockUser = {
            email: 'teste@teste.com',
            senha: '123'
        }

        component.setState({ email: mockUser.email, senha: mockUser.senha })
        expect(component.state('email')).toBeDefined();
        expect(component.state('email')).toBe(mockUser.email);
        expect(component.state('senha')).toBeDefined();
        expect(component.state('senha')).toBe(mockUser.senha);

        jest.spyOn(eventoPrevDefault, 'preventDefault')
        form.simulate('submit', eventoPrevDefault);

        //manipular prop. e ver se redireciona        
        // history.push('/Services');
        // expect(history.push).toHaveBeenLastCalledWith('/Services')
        
    })

});




