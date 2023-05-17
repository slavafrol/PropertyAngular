import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { IPropertyBase } from '../../model/IPropertyBase';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  SellRent: number = 1;
  propertyList: Array<IPropertyBase>;
  City = '';
  SearchCity = '';
  SortByParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.propertyList=data;
        console.log(data);
      }, error => {
        console.log(error);
      }
    )
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  onCityFilterClear() {
    this.SearchCity = '';
    this.City = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'asc') {
      this.SortDirection = 'desc';
    } else {
      this.SortDirection = 'asc';
    }
  }

}
