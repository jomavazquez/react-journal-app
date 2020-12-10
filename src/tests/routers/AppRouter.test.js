import React from 'react';
import '@testing-library/jest-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import { firebase } from '../../firebase/firebase-config';
import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../actions/auth', () => ({
    login: jest.fn(),
}));

const initState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: {
            id: 'ABC',
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {

    test('1. Debe llamar el login si estoy autenticado', async() => {
        
        let user;

        await act( async () => {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;

            const wrapper = mount( 
                <Provider store={ store }>
                    <MemoryRouter>
                        <AppRouter /> 
                    </MemoryRouter>
                </Provider>
    
            )

        });
        expect( login ).toHaveBeenCalledWith('9hkNu88FKEZ0aRq1upz74RHKQ1P2', null);
    });
    
});