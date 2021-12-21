import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';


/**
 * @description 路由設置
 */
export interface IRouteConfig {
  path: string;
  component: any;
  permissions?: string[];
}

/**
 * @description 功能事件
 */
export interface IEvent<T> {
  action: T;
  [key: string]: any;
}

export interface IOffset<T> {
  horizon?: T;
  vertical?: T;
}

export interface IPosition<T> {
  top?: T;
  right?: T;
  bottom?: T;
  left?: T;
}

