import { SidebarService } from './../../services/sidebar.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  sidebarVisible1: boolean = false;
  user: any;

  constructor(private router: Router, public SidebarService: SidebarService) {}

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

  logOut() {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('loggedUsername');
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  sideBarOpen() {
    this.SidebarService.sideBarOpen();
  }
}
