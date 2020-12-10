import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <RegisterScreen /> 
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en <RegisterScreen />', () => {

    test('1. Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('2. Debe hacer el dispatch de la acción respectiva', () => {

        const emailField = wrapper.find('input[name="email"]');

        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email'
            }
        });
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.uiSetError,
            payload: 'Email is not valid'
        });
        
    });
    
    test('3. Debe mostrar la caja de alerta con el error', () => {

        const initState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Email no es correcto'
            }
        };
        
        const store = mockStore(initState);        
        
        const wrapper = mount( 
            <Provider store={ store }>
                <MemoryRouter>
                    <RegisterScreen /> 
                </MemoryRouter>
            </Provider>
        );
        
        expect( wrapper.find('.auth__alert-error').exists() ).toBe( true );
        expect( wrapper.find('.auth__alert-error').text().trim() ).toBe( initState.ui.msgError );
    });
    
});