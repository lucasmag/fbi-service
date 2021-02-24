const grpc = require("grpc")
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("Service.proto")
const grpcObject = grpc.loadPackageDefinition(packageDef)
const servicePackage = grpcObject.service;

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

function getDate(){
    let d = new Date()
    let datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    
    return datestring
}

function analyze(call, callback) {
    console.log(call.request)
    callback(null, {})
}