// import socketIOClient from "socket.io-client";
let endpoints = "http://localhost:3000";
// import { extendObservable } from 'mobx';
// import { inject, observer } from 'mobx-react';

// const socket = socketIOClient(this.state.endpoint);

self.addEventListener(
  "message",
  function(e) {
    self.postMessage(e.data);
  },
  false
);

 