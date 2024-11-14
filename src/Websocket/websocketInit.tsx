import {
  RequestWebsocket,
  ResponseWebsocket,
} from "../interfaces/wsInterfaces";
import { WebsocketState } from "../enums/wsEnums";
import { generateRequestId } from "../utils/generateRequestId";
import { setWebSocket } from "../app/features/webSocketSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {store} from "../app/store";
import {API_URL} from "../config";

export const openWebSocket = createAsyncThunk(
  "webSocket/openWebSocket",
  async (_, { dispatch }) => {
    try {
      const webSocket = new WebSocket('wss://'+API_URL);
      await new Promise<void>((resolve, reject) => {
        webSocket.onopen = () => {
          //console.log("WebSocket connection opened");
          dispatch(setWebSocket(webSocket));
          resolve();
        };

        webSocket.onerror = (error) => {
          console.log("WebSocket connection error");
          reject(error);
        };
      });
    } catch (e) {
      console.log((e as Error).message);
    }
  }
);
export const sendRequestAndGetResponse = async (request: RequestWebsocket) => {
  try {
    //@ts-ignore
    const webSocket: WebSocket = store.getState().webSocket.webSocket;
    if (!webSocket?.readyState) {
      console.error('WEBSOCKET ERROr, not open');
    }
    console.log('WEBSOCKET', webSocket);

    //console.log('WEBSOCKET->', webSocket);
    if (webSocket.readyState !== WebsocketState.open) {
      return;
    }

    let parsedMSG: ResponseWebsocket;

    const response = await new Promise<ResponseWebsocket>((resolve, reject) => {
      const messageHandler = (event: any) => {
        try {
          parsedMSG = JSON.parse(event.data) as ResponseWebsocket;
          console.log("Response", parsedMSG);
          if (request.id === parsedMSG.result.request.id) {
            if (parsedMSG.result.response.type === "Left") {
              reject(new Error(parsedMSG.result.response.value));
            } else {
              //console.log("AT RESOLVED");
              webSocket.removeEventListener("message", messageHandler);
              resolve(parsedMSG);
            }
            // webSocket.close();
            //}
          }
        } catch (error) {
          reject(error);
        }
      };

      //console.log("AFTER ");
      webSocket.addEventListener("message", messageHandler);
      webSocket.send(JSON.stringify(request));

      const cleanup = () => {
        // console.log("AT REMOVE LISTENER");
        webSocket.removeEventListener("message", messageHandler);
      };

      return cleanup;
    });
    return response.result.response;
  } catch (error) {
    console.error("ERROR at sendRequestAndGetResponse:", error);
    throw error; // Перебросить ошибку для обработки на уровне вызова
  }
};

export const wsListener = async (webSocket: WebSocket) => {
  try {
    console.log("HEEREEE LISTEN", webSocket);
    webSocket.onmessage = (msg) => {
      console.log("RECIEVED MSG", msg);
    };
  } catch (e) {
    console.log("ERROR", e);
  }
};
