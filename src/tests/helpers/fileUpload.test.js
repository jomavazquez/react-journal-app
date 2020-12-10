import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'jomavazquez', 
    api_key: '735937941769975', 
    api_secret: 'R8Qs0_GnzSH-pah9QF5uLWiATX0' 
  });

describe('PRUEBAS EN fileUpload', () => {

    /*
    test('1. Debe cargar un archivo y retornar la URL', async(done) => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
        const blob = await resp.blob();

        const file = new File( [blob], 'foto.png' );
        const url = await fileUpload( file );

        expect( typeof url ).toBe('string');

        // Borrar imagen por ID
        const segment = url.split('/');
        const imagId = segment[ segment.length -1 ].replace('.png', '');

        cloudinary.v2.api.delete_resources( imagId, {}, ()=>{
            done(); 
        });
        
    });    
    */

    test('2. Debe devolver un error', async() => {

        /*
        const file = new File( [], 'foto.jpg' );
        const url = await fileUpload( file );

        expect( url ).toBe( null );
        */
        
    });        

});