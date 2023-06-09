import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { FormBuilder, FormControl, FormGroup, NgForm, NonNullableFormBuilder, Validators } from '@angular/forms'
import { TabsetComponent } from 'ngx-bootstrap/tabs'
import { IPropertyBase } from 'src/app/model/IPropertyBase';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('tabs') staticTabs: TabsetComponent;
  addPropertyForm: FormGroup;
  nextClicked: boolean = false;
  property = new Property();

  propertyTypes: string[] = ['House', 'Apartment', 'Duplex'];
  furnishingTypes: string[] = ['Fully', 'Semi', 'Unfurnished'];

  propertyView: IPropertyBase = {
    Id: null,
    SellRent: null,
    Name: null,
    PType: null,
    Price: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  constructor(private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService) { }

  ngOnInit() {
    this.createPropertyForm();
  }

  createPropertyForm() {
    this.addPropertyForm = this.fb.group({
      GeneralInfo: this.fb.group({
        SellRent: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        BHK: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group ({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null]
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      if (this.SellRent.value === '1') {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/rent-property']);
      }
      return;
    }
  }

  allTabsValid(): boolean {
    if (this.GeneralInfo.invalid) {
      this.staticTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.staticTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.staticTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.staticTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(tabId: number, isCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (isCurrentTabValid) {
      this.staticTabs.tabs[tabId].active = true;
      this.nextClicked = false;
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropId();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  get GeneralInfo() {
    return this.addPropertyForm.controls['GeneralInfo'] as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls['PriceInfo'] as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls['AddressInfo'] as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls['OtherInfo'] as FormGroup;
  }



  get SellRent() {
    return this.GeneralInfo.controls['SellRent'] as FormControl;
  }

  get BHK() {
    return this.GeneralInfo.controls['BHK'] as FormControl;
  }

  get PType() {
    return this.GeneralInfo.controls['PType'] as FormControl;
  }

  get FType() {
    return this.GeneralInfo.controls['FType'] as FormControl;
  }

  get Name() {
    return this.GeneralInfo.controls['Name'] as FormControl;
  }

  get City() {
    return this.GeneralInfo.controls['City'] as FormControl;
  }

  get Price() {
    return this.PriceInfo.controls['Price'] as FormControl;
  }

  get BuiltArea() {
    return this.PriceInfo.controls['BuiltArea'] as FormControl;
  }

  get CarpetArea() {
    return this.PriceInfo.controls['CarpetArea'] as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls['Security'] as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls['Maintenance'] as FormControl;
  }

  get FloorNo() {
    return this.AddressInfo.controls['FloorNo'] as FormControl;
  }

  get TotalFloor() {
    return this.AddressInfo.controls['TotalFloor'] as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls['Address'] as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls['LandMark'] as FormControl;
  }

  get RTM() {
    return this.OtherInfo.controls['RTM'] as FormControl;
  }

  get PossessionOn() {
    return this.OtherInfo.controls['PossessionOn'] as FormControl;
  }

  get AOP() {
    return this.OtherInfo.controls['AOP'] as FormControl;
  }

  get Gated() {
    return this.OtherInfo.controls['Gated'] as FormControl;
  }

  get MainEntrance() {
    return this.OtherInfo.controls['MainEntrance'] as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls['Description'] as FormControl;
  }


}
