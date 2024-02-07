import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css'],
})
export class DraftComponent implements OnInit {
  drafts: any[] = [];
  constructor(private messageService: MessageService) {}
  ngOnInit() {
    this.loadDrafts();
  }

  loadDrafts() {
    const loggedUsername = localStorage.getItem('loggedUsername');

    if (loggedUsername) {
      const myData = JSON.parse(localStorage.getItem('myData') || '[]');
      const user = myData.find((u: any) => u.username === loggedUsername);

      if (user && user.drafts) {
        this.drafts = user.drafts;
      }
    }
  }

  deleteDraft(index: number) {
    const loggedUsername = localStorage.getItem('loggedUsername');

    if (loggedUsername) {
      const myData = JSON.parse(localStorage.getItem('myData') || '[]');
      const userIndex = myData.findIndex(
        (u: any) => u.username === loggedUsername
      );

      if (userIndex !== -1 && this.drafts.length > 0) {
        myData[userIndex].drafts.splice(index, 1);
        localStorage.setItem('myData', JSON.stringify(myData));
        this.drafts.splice(index, 1);
        this.messageService.add({
          severity: 'error',
          summary: 'Deleted',
          detail: 'Draft Deleted',
        });
      }
    }
  }
}
