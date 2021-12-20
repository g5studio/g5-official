import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


export interface IRouteConfig {
  path: string;
  component: any;
  permissions?: string[];
}

export interface IEvent<T> {
  action: T;
  [key: string]: any;
}

