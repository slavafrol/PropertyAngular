import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { NgForm } from '@angular/forms'
import { TabsetComponent } from 'ngx-bootstrap/tabs'
import { IProperty } from '../IProperty.interface';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('tabs') staticTabs: TabsetComponent
  
  propertyTypes: string[] = ['House', 'Apartment', 'Duplex'];
  furnishingTypes: string[] = ['Fully', 'Semi', 'Unfurnished'];

  propertyView: IProperty = {
    Id: null,
    SellRent: null,
    Name: null,
    Type: null,
    Price: null
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    if (this.staticTabs?.tabs[tabId]) {
      this.staticTabs.tabs[tabId].active = true;
    }
  }

}
