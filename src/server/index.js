const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("Service.proto")
const grpcObject = grpc.loadPackageDefinition(packageDef)
const servicePackage = grpcObject.service;
var amqp = require('amqplib/callback_api');
import { BrowserWindow } from 'electron' // ES6

const MEDIATOR_QUEUE = 'mediatorQueue';
const SUS_REPORTS_TOPIC = 'suspectReports';
const window = BrowserWindow.getFocusedWindow().webContents

amqp.connect('amqp://localhost', function(error0, connection) {

    if (error0) {
        console.log("Erro ao conectar :(");
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            console.log('rapaaaaaz')
        }

        channel.assertExchange(SUS_REPORTS_TOPIC, 'direct', {
            durable: false
        });

        channel.assertQueue(MEDIATOR_QUEUE, {
            durable: false,
        })

        channel.bindQueue(MEDIATOR_QUEUE, SUS_REPORTS_TOPIC, '');

        channel.consume(MEDIATOR_QUEUE, function(msg) {
            try {
                let data = JSON.parse(msg.content.toString())
                window.send('newMessageIntercepted', data)
            } catch (e) {
                console.log(e)
            }
        }, {
            noAck: true
        });
    });

})

export function createServer(serverAddress) {
    if (serverAddress) {

        const server = new grpc.Server();
        server.bind(serverAddress, grpc.ServerCredentials.createInsecure())
        server.addService(servicePackage.Service.service,
            {
                "analyze": analyze,
            });
    
        server.start()
        console.log("gRPC server started!")
    }
}

function analyze(call, callback) {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            channel.assertExchange(SUS_REPORTS_TOPIC, 'direct', {
                durable: false
            });
            console.log(call.request)
            channel.publish(SUS_REPORTS_TOPIC, '', Buffer.from(JSON.stringify(call.request)));

        });

        setTimeout(function() {
            connection.close();
        }, 500);
    });


    callback(null, {})
}