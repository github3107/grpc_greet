var PROTO_PATH = "helloworld.proto";

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  var serviceIP = process.env.SERVICE_IP || "localhost";
  console.log("process.env.SERVICE_IP=="+serviceIP);
  var client = new hello_proto.Greeter(process.env.SERVICE_IP+':50051',
                                       grpc.credentials.createInsecure());
  console.log("client connected to service at "+ serviceIP);
  var user;
  if (process.argv.length >= 3) {
    user = "RameshP";
  } else {
    user = 'world';
  }
  client.sayHello({name: user}, function(err, response) {
    console.log('Greeting:', response.message);
  });
}

main();