import { Injectable } from '@angular/core';
import { Property } from '../model/Property';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { HousingService } from './housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property> {

constructor(private router: Router, private housingService: HousingService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property>|Property {
  const propId = route.params['id']
  return this.housingService.getProperty(+propId).pipe(
    catchError(error => {
      this.router.navigate(['/']);
      return of(null);
    })
  );
}

}
