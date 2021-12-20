import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export interface IDateRange {
  start: NgbDateStruct;
  end: NgbDateStruct;
}

export interface ITimeRange {
  begin?: ITime;
  end?: ITime;
}

export interface ITime {
  hour: number;
  min: number;
}

/**
 * @description 選單項目
 * @param key 下拉選單項目主鍵
 * @param icon 主選單項目icon
 * @param i18n 選單項目文字內容
 * @param path 主選單項目路徑
 * @param roles 主選單項目所需權限
 */
export interface IMenuItem {
  key?: string;
  icon?: string;
  i18n?: string;
  path?: string;
  roles?: string[];
}

export interface IHyperlinkMenuItem {
  name: string;
  event?: (e: any) => void;
}

export interface ITab {
  id: number;
  nav?: string;
  hints?: number;
  active?: boolean;
}

export interface IEvent<T> {
  action: T;
  [key: string]: any;
}

