var APP_ID = '8B647F77-8C3E-D352-FF3E-924B06CD8800';
var API_KEY = '0B2EDDB0-5FD2-1730-FFB3-F5A006427700';

Backendless.serverURL = 'https://api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);

Backendless.Data.of( "TestTable" ).save( { foo:"bar" } )
    .then( function( obj ) {
        console.log( "object saved. objectId " + obj.objectId )
    } )
    .catch( function( error ) {
        console.log( "got error - " + error )
    })
                  