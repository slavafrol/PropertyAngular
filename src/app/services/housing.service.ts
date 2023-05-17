import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { IPropertyBase } from '../model/IPropertyBase';
import { Observable } from 'rxjs';
import { Property } from '../model/Property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id: number) {
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id == id) as Property;
      })
    );
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<Property> = [];
        const localProp = JSON.parse(localStorage.getItem('newProp'));

        if (localProp) {
          for (const id in localProp) {
            if (SellRent) {
              if (localProp.hasOwnProperty(id) && (localProp as any)[id].SellRent === SellRent) {
                propertiesArray.push((localProp as any)[id]);
              }
            } else {
              propertiesArray.push((localProp as any)[id]);
            }
          }
        }

        for (const id in data) {
          if (SellRent) {
            if (data.hasOwnProperty(id) && (data as any)[id].SellRent === SellRent) {
              propertiesArray.push((data as any)[id]);
            }
          } else {
            propertiesArray.push((data as any)[id]);
          }
        }
        return propertiesArray;
      })
    )
  }

  addProperty (property: Property) {
    let newProp: Array<Property> = [];
    let existingProp = JSON.parse(localStorage.getItem('newProp'));
    if (existingProp) {
      localStorage.setItem('newProp', JSON.stringify([property, ...existingProp]));
    } else {
      localStorage.setItem('newProp', JSON.stringify([property]));
    }
  }

  newPropId() {
    let id: string = localStorage.getItem('PID');
    if (id) {
      localStorage.setItem('PID', String(+id + 1));
      return +id;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
