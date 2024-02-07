import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { friends } from '../../../core/interface/friends.interface';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { FriendsService } from './../../services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FriendsComponent implements OnInit, OnDestroy {
  friendsSubscription!: Subscription;
  friends: friends[] | null = [];
  constructor(private router: Router, private friendsService: FriendsService) {}
  ngOnInit(): void {
    this.getFriends();
  }
  getFriends(): void {
    this.friendsSubscription = this.friendsService.getFriends().subscribe({
      next: (res: HttpResponse<friends[] | null>) => {
        if (res.status == 200) {
          console.log('get Data Success');
        }
        console.log(res);
        this.friends = res.body;
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
    if (this.friendsSubscription && this.friendsSubscription.closed) {
      this.friendsSubscription.unsubscribe();
    }
  }
  toProfile() {
    this.router.navigate(['/profile']);
  }
}
