import { ProjectsService } from './../../services/projects.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Projects } from './../../../core/interface/projects.interface';
import { Component, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class ProjectsComponent {
  projectsSubscription!: Subscription;
  projects: Projects[] | null = [];
  constructor(private projectsService: ProjectsService) {}
  ngOnInit(): void {
    this.getProjects();
  }
  getProjects(): void {
    this.projectsSubscription = this.projectsService.getProjects().subscribe({
      next: (res: HttpResponse<Projects[] | null>) => {
        if (res.status == 200) {
          console.log('get Data Success');
        }
        console.log(res);
        this.projects = res.body;
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
    if (this.projectsSubscription && this.projectsSubscription.closed) {
      this.projectsSubscription.unsubscribe();
    }
  }
}
