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

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2;
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data => {
        this.propertyList=data;
        console.log(data);

        const newProp = JSON.parse(localStorage.getItem('newProp'));
        if (newProp.SellRent == this.SellRent) {
          this.propertyList = [newProp, ...this.propertyList];
        }
      }, error => {
        console.log(error);
      }
    )
  }
}
