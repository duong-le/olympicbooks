import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step',
  template: `
    <p>
      step works!
    </p>
  `,
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
