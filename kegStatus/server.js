'use strict';



module.exports = function(db){

    var tap1 =  db.findOne({ tap:1 });
    var tap2 =  db.findOne({ tap:2 });
    var tap3 =  db.findOne({ tap:3 });

    var updateKegs = (kegs) => {
        
        tap1.current = kegs.keg1;
        tap2.current = kegs.keg2;
        tap3.current = kegs.keg3;


    }

    var server = require('http').createServer();
    var io = require('socket.io')(server);
    io.on('connection', function(client){
        client.on('wiiscale-connect', function(data){});
        client.on('wiiscale-weight', function(data){
            updateKegs(data);
        });
        client.on('wiiscale-status', function(data){
           // console.log(data);
        });
    });
    server.listen(3001);

};