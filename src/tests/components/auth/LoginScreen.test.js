import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
    startGoogleLogin: jest.fn(),
    startLoginEmailPassword: jest.fn(),
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <MemoryRouter>
            <LoginScreen /> 
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en <LoginScreen />', () => {

    beforeEach(()=> {
        store = mockStore(initState);
        jest.clearAllMocks();
    });

    test('1. Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('2. Debe disparar la acción de startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalled();
    })
    
    test('3. Debe disparar el startLogin con los respectivos argumentos', () => {
        wrapper.find('form').prop('onSubmit')({ 
            preventDefault(){}
        });
        expect( startLoginEmailPassword ).toHaveBeenLastCalledWith('', '');
    });
    
});