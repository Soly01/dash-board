import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  register: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    image: new FormControl(''),
    draft: new FormGroup({
      title: new FormControl(''),
      comment: new FormControl(''),
    }),
  });
  passwordsMatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.register.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
    this.register.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }
  checkPasswords() {
    const password = this.register.get('password')?.value;
    const confirmPassword = this.register.get('confirmPassword')?.value;
    this.passwordsMatch = password === confirmPassword;

    if (this.passwordsMatch) {
      this.register.get('confirmPassword')?.setErrors(null);
    } else {
      this.register.get('confirmPassword')?.setErrors({ mismatch: true });
    }
  }
  registerSet() {
    if (this.register.valid) {
      const registerValues = this.register.value;

      const existingData = JSON.parse(localStorage.getItem('myData') || '[]');
      const isEmailAlreadyRegistered = existingData.some(
        (user: any) => user.email === registerValues.email
      );

      if (isEmailAlreadyRegistered) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail:
            'Email is already registered. Please choose a different email.',
        });
        return this.register.reset();
      }

      const draftData = this.register.get('draft')?.value;

      const newUser = {
        id: existingData.length + 1,
        ...registerValues,
        draft: [draftData],
      };

      newUser.image = this.register.get('image')?.value || '';

      const newData = [...existingData, newUser];

      console.log('New Data:', newData);

      localStorage.setItem('myData', JSON.stringify(newData));
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'You Have Registered Successfully',
      });

      this.router.navigate(['/login']);
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.register.get('image')?.setValue(reader.result);
      };

      reader.readAsDataURL(file);
    }
  }
}
