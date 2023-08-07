import { CONNECTION_STATUS } from "./ChatApp";

export type Message = {
  clientId: string;
  message: string;
  connectionStatus: (typeof CONNECTION_STATUS)[keyof typeof CONNECTION_STATUS];
};
