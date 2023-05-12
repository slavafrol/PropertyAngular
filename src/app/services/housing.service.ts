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

  getAllProperties(SellRent: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertiesArray: Array<IPropertyBase> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id) && (data as any)[id].SellRent === SellRent) {
            propertiesArray.push((data as any)[id]);
          }
        }
        return propertiesArray;
      })
    )
  }

  addProperty (property: Property) {
    localStorage.setItem('newProp', JSON.stringify(property));
  }
}
