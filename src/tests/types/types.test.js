import '@testing-library/jest-dom';
import { shallow } from 'enzyme';
import { types } from '../../types/types';

describe('PRUEBAS EN NUESTROS TIPOS', () =>{

    test('1. Debe tener estos tipos', () => {

        const objRes = {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogoutCleaning: '[Notes] Logout Cleaning',
        }

        expect( types ).toEqual( objRes );
        
    });    

});