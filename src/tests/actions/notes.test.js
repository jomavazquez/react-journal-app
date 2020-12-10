import '@testing-library/react';
import { deleteNote, startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';
import { types } from '../../types/types';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: 'TESTING_UID'
    },
    notes: {
        active: {
            id: 'LD3hJEbxUCRzCAAi2CcW',
            title: 'Hola',
            body: 'Mundo'
        }
    }
}
let store = mockStore( initState );

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://www.holamundo.com/cosa.jpg';
    })
}));

describe('PRUEBS CON LAS ACCIONES DE NOTES', () => {

    beforeEach( () => {
        store = mockStore( initState );
    });

    test('1. Debe crear una nueva nota startNewNote', async() => {

        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });

        expect( actions[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
            }
        });        

        // Borramos la basura
        const docId = actions[0].payload.id;
        await db.doc(`/TESTING_UID/journal/notes/${ docId }`).delete();
        
    });    

    test('2. startLoadingNotes debe cargar las notas', async() => {

        /*
        await store.dispatch( startLoadingNotes('TESTING_UID') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect( action[0].payload[0] ).toMatchObject( expected );
        */
        
    });    

    test('3. startSaveNote debe actualizar la nota', async() => {

        const note = {
            id: 'LD3hJEbxUCRzCAAi2CcW',
            title: 'TITULO',
            body: 'BODY'
        }

        await store.dispatch( startSaveNote(note) );

        const actions = store.getActions();
        expect( actions[0].type ).toBe( types.notesUpdated );        

        //const docRef = await db.doc(`/TESTING_UID/journal/notes/${ note.id }`).get();
        //expect( docRef.data().title ).toBe( note.title );
        
    });
    
    test('4. startUploading debe actualizar la url del entry', async() => {

        const file = new File([], 'foto.jpg');
        await store.dispatch( startUploading(file) );

        /*
        const docRef = await db.doc(`/TESTING_UID/journal/notes/LD3hJEbxUCRzCAAi2CcW`).get();
        expect( docRef.data().url ).toBe('https://www.holamundo.com/cosa.jpg');
        */
        
    });    

});