/**
 * Created by Varad on 10/4/2017.
 */
var request = require('request');

exports.createConsumer = function (userObj, callback) {
    request.post(
        'http://localhost:8001/consumers/',
        { json: { username: userObj.user, custom_id: uuidv4(userObj.user) } },
        function (error, response, body) {
            // console.log(response);
            if (!error) {
                console.log('Consumer Created');
                callback(body)
            }else {
                // console.log(response);
            }
        }
    );
}

exports.createAppForConsumer = function (userObj, callback) {

    request.post(
        'http://localhost:8001/consumers/'+userObj.user+'/oauth2',
        { json: { name: userObj.appName, client_id: uuidv4('rw-reports'), client_secret: uuidv4('rw-reports'),
                  redirect_uri: 'http://apidoc.rwlabs.org/v'
                }
        },
        function (error, response, body) {
            if (!error) {
                console.log('App Created');
                callback(body)
            }else {
                // console.log(response);
            }
        }
    );
}

exports.getToken = function (userObj, callback) {

    var url = 'https://localhost:8443/oauth2/token';
    var headers = {
        'Host': 'rw-reports',
        'Authorization': 'Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW'

    };
    var form = {
        name: userObj.appName, client_id: userObj.client_id, client_secret: userObj.client_secret,
        grant_type: 'password', scope: 'email', provision_key: 'i0t9sZyalwCZkbcNAbTeHqKGDho6FZeu',
        authenticated_userid: userObj.user
    };

    request.post({ url: url, json: form, headers: headers, strictSSL: false }, function (error, response, body) {
        if (!error) {
            console.log('Token Created');
            console.log(body);
            callback(body)
        }else {
             console.log(error);
        }
    });
    //
    // request.post(
    //     'http://localhost:8000/oauth2/token',
    //     { json: {
    //                 name: userObj.appName, client_id: userObj.client_id, client_secret: userObj.client_secret,
    //                 grant_type: 'grant_type', scope: 'email', provision_key: 'i0t9sZyalwCZkbcNAbTeHqKGDho6FZeu',
    //                 authenticated_userid: userObj.user
    //             }
    //     },
    //     function (error, response, body) {
    //         if (!error) {
    //             console.log('App Created');
    //             callback(body)
    //         }else {
    //             // console.log(response);
    //         }
    //     }
    // );
}





function uuidv4(key) {
    return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx-'+key).replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

