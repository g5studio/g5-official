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
