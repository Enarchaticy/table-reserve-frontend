import { Place } from './../../models/place';
import { Reservation } from './../../models/reservation';
import { InjectionToken } from '@angular/core';

export interface ContainerData {
 tableId?: string;
 reservation?: Reservation;
 place?: Place;
 date?: Date;
}

export const CONTAINER_DATA = new InjectionToken<ContainerData>('CONTAINER_DATA');
