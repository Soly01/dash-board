import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FilesService } from '../../services/files.service';
import { Subscription } from 'rxjs';
import { files } from '../../../core/interface/files.interface';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrl: './files.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class FilesComponent implements OnInit, OnDestroy {
  fileSubscribtion!: Subscription;
  files: files[] | null = [];
  constructor(private filesService: FilesService) {}

  ngOnInit(): void {
    this.getFiles();
  }
  getFiles(): void {
    this.fileSubscribtion = this.filesService.getFiles().subscribe({
      next: (res: HttpResponse<files[] | null>) => {
        if (res.status == 200) {
          console.log('get Data Success');
        }
        console.log(res);
        this.files = res.body;
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
    if (this.fileSubscribtion && this.fileSubscribtion.closed) {
      this.fileSubscribtion.unsubscribe();
    }
  }
}
