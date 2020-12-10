import '@testing-library/react';
import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('PRUEBAS EN authReducer', () =>{

    test('1. Debe realizar el login', () => {
        
        const initState = {}

        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Fernando'
            }
        }

        const state = authReducer( initState, action );
        
        expect( state ).toEqual({ uid: 'abc', name: 'Fernando' });        
    });

    test('2. Debe realizar el logout', () => {
        
        const initState = {
            uid: 'sdsdsdsdsdsds',
            name: 'Fernando'
        }

        const action = {
            type: types.logout
        }

        const state = authReducer( initState, action );
        
        expect( state ).toEqual( {} );
    });    

    test('3. No debe realizar cambios en el state', () => {
        
        const initState = {
            uid: 'sdsdsdsdsdsds',
            name: 'Fernando'
        }

        const action = {
            type: 'cualquier acción desconocida'
        }

        const state = authReducer( initState, action );
        
        expect( state ).toEqual( initState );
    });        

});