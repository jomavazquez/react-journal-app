import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';
import { Sidebar } from '../../../components/journal/Sidebar';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}));

jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn(),
}));

const initState = {
    auth: {
        uid: '1',
        name: 'Fernando'
    },
    ui: {
        loading: false,
        msgError: null
    },
    notes: {
        active: null,
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <Sidebar /> 
    </Provider>

)

describe('Pruebas en <Sidebar />', () => {

    test('1. Debe mostrarse correctamente', () => {
        // Snapshot
        expect( wrapper ).toMatchSnapshot();
    });

    test('2. Debe llamar el startLogout', () => {
        // debe de llamar la acción del logout
        wrapper.find('button').prop('onClick')();
        expect( startLogout ).toHaveBeenCalled();
    });
    
    test('3. Debe llamar el startNewNote', () => {
        // debe de llamar la acción startNewNote
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect( startNewNote ).toHaveBeenCalled();
    });    
    
});