export enum EIndependentPage {
  LoginCallback = 1,
  PageNotFound
}

/**
 * @description ESOP公司模組 - 帳戶管理
 */
export enum ECashAccountPage {
  Statement = 'statement',
  // TaxCalculation = 'tax-calculation',
}

/**
 * @description ESOP模組 - 員工月結單
 */
export enum ETradingManagementPage {
  WithholdingRefund = 'withholding-stock-refund',
}

/**
 * @description MSA通用模組
 */
export enum EMSAPage {
  Notification = 'notification'
}

/**
 * @description 財富管理模組 - 外匯交易
 */
export enum EForexPage {
  Client = 'transaction-client',
  House = 'transaction-house',
  History = 'histrory'
}
