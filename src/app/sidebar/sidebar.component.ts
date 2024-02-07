import { SidebarService } from './../../services/sidebar.service';
import { Component, DoCheck } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements DoCheck {
  constructor(public sidebarService: SidebarService) {}
  ngDoCheck(): void {}
}
