import { Component, ViewEncapsulation } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  checked: boolean = false;
  checkedd: boolean = false;
  checkeddd: boolean = false;
  checkedddd: boolean = false;
  user: any;
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    const isLogged = localStorage.getItem('isLogged');

    if (isLogged) {
      const loggedUsername = localStorage.getItem('loggedUsername');

      if (loggedUsername) {
        const myData = JSON.parse(localStorage.getItem('myData') || '[]');
        this.user = myData.find((u: any) => u.username === loggedUsername);
      }
    }
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.user.image = reader.result;
        const myData = JSON.parse(localStorage.getItem('myData') || '[]');
        const updatedData = myData.map((u: any) => {
          if (u.username === this.user.username) {
            return this.user;
          } else {
            return u;
          }
        });

        localStorage.setItem('myData', JSON.stringify(updatedData));
      };

      reader.readAsDataURL(file);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'File Uploaded Successfully',
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }
}
