import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-data-alert',
  templateUrl: './no-data-alert.component.html',
  styleUrls: ['./no-data-alert.component.scss'],
})
export class NoDataAlertComponent implements OnInit {
  @Input() text: string;
  constructor() {}

  ngOnInit() {}
}
