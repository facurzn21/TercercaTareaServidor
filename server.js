const debug  = require('debug')('node-react');
const http = require('http');
const app = require('./app');

const normalizePort = val => { // se fija que el puerto que se llama sea un numero > 0 y sea valido
    var port = parseInt(val,10);
  
    if(isNaN(port)){
      console.log(port);

      return val;
    }
    if(port >= 0){
      console.log(port);
      return port;
    }
  
    return false;
  };
  
  const onError = error => { // Se muestran errores
    if(error.syscall !== "listen"){
      throw error;
    }
    const bind = typeof addr === "string" ? "pipe" + addr : "port" + port;
    switch(error.code){
      case "EACCES":
        console.error(bind + " requires elevated privileges"); // Requiere permiso de admin
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use"); // El puerto ya esta en uso
        process.exit();
        break;
      default:
          throw error;
    }
  }
  
  const onListening = () => { // se escuha constantemente al puerto
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr: "port " + port;
    console.log('onlistenting',port); // Escuchando a 

    debug("Listening on " + bind);  // Escuchando a 
  }
  
  const port = normalizePort(process.env.PORT || "3000"); 
  app.set("port", port);
  

  // se crea servidor http en localhost:3000
  const server = http.createServer(app);
  server.on("error", onError);
  server.on("listening", onListening);
  server.listen(port);