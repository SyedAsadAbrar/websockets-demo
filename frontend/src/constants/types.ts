import { CONNECTION_STATUS } from "./ChatApp";

export type ConnectionStatus =
  (typeof CONNECTION_STATUS)[keyof typeof CONNECTION_STATUS];

export type Message = {
  clientId: string;
  message: string | null;
  connectionStatus: ConnectionStatus;
};
