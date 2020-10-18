import { HelperMethodsService } from './../../services/helper-methods.service';
import { TIME_PATTERN } from './../../shared/patterns/time-pattern';
import { Subscription } from 'rxjs';
import { ApiResponse } from './../../models/api-response';
import { Place } from './../../models/place';
import { Table } from './../../models/table';
import { TableService } from '../../services/table.service';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class PlaceAddComponent implements OnInit, OnDestroy {
  placeForm: FormGroup;
  days: DayForm[];
  placeSubs: Subscription;
  tableSubs: Subscription;

  constructor(
    private placeService: PlaceService,
    private tableService: TableService,
    private router: Router,
    private helperMethodsService: HelperMethodsService
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

  ngOnDestroy(): void {
    if (this.placeSubs) {
      this.placeSubs.unsubscribe();
    }
    if (this.tableSubs) {
      this.tableSubs.unsubscribe();
    }
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
    day.formGroup = new FormGroup({
      day: new FormControl(day.name),
      from: new FormControl({ value: '', disabled: !day.enabled }, Validators.pattern(TIME_PATTERN)),
      to: new FormControl({ value: '', disabled: !day.enabled }, Validators.pattern(TIME_PATTERN)),
    });
  }

  submitPlaceForm() {
    const place = {
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
      console.error(e);
      this.helperMethodsService.openSnackBar('Az asztalok nem jó formátumban vannak!');
    }
  }

  createPlace(place: Place, tables: Table[]) {
    this.placeSubs = this.placeService.createPlace(place).subscribe((res: ApiResponse) => {
      tables.map((table) => (table.placeId = res.id));
      this.tableSubs = this.tableService.createTables(tables).subscribe(() => {
        this.router.navigateByUrl('myplaces');
      });
    });
  }
}
