import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { types } from '../../types/types';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { startLoadingNotes } from '../../actions/notes';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);

const initState = {}
let store = mockStore( initState );

describe('PRUEBAS CON LAS ACCIONES DE auth', () => {

    beforeEach( () => {
        store = mockStore( initState );
    });    

    test('1. Login y logout debe crear las acciones respectivas.', () => {

        const uid = 'ABC123';
        const displayName = 'Fernando';

        const loginAction = login( uid, displayName );
        expect( loginAction ).toEqual({
            type: types.login,
            payload: {
                uid,
                displayName
            }
        });

        const logoutAction = logout();
        expect( logoutAction ).toEqual({
            type: types.logout
        });

    });    

    test('2. Debe realizar el logout.', async() => {

        await store.dispatch( startLogout() );

        const actions = store.getActions();
        expect( actions[0] ).toEqual({
            type: types.logout
        });
        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });
        
    });    

    test('3. Debe iniciar el startLoginEmailPassword', async() => {
        await store.dispatch( startLoginEmailPassword('test@testing.com', '123456') );

        /*
        const actions = store.getActions();
        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: '9hkNu88FKEZ0aRq1upz74RHKQ1P2', //sacado de firebase
                displayName: null
            }
        });
        */
        
    });    

});