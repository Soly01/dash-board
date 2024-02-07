import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class SettingsComponent implements OnInit {
  value: any;
  check: boolean = false;
  checkk: boolean = false;
  checkkk: boolean = false;
  checkkkk: boolean = false;
  checkkkkk: boolean = false;
  checkkkkkk: boolean = false;
  checked: boolean = false;
  ischecked: boolean = false;
  user: any;

  updateName: FormGroup = this.fb.group(
    {
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.passwordMatchValidator }
  );
  valueeee!: string;
  password!: string;
  confirmPassword!: string;
  visible: boolean = false;
  isButtonDisabled: boolean = true;
  formGroup!: FormGroup;
  categories: any[] = [
    { name: 'Daily', key: 'A' },
    { name: 'Weekly', key: 'M' },
    { name: 'Monthly', key: 'P' },
  ];
  constructor(
    private messageService: MessageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      selectedCategory: new FormControl(),
    });
  }

  changed() {
    const myData = JSON.parse(localStorage.getItem('myData') || '[]');
    const loggedUsername = localStorage.getItem('loggedUsername');
    if (loggedUsername) {
      const userIndex = myData.findIndex(
        (u: any) => u.username === loggedUsername
      );
      if (userIndex !== -1) {
        const newUsername = this.updateName.get('username')?.value;
        const newEmail = this.updateName.get('email')?.value;

        const emailAlreadyExists = myData.some(
          (user: any) => user.email === newEmail
        );

        if (!emailAlreadyExists && newUsername && newEmail) {
          myData[userIndex].username = newUsername;
          myData[userIndex].email = newEmail;
          localStorage.setItem('myData', JSON.stringify(myData));
          localStorage.setItem('loggedUsername', myData[userIndex].username);
          this.updateName.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'You Have Changed Your Info Successfully',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail:
              'Email is already registered in another account or invalid input.',
          });
          this.updateName.reset();
        }
      }
    }
  }

  showDialog() {
    this.visible = true;
  }

  confirm() {
    this.confirmationService.confirm({
      header: 'Are you sure?',
      message: 'Please confirm to proceed.',
      accept: () => {
        const password = this.updateName.get('password')?.value;
        const confirmPassword = this.updateName.get('confirmPassword')?.value;

        if (password === confirmPassword) {
          const myData = JSON.parse(localStorage.getItem('myData') || '[]');
          const loggedUsername = localStorage.getItem('loggedUsername');
          if (loggedUsername) {
            const userIndex = myData.findIndex(
              (u: any) => u.username === loggedUsername
            );

            if (userIndex !== -1) {
              myData[userIndex].password = password;
              myData[userIndex].confirmPassword = confirmPassword;

              localStorage.setItem('myData', JSON.stringify(myData));
              this.updateName.reset();

              localStorage.removeItem('loggedUsername');
              localStorage.removeItem('isLogged');
              setTimeout(() => {
                this.router.navigate(['/login']);
              }, 1000);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail:
                  'You Have Changed Your Password Successfully You will be Logged Out ',
              });
            }
          }
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'You Have Canceld Changing Your Password',
        });
      },
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password: any = form.get('password');
    const confirmPassword: any = form.get('confirmPassword');
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }
}
