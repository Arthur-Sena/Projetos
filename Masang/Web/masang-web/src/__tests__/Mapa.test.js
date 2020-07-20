
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';
import axios from 'axios';
import { Mapa } from '../pages/Mapa/Mapa';



//TESTES INSTÂNTANEOS
describe('Map componente/class [MAPSCREEN]', () => {

    let component;

    beforeEach(() => {
        component = shallow(<Mapa />);
    });

    test('deve injetar corretamente um elemento', () => {
        const componenteInput = renderer.create(<input />).toJSON();
        expect(componenteInput).toMatchSnapshot();
    });

    test('deve realizar um snapshot com sucesso', () => {
        expect(component).toMatchSnapshot();
    })

    test('deve executar a class e ciclos de vida sem crashar', () => {
        const classMap = mount(<Mapa />);
        expect(classMap).toMatchSnapshot();
    });

    test('deve iniciar o state do componente corretamente', () => {
        expect(component.state('hemocentros')).toStrictEqual([]);
        expect(component.state('listaHemocentros')).toStrictEqual([]);
        expect(component.state('longitude')).toBe('-46.6960216');
        expect(component.state('latitude')).toBe('-22.4549645');
        expect(component.state('buscar')).toBe("");
    });

});


//TESTES DE COMPONENTES
describe('Google Map Component', () => {
    
    let component;

    beforeEach(() => {
        component = shallow(<Mapa />);
    });
    
    test('deve renderizar o mapa corretamente com suas props definidas', () => {
        const mapComponent = component.find('Map').first();
        expect(mapComponent).toBeTruthy();
        
        const mockMap = {
            google: component.prop('google'),
            zoom: 8,
            initialCenter: {
                lat: component.state('latitude'),
                lng: component.state('longitude')
            }
        }
        
        expect(mapComponent.length).toBe(1);
        expect(mapComponent.props().zoom).toBe(mockMap.zoom);
        expect(mapComponent.prop('initialCenter')).toStrictEqual(mockMap.initialCenter);
        expect(mapComponent.prop('google')).toBe(mockMap.google);
       
        const marker = component.find('Marker').first();
        expect(marker.length).toBe(0)
    });

    // test('deve retornar uma resposta não nula da requisição', () => {

    // });
    
    // test('deve renderizar os marcadores do mapa com props pré definidas', () => {
    //     const mockMarker = {
    //         position: {},
    //         title: 's',
    //         icon: 'a'
    //     }
        
    //     expect(marker.length).toBe(1);


    // });

})


// describe('Barra de busca hemocentro', () => {
    
//     test('deve retornar uma lista de hemocentros a cada onchange do inpur', () => {

//     });
    
//     test('deve criar uma div (infoHemocentro) para cada item do retorno da requisição', () => {

//     });

//     test('deve redirecionar para a página do hemocentro ao clicar num hemocentro', () => {

//     });

// })

