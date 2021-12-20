export enum ESize {
  XXS = 'xxs',
  XS = 'xs',
  Small = 'sm',
  Middle = 'md',
  Large = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

export enum EDevice {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile'
}

export enum EEncodeType {
  Email = 1,
  Mobile,
  Phone
}

export enum EDatePickerNavigation {
  Normal = 'arrow',
  Select = 'select'
}

export enum EModalType {
  Alert = 'alert',
  Action = 'normal',
  Notification = 'info'
}

export enum EStatus {
  Active = 'active',
  Closed = 'closed',
  Canceled = 'canceled',
  Wait = 'wait'
}

/**
 * @description query domain
 */
export enum EDomain {
  SSO = 'sso',
  Files = 'fileAssetsUrl',
  Backend = 'esopBackendApiUrl',
  UserAdmin = 'userAdminApiUrl',
  ForexAdmin = 'forexAdminApiUrl',
  CashAdmin = 'cashAdminApiUrl',
  AccountAdmin = 'accountAdminApiUrl'
}

export enum EEditableFieldType {
  General = 1,
  Phone,
  Date
}

export enum EAction {
  Add = 1,
  Modify,
  Delete,
  Cancel,
  Save,
  Clear,
  Apply,
  Preview,
  Submit
}

/**
 * @description system module
 */
export enum EModule {
  MSA = 1,
  Esop,
  Esop_Company,
  Security,
  OAO
}

/**
 * @description error message module
 */
export enum ErrorModule {
  MSA = 'Msa',
  Esop = 'Esop',
  User = 'User',
  Security = 'Security'
}
