import { MsaFeatureRole, SecurityFeatureRole } from '@utilities/enums/roles.enum';
import {
  ECashAccountPage,
  EForexPage,
  EIndependentPage,
  EMSAPage,
  ETradingManagementPage
} from '@utilities/enums/route.enum';
import { IMenuItem } from '@utilities/interfaces/common.interface';

/**
 * @description MSA全站管理功能
 */
export const MSAPageMap = new Map<EMSAPage, IMenuItem>([
  [EMSAPage.Notification, {
    icon: 'alert',
    i18n: 'Menu.Msa.NotificationManagement',
    path: 'msa/notification',
    roles: [
      MsaFeatureRole.NotificationReader,
      MsaFeatureRole.NotificationAuthor,
      MsaFeatureRole.NotificationSupervisor,
      MsaFeatureRole.NotificationAdmin,
    ]
  }]
]);

/**
 * @description 財富管理-Forex
 */
export const ForexPageMap = new Map<EForexPage, IMenuItem>([
  [EForexPage.Client, {
    icon: 'taxPayment_bold',
    i18n: 'Menu.Security.ForexClientTranscation',
    path: 'security/forex/transcation-client',
    roles: [SecurityFeatureRole.ForexAgentExecutor]
  }],
  [EForexPage.House, {
    icon: 'comapnyaccount',
    i18n: 'Menu.Security.ForexHouseTranscation',
    path: 'security/forex/transcation-house',
    roles: [SecurityFeatureRole.ForexCompanyFinancialExecutor]
  }],
  [EForexPage.History, {
    icon: 'file1',
    i18n: 'Menu.Security.History',
    path: 'security/forex/history',
    roles: [
      SecurityFeatureRole.ForexAgent,
      SecurityFeatureRole.ForexCompanyFinancial,
      SecurityFeatureRole.ForexClientAdmin,
      SecurityFeatureRole.ForexFinancialAdmin,
    ]
  }]
]);

/**
 * @description Esop-帳戶管理
 */
export const CashAccountPageMap = new Map<ECashAccountPage, IMenuItem>([
  [ECashAccountPage.Statement, {
    icon: 'record',
    i18n: 'Menu.Esop.Statement',
    path: 'esop/cash-account/statement',
    roles: []
  }]
])

/**
 * @description Esop-交易管理
 */
export const TradingManagementPageMap = new Map<ETradingManagementPage, IMenuItem>([
  [ETradingManagementPage.WithholdingRefund, {
    icon: 'exchange',
    i18n: 'Menu.Esop.WithholdingStockRefund',
    path: 'esop-company/trading-management/withholding-stock-refund',
    roles: []
  }],
])

/**
 * @description 主架構外的獨立頁面
 */
export const IndependentPageMap = new Map([
  [EIndependentPage.LoginCallback, 'login-callback'],
  [EIndependentPage.PageNotFound, '404']
]);
