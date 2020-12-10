import '@testing-library/react';
import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';

describe('PRUEBAS EN ui-actions', ()=>{

    test('1. Todas las acciones deben funcionar', () => {

        const msgError = 'HELP!!!!!!';

        const action = setError( msgError );
        expect( action ).toEqual({
            type: types.uiSetError,
            payload: msgError
        });

        const removeErrorAction = removeError();
        expect( removeErrorAction ).toEqual({
            type: types.uiRemoveError
        });

        const startLoadingAction = startLoading();
        expect( startLoadingAction ).toEqual({
            type: types.uiStartLoading
        });

        const finishLoadingAction = finishLoading();
        expect( finishLoadingAction ).toEqual({
            type: types.uiFinishLoading
        });
        
    });    

});