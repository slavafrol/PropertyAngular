import { Component } from '@angular/core';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent {
  propertyList: Array<any> = [
    {
    "ID" : 1,
    "Name" : "The House",
    "Type" : "House",
    "Price" : 12500
  },
  {
    "ID" : 2,
    "Name" : "The House 2",
    "Type" : "House",
    "Price" : 12000
  },
  {
    "ID" : 3,
    "Name" : "The House 3",
    "Type" : "House",
    "Price" : 11500
  },
  {
    "ID" : 4,
    "Name" : "The House 4",
    "Type" : "House",
    "Price" : 100000
  }
  ]
}
