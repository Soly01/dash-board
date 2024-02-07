import { Component } from '@angular/core';
import { Navbar } from '../../../core/interface/navbar.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: Navbar[] = [
    { label: 'Item 1', icon: 'pi pi-fw pi-home' },
    { label: 'Item 2', icon: 'pi pi-fw pi-calendar' },
    // Add more menu items as needed
  ];

  activeItem: Navbar = this.items[0]; // Set the initial active item
}
