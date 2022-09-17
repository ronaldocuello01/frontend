import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { DishesService } from 'src/app/services/dishes.service';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  restaurants: any[] = []
  restaurant = {
    name: '',
    location: '',
    concept: 0,
    id_specialities: <any>[],
    files_data: <any>[],
  }

  // dishes: any[] = []
  dish = {
    name: '',
    description: '',
    speciality: 0,
    restaurant: 0,
    dishType: 0,
    files_data: <any>[],
    ingredients_data: <any>[],
  }
  ingredient = {
    name: '',
    description: ''
  }

  concepts: any[] = []
  concept = {
    name: '',
    description: ''
  }

  dishtypes: any[] = []
  dishType = {
    name: '',
    description: ''
  }

  image: string = '';
  images = <any>[];
  imagesUploaded = <any>[];

  imageDish: string = '';
  imagesDish = <any>[];
  imagesUploadedDish = <any>[];
  

  constructor(private restaurantsService: RestaurantsService, private dishesService: DishesService, private configService: ConfigService) { }

  ngOnInit(): void {
    this.getConcepts()
    this.getDishTypes()
    this.getRestaurants()
  }


  getRestaurants(){
    this.restaurantsService.getRestaurants().subscribe(
      res => {
        this.restaurants = res;
      },
      err => console.error(err)
    );
  }


  getConcepts(){
    this.configService.getSpecialities().subscribe(
      res => {
        this.concepts = res;
      },
      err => console.error(err)
    );
  }

  addConcept(){
    this.configService.addConcept( this.concept ).subscribe(
      res => {
        this.concept.name = ''
        this.concept.description = ''
        this.getConcepts()
      },
      err => console.error(err)
    );
  }

  getDishTypes(){
    this.configService.getTypes().subscribe(
      res => {
        this.dishtypes = res;
      },
      err => console.error(err)
    );
  }

  addDishType(){
    this.configService.addDishType( this.dishType ).subscribe(
      res => {
        this.dishType.name = ''
        this.dishType.description = ''
        this.getDishTypes()
      },
      err => console.error(err)
    );
  }


  // ---------------------------------------------------------------------------------------------------

  addRestaurant(){

    this.restaurant.id_specialities.push(this.restaurant.concept)

    this.upload();
  
  }


  imageUpload(e: any, element: any){
    if (e.target.files){
      this.imagesUploaded.push(e.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.image =  event.target.result;
        this.images.push(event.target.result);
        element.value = '';
      }
    }
  }


  upload(): any {
    try{
      
      const data = new FormData();
      try{
        this.imagesUploaded.forEach((img: any) => {
          data.append('images', img);
        });
      }catch(e){
        console.log('error al subir archivo');
      }
      
      this.configService.uploadImages(data).subscribe(
        res => {
          this.restaurant.files_data = res;

          console.log('res', res);
          

          this.restaurantsService.addRestaurant(this.restaurant).subscribe(
            res => {
              this.restaurant = {
                name: '',
                location: '',
                concept: 0,
                id_specialities: <any>[],
                files_data: <any>[],
              }
              
              this.images = <any>[];
              this.imagesUploaded = <any>[];

            },
            err => console.error(err)
          );

        },
        err => console.error(err)
      );

    }catch(e){
      console.log('error al subir archivo');
    }
  }


  // ----------------------------------------------------------------------------------------------------------------------------------------------


  addIngredient(){

    this.dish.ingredients_data.push({ name: this.ingredient.name, description: this.ingredient.description} )

    this.ingredient.name = ''
    this.ingredient.description = ''

  }

  removeIngredient(item: any){
    const r_ingredients = this.dish.ingredients_data.filter((i: any) => {
      return i != item;
    });
    this.dish.ingredients_data = r_ingredients;
  }

  addDish(){

    this.uploadDish();
  
  }


  imageUploadDish(e: any, element: any){
    if (e.target.files){
      this.imagesUploadedDish.push(e.target.files[0]);
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.imageDish =  event.target.result;
        this.imagesDish.push(event.target.result);
        element.value = '';
      }
    }
  }


  uploadDish(): any {
    try{
      
      const data = new FormData();
      try{
        this.imagesUploadedDish.forEach((img: any) => {
          data.append('images', img);
        });
      }catch(e){
        console.log('error al subir archivo');
      }
      
      this.configService.uploadImages(data).subscribe(
        res => {
          this.dish.files_data = res;

          console.log('res', res);
          
          console.log('dish', this.dish);
          

          this.dishesService.addDish(this.dish).subscribe(
            res => {
              this.dish = {
                name: '',
                description: '',
                speciality: 0,
                restaurant: 0,
                dishType: 0,
                files_data: <any>[],
                ingredients_data: <any>[]
              }
              
              this.imagesDish = <any>[];
              this.imagesUploadedDish = <any>[];

            },
            err => console.error(err)
          );

        },
        err => console.error(err)
      );

    }catch(e){
      console.log('error al subir archivo');
    }
  }


}
