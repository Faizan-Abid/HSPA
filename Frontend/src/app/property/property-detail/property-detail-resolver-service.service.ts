import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Property } from 'src/app/models/property';
import { HousingService } from 'src/app/service/housing.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailResolverService implements Resolve<Property | null> {

  constructor(private router: Router, private housingService: HousingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Property | null> {
    const propId = route.params['id'];
    return this.housingService.getProperty(+propId).pipe(
      map((property: Property | undefined) => {
        if (property) {
          return property;
        } else {
          this.router.navigate(['/']);
          return null;
        }
      }),
      catchError(() => {
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
