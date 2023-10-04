import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/models/ipropertybase';
import { HousingService } from 'src/app/service/housing.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {
  SellRent = 1;
  properties!: IPropertyBase[];
  City = '';
  SearchCity = '';
  SortByParam = '';
  SortDirection = 'asc';

  constructor(private route: ActivatedRoute, private housingService: HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 2; // Means we are on rent-property URL else we are on base URL
    }
    this.housingService.getAllProperties(this.SellRent).subscribe({
        next: (data: IPropertyBase[]) => {
          this.properties = data;
          console.log(data);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
  }

  onCityFilter(){
    this.SearchCity = this.City;
  }
  onCityFilterClear(){
    this.SearchCity = ''
    this.City = '';
  }
onSortDirection(){
if(this.SortDirection === 'desc'){
  this.SortDirection = 'asc';
}
else{
  this.SortDirection = 'desc';
}
}
}
