import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginPost() {
    if (this.login.valid) {
      const enteredUsername = this.login.get('username')?.value;
      const enteredPassword = this.login.get('password')?.value;

      const userData = JSON.parse(localStorage.getItem('myData') || '[]');

      const user = userData.find(
        (u: any) =>
          u.username === enteredUsername && u.password === enteredPassword
      );

      if (user) {
        localStorage.setItem('isLogged', 'true');

        // Store the logged-in user's unique identifier in localStorage
        localStorage.setItem('loggedUsername', enteredUsername);

        this.router.navigate(['/home']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Logged In Successfully',
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid Username Or Password',
        });
      }
    }
  }

  registerRoute() {
    this.router.navigate(['/register']);
  }
}
