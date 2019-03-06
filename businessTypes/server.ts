import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import SocketIO from 'socket.io';
import * as socket from '../sockets/socket';

export default class Server {
  private static _instance : Server;
  public app : express.Application;
  public port: number;
  public io : SocketIO.Server;
  private httpServer :  http.Server;

  private constructor () {
      this.app = express();
      this.port = SERVER_PORT;
      this.httpServer = new http.Server(this.app);
      this.io = SocketIO(this.httpServer);

      this.listenSockets();
  }

  start(callback : Function) {
     this.httpServer.listen(this.port, callback);
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private listenSockets() {
     console.log("Escuchando conexiones - sockets");
     this.io.on("connection", cliente => {
        console.log("Nuevo cliente conectado");

        socket.mensaje(cliente, this.io);
        socket.desconectar(cliente);
     });
  }
}