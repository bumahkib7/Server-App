import {DataState} from "../enum/data-state";

export interface AppState <T> {
  dataState: DataState;
  appData?: T;
  error?: string;


}
