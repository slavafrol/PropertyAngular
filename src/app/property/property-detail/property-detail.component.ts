import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Property } from 'src/app/model/Property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation} from '@kolkov/ngx-gallery';


@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  public propertyId: number;
  property = new Property()
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private housingService: HousingService) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/inside-1.jpg',
        medium: 'assets/inside-1.jpg',
        big: 'assets/inside-1.jpg'
      },
      {
        small: 'assets/inside-2.jpg',
        medium: 'assets/inside-2.jpg',
        big: 'assets/inside-2.jpg'
      },
      {
        small: 'assets/inside-3.jpg',
        medium: 'assets/inside-3.jpg',
        big: 'assets/inside-3.jpg'
      },{
        small: 'assets/inside-4.jpg',
        medium: 'assets/inside-4.jpg',
        big: 'assets/inside-4.jpg'
      },
      {
        small: 'assets/inside-5.jpg',
        medium: 'assets/inside-5.jpg',
        big: 'assets/inside-5.jpg'
      }
    ];

    this.propertyId = +this.route.snapshot.params['id'];

    this.route.data.subscribe(
      data => {
        this.property = data['prp'];
      }
    )

    // this.route.params.subscribe(
    //   params => {
    //     this.propertyId = +params['id']
    //     this.housingService.getProperty(this.propertyId).subscribe(
    //       (data: Property) => {
    //         this.property = data;
    //       }, error => this.router.navigate(['/'])
    //     )
    //   }
    // );
  }



}
