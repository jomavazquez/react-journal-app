import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux'
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn(),
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
        active: {
            id: 1234,
            title: 'Hola',
            body: 'mundo',
            date: 0
        },
        notes: []
    }
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>

)

describe('Pruebas en <NoteScreen />', () => {

    test('1. Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('2. Debe disparar el active note', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo'
            }
        });
        expect( activeNote ).toHaveBeenLastCalledWith(
            1234,
            {
                id: 1234,
                title: 'Hola de nuevo',
                body: 'mundo',
                date: 0
            }
        );
    });
    
});