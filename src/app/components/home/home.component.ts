import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { DishesService } from 'src/app/services/dishes.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dish = {
    id: 0,
    name: '',
    description: '',
    speciality: {},
    dishType: {},
    ingredients: <any>[],
    images: <any>[]
  }

  dishes: any[] = [];
  restaurants: any[] = [];

  concepts: any[] = [];
  types: any[] = [];

  txt: string = ""
  concept: number = 0
  type: number = 0


  filterMode: boolean = false

  constructor(private restaurantsService: RestaurantsService, private dishesService: DishesService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.getConcepts();
    this.getTypes();
    this.getDishes();
    this.getRestaurants();
  }

  getConcepts(){
    this.configService.getSpecialities().subscribe(
      res => {
        this.concepts = res;
      },
      err => console.error(err)
    );
  }

  getTypes(){
    this.configService.getTypes().subscribe(
      res => {
        this.types = res;
      },
      err => console.error(err)
    );
  }

  getDishes(){
    this.dishesService.getDishes().subscribe(
      res => {
        this.dishes = res;
      },
      err => console.error(err)
    );
  }

  getRestaurants(){
    this.restaurantsService.getRestaurants().subscribe(
      res => {
        this.restaurants = res;
      },
      err => console.error(err)
    );
  }

  filter(){

    if (this.concept != 0 || this.type != 0 || this.txt != ''){
    console.log(this.txt, ' ', this.concept, ' ', this.type);
    this.dishesService.filterData( { id_speciality: (this.concept * 1), id_type: (this.type * 1), txt: this.txt } ).subscribe(
      res => {
        this.dishes = res;
        console.log(this.dishes);
        this.filterRestaurants()
      },
      err => console.error(err)
    );
    }else{
      this.getDishes()
      this.filterMode = false;
    }

  }

  filterRestaurants(){
    if (this.concept != 0){
      this.restaurantsService.getRestaurantsByConcept(this.concept * 1).subscribe(
        res => {
          this.restaurants = res;
          console.log(res);
          
          this.filterMode = true;
        },
        err => console.error(err)
      );
    }else{
      this.getRestaurants()
      this.filterMode = false;
    }
  }

}
