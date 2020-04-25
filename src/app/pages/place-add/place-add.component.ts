import { TableService } from './../../shared/services/table.service';
import { Router } from '@angular/router';
import { PlaceService } from './../../shared/services/place.service';
import { LocalStorageService } from './../../shared/services/local-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

interface DayForm {
  name: string;
  enabled?: boolean;
  formGroup?: FormGroup;
}

@Component({
  selector: 'app-place-add',
  templateUrl: './place-add.component.html',
  styleUrls: ['./place-add.component.scss'],
})
export class PlaceAddComponent implements OnInit {
  placeForm: FormGroup;
  days: DayForm[];

  constructor(
    private localStorageService: LocalStorageService,
    private placeService: PlaceService,
    private tableService: TableService,
    private router: Router
  ) {}

  ngOnInit() {
    this.days = [
      { name: 'hétfő' },
      { name: 'kedd' },
      { name: 'szerda' },
      { name: 'csütörtök' },
      { name: 'péntek' },
      { name: 'szombat' },
      { name: 'vasárnap' },
    ];
    this.resetPlaceForm();
  }

  resetPlaceForm() {
    this.days.map((day: DayForm) => {
      day.enabled = true;
      this.resetDayForm(day);
    });

    this.placeForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      openingHours: new FormArray(this.days.map((day: DayForm) => day.formGroup)),
      tables: new FormControl(`[{
          "seats": 3,
          "shape": "rectangle",
          "x": 100,
          "y": 200,
          "width": 30,
          "height": 50
        },{
          "seats": 5,
          "shape": "circle",
          "x": 200,
          "y": 300,
          "radius": 40
        }
      ]`),
    });
  }

  resetDayForm(day: DayForm) {
    const pattern = '(^[0-9]:[0-5][0-9]$)|(^[0-1][0-9]:[0-5][0-9]$)|(^2[0-3]:[0-5][0-9]$)';
    day.formGroup = new FormGroup({
      day: new FormControl(day.name),
      from: new FormControl({ value: '', disabled: !day.enabled }, Validators.pattern(pattern)),
      to: new FormControl({ value: '', disabled: !day.enabled }, Validators.pattern(pattern)),
    });
  }

  submitPlaceForm() {
    const place = {
      ownerId: this.localStorageService.get('userId'),
      name: this.placeForm.value.name,
      description: this.placeForm.value.description,
      openingHours: [],
    };
    let tables;
    this.placeForm.value.openingHours.map((openingHour) => {
      if (openingHour.from !== '' || openingHour.to !== '') {
        place.openingHours.push({ day: openingHour.day, from: openingHour.from, to: openingHour.to });
      }
    });

    try {
      tables = JSON.parse(this.placeForm.value.tables);
      if (!Array.isArray(tables)) {
        throw new Error('result is not array');
      }
      this.createPlace(place, tables);
    } catch (e) {
      console.log(e);
      this.placeForm.controls.tables.setErrors({ notJson: true });
    }
  }

  createPlace(place: any, tables: any[]) {
    this.placeService.createPlace(place).subscribe((res: any) => {
      tables.map((table) => (table.placeId = res.id));
      this.tableService.createTables(tables).subscribe(() => {
        this.router.navigateByUrl('myplaces');
      });
    });
  }
}
