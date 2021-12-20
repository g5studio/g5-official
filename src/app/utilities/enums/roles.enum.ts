/**
 * @description 系統角色
 */
export enum SystemRole {
  /**
   * @description MSA全系統管理員 - 可使用MSA模組
   */
  MSA = 'MySmartAdvisor',
  /**
   * @description Fa人員 - 可使用Esop與Esop company模組
   */
  Fa = 'ESOP Administrator',
  /**
   * @description Ro人員 - 可使用財富管理模組
   */
  Ro = 'Wealth Management Administrator'
}

/**
 * @description MSA模組功能角色
 */
export enum MsaFeatureRole {
  /**
   * @description 通知管理讀者 -可調閱消息通知內容
   */
  NotificationReader = 'Notification.Readable',
  /**
   * @description 通知管理作者 -可編輯、新增、修改通知內容及狀態
   */
  NotificationAuthor = 'Notification.Writable',
  /**
   * @description 通知管理監督者 -可調閱通知流程設置資訊
   */
  NotificationSupervisor = 'NotificationReviewalProcess.Readable',
  /**
   * @description 通知管理管理者 -可編輯、新增、修改通知內流程設置
   */
  NotificationAdmin = 'NotificationReviewalProcess.Writable'
}

/**
 * @description 財富管理模組功能角色
 */
export enum SecurityFeatureRole {
  /**
   * @description 外匯交易代理人 -可瀏覽代客下單紀錄
   */
  ForexAgent = 'ForexClientOrder.Readable',
  /**
   * @description 外匯交易代理執行者 -可執行代客下單功能
   */
  ForexAgentExecutor = 'ForexClientOrder.Writable',
  /**
   * @description 外匯交易公司財務 -可瀏覽公司內部換匯下單紀錄
   */
  ForexCompanyFinancial = 'ForexHouseOrder.Readable',
  /**
   * @description 外匯交易公司換匯執行者 -可執行公司內部換匯
   */
  ForexCompanyFinancialExecutor = 'ForexHouseOrder.Writable',
  /**
   * @description 外匯交易用戶端管理員 -可審核代客下單與自行下單訂單
   */
  ForexClientAdmin = 'ForexClientOrderReviewal.Writable',
  /**
   * @description 外匯交易財務管理員 -可審核公司內部換匯訂單
   */
  ForexFinancialAdmin = 'ForexHouseOrderReviewal.Writable',
  /**
   * @description 外匯交易紀錄管理員 -可匯出訂單紀錄報表
   */
  ForexReportAdmin = 'ForexOrderReport.Readable'
}
