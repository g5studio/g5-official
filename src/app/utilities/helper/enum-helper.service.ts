import { Injectable } from '@angular/core';
import {
  EDevice,
  EDomain,
  EEditableFieldType,
  EEncodeType,
  EModalType,
  ESize,
  EStatus,
  EAction,
  EModule
} from '@utilities/enums/common.enum';

@Injectable({
  providedIn: 'root'
})
export class EnumHelperService {

  constructor() { }

  get size(): typeof ESize { return ESize; }
  get device(): typeof EDevice { return EDevice; }
  get encodeType(): typeof EEncodeType { return EEncodeType; }
  get modalType(): typeof EModalType { return EModalType; }
  get status(): typeof EStatus { return EStatus; }
  get domain(): typeof EDomain { return EDomain; }
  get editableFieldType(): typeof EEditableFieldType { return EEditableFieldType; }
  get action(): typeof EAction { return EAction; }
  get module(): typeof EModule { return EModule; }

}
