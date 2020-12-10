import '@testing-library/jest-dom';
import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hola',
    body: 'Mundo',
    url: 'https://algunlugar.com/foto.jpg'
};

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...note }  /> 
    </Provider>
)

describe('PRUEBAS EN <JournalEntry />', () => {

    test('1. Debe mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('2. Debe activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith(
            activeNote( note.id, { ...note } )
        );
    });
    
});