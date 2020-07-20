import React from 'react';
import Services from '../pages/Services/Services';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';


//TESTES INSTÂNTANEOS
describe('Services component [SERVICESSCREEN]', () => {

    let component;

    beforeEach(() => {
        component = shallow(<Services />);
    });

    test('deve injetar corretamente um elemento', () => {
        const componenteInput = renderer.create(<input />).toJSON();
        expect(componenteInput).toMatchSnapshot();
    });

    test('deve executar a class e ciclos de vida sem crashar', () => {
        const classServices = mount(<Services />);
        expect(classServices).toMatchSnapshot();
    })

    test('deve executar o componente pai sem crashar', () => {
        expect(component).toMatchSnapshot();
    })

    test('deve renderizar 4 cards com serviços linkados', () => {
        expect(component.find('div[className="card"]').length).toBe(4);
        expect(component.find('a').at(0).prop('href')).toBeDefined();
        expect(component.find('a').at(1).prop('href')).toBeDefined();

        //developing feature by arthur 
        // expect(component.find('a').at(2).prop('href')).toBeDefined();
        // expect(component.find('a').at(3).prop('href')).toBeDefined();
    });

});


//TESTES DE COMPONENTES
// describe.skip('Redirecionamento de Serviços [SERVICESSCREEN]', () => {
//     let componente;

//     beforeEach(() => {
//         componente = shallow(<Services />);
//     });

//     // test('deve encaminhar para busca de hemocentros', async () => {

//     //     const hemolinkText = componente.find('a').at(0);
//     //     const hemocentrolink = componente.find('miniCard').at(0).children().first();

//     //     expect(hemolinkText.html()).toBe('<a href=\"/Mapa\" style=\"text-decoration:none\">a <h4>Buscar Hemocentro</h4></a>');
//     //     hemolinkText.simulate('click');        

//     //     componente.update();
//     //     expect(window.location).toBe('/Mapa');

//     // });


// });