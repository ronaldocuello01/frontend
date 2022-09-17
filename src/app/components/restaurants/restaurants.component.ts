import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { DishesService } from 'src/app/services/dishes.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  restaurants: any[] = [];

  selected: boolean = false

  selectedRestaurant = {
    id: 0,
    name: '',
    location: '',
    status: '',
    concepts: <any>[],
    files: <any>[],
    dishes: <any>[],
    views: 0
  }

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit(): void {
    this.getRestaurants();
  }

  getRestaurants(){
    this.restaurantsService.getRestaurants().subscribe(
      res => {
        this.restaurants = res;
      },
      err => console.error(err)
    );
  }

  showData(data: any){
    this.selected = true

    console.log('data', data);
    
    this.selectedRestaurant.id = data.id;
    this.selectedRestaurant.name = data.name;
    this.selectedRestaurant.location = data.location;

    this.selectedRestaurant.concepts = data.specialities;
    this.selectedRestaurant.files = data.files;
    this.selectedRestaurant.dishes = data.dishes;

    this.selectedRestaurant.views = data.views.length;

    // this.addView(data.id)

  }

  // addView(id: number){
  //   this.restaurantsService.addView(id).subscribe(
  //     err => console.error(err)
  //   );
  // }

}
