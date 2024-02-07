import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dash-board';
  showHead: boolean = false;
  constructor(
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/login' || event['url'] === '/register') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
}
