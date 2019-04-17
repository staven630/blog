* patterns.ts: 定义正则表达式
```
// 为空
export const IS_EMPTY = /^\s*$/;

// 手机号码
export const IS_MOBILE = /^$|^1[3456789]\d{9}$/;
```

* validators.ts：自定义验证器
```
import {AbstractControl, ValidatorFn} from '@angular/forms';
import {IS_EMPTY} from './utils';

/**
 * 默认0不通过，isZero为true,0可以通过验证
 * @param isZero: 0是否能通过验证
 */
export const required = (isZero: boolean = false): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (isZero && /^[0]*$/.test(val)) { return {customRequired: true}; }
    if (IS_EMPTY.test(val) || typeof val === 'undefined') { return {customRequired: true}; }
    return null;
  };
};

/**
 *
 * @param reg 正则表达式
 * @param isEmpty 是否允许为空，默认不能，true能为空
 */
export const pattern = (reg: RegExp, isEmpty: boolean = false): ValidatorFn => {
  return (control: AbstractControl): {[key: string]: any} => {
    const val = control.value;
    if (IS_EMPTY.test(val) && !isEmpty) { return {customRequired: true}; }
    if (!reg.test(val)) { return {customPattern: true}; }
    return null;
  };
};
```

* profile-editor.component.ts
```
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {pattern} from '../core/validators';
import {IS_MOBILE} from '../core/utils';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.scss']
})
export class ProfileEditorComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;  // 是否提交过

  validateMsgs = {
    phone: [
      { type: 'customRequired', error: '手机号码不能为空' },
      { type: 'customPattern', error: '手机号码格式不正确' }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      phone: ['', pattern(IS_MOBILE)]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.formGroup.valid) {
      console.log('验证通过');
    }
  }

}
```

* profile-editor.component.html
```
<form [formGroup]="formGroup" (ngSubmit)="onSubmit()">
  <label>
    手机号码:
    <input type="text" formControlName="phone" placeholder="请输入手机号码" />
    <ng-container *ngFor="let item of validateMsgs.phone">
      <span *ngIf="formGroup.hasError(item.type, ['phone']) && (formGroup.get('phone').dirty || submitted)">{{item.error}}</span>
    </ng-container>
  </label>
  <button type="submit" [disabled]="!formGroup.valid">Submit</button>
</form>
```