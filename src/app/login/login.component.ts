import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

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
        this.router.navigate(['/home']);
      } else {
        alert('Invalid Username Or Password');
      }
    }
  }
  registerRoute() {
    this.router.navigate(['/register']);
  }
}
