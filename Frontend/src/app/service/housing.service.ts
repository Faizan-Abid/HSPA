import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../models/property';
@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http: HttpClient) { }

  getProperty(id: number){
    return this.getAllProperties().pipe(
      map(propertiesArray =>{
        // throw new Error('Some Error');
        return propertiesArray.find(p => p.Id === id);
      })
    )
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data: any) => {
        console.log('Data from HTTP request:', data); 
  
        const propertiesArray: Array<Property> = [];
        const localPropertiesString = localStorage.getItem('newProp');
  
        console.log('Local Properties:', localPropertiesString); 
  
        if (localPropertiesString !== null) {
          const localProperties = JSON.parse(localPropertiesString);
  
          for (const id in localProperties) {
            if(SellRent){
            if (localProperties.hasOwnProperty(id) && localProperties[id].SellRent === SellRent) {
              propertiesArray.push(localProperties[id]);
            }
          }else{
            propertiesArray.push(localProperties[id]);
          }
          }

        }
  
        for (const id in data) {
          if(SellRent){

          
          if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
            propertiesArray.push(data[id]);
          }
        } else{
          propertiesArray.push(data[id]);
        }
        }
  
        console.log('Properties Array:', propertiesArray); 
        return propertiesArray;
      })
    );
    return this.http.get<Property[]>('data/properties.json');
  }
  
  addProperty(property: Property) {
    let newProp: Property[] = [property];
    const localPropertiesString = localStorage.getItem('newProp');
    if (localPropertiesString !== null) {
      const localProperties = JSON.parse(localPropertiesString);
      newProp = [...newProp, ...localProperties];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }
  

  newPropID() {
    const storedPID = localStorage.getItem('PID');
    if (storedPID !== null) {
      localStorage.setItem('PID', String(+storedPID + 1));
      return +storedPID + 1;
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
  
}
