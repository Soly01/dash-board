import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PlansComponent {
  showPlan1: boolean = false;
  showPlan2: boolean = false;
  showPlan3: boolean = false;

  choosePlan(planNumber: number) {
    this.showPlan1 = false;
    this.showPlan2 = false;
    this.showPlan3 = false;

    if (planNumber === 1) {
      this.showPlan1 = true;
    } else if (planNumber === 2) {
      this.showPlan2 = true;
    } else if (planNumber === 3) {
      this.showPlan3 = true;
    }
  }
}
