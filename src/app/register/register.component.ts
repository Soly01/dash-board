import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  register!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.register = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  registerSet() {
    if (this.register.valid) {
      const registerValues = this.register.value;
      const existingData = JSON.parse(localStorage.getItem('myData') || '[]');

      const newData = [
        {
          id: existingData.length + 1,
          ...registerValues,
        },
        ...existingData,
      ];

      localStorage.setItem('myData', JSON.stringify(newData));
      this.router.navigate(['/login']);
    }
  }
}
