import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { TableService } from '../../services/table.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Tables } from '../../../core/interface/table.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  value!: string;
  valuee!: string;
  clickedButtons: string[] = [];
  textData: string = '';
  user: any;
  tableSubsctiption!: Subscription;
  tables: Tables[] | any;
  @Output() cardCreated = new EventEmitter<void>();

  constructor(
    private router: Router,
    private messageService: MessageService,
    private tableService: TableService
  ) {}
  profile() {
    this.router.navigate(['/profile']);
  }
  save() {
    const myData = JSON.parse(localStorage.getItem('myData') || '[]');
    const loggedUsername = localStorage.getItem('loggedUsername');

    if (loggedUsername) {
      const userIndex = myData.findIndex(
        (u: any) => u.username === loggedUsername
      );

      if (userIndex !== -1) {
        const userDrafts = myData[userIndex].drafts || [];

        userDrafts.push({
          title: this.valuee || '',
          comment: this.value || '',
        });

        myData[userIndex].drafts = userDrafts;

        localStorage.setItem('myData', JSON.stringify(myData));
        this.valuee = '';
        this.value = '';
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Draft Saved Successfully',
        });
      }
    }
  }

  draft() {
    this.router.navigate(['/draft']);
  }

  onClick(buttonId: string) {
    const index = this.clickedButtons.indexOf(buttonId);
    if (index === -1) {
      this.clickedButtons.push(buttonId);
    } else {
      this.clickedButtons.splice(index, 1);
    }
  }
  isClicked(buttonId: string): boolean {
    return this.clickedButtons.includes(buttonId);
  }
  ngOnInit(): void {
    this.getTables();
    const isLogged = localStorage.getItem('isLogged');

    if (isLogged) {
      const loggedUsername = localStorage.getItem('loggedUsername');

      if (loggedUsername) {
        const myData = JSON.parse(localStorage.getItem('myData') || '[]');
        this.user = myData.find((u: any) => u.username === loggedUsername);
      }
    }
  }
  getTables(): void {
    this.tableSubsctiption = this.tableService.getTable().subscribe({
      next: (res: HttpResponse<Tables[] | null>) => {
        if (res.status == 200) {
          console.log('getData Success');
        }
        console.log(res);
        this.tables = res.body;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        if (err.status == 404) {
          console.log(err.statusText);
        }
      },
    });
  }
  ngOnDestroy(): void {
    if (this.tableSubsctiption && this.tableSubsctiption.closed) {
      this.tableSubsctiption.unsubscribe();
    }
  }
}
