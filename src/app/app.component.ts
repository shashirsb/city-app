import { Component } from '@angular/core';
import { DataService } from "../app/data.services";
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  searchForm: FormGroup;
  baseUrl_1: string;
  baseUrl_2: string;
  wikiJson: string;
  weatherJson: string;
  place: string;
  temp: any;
  temp_min: any;
  temp_max: any;
  img_url: any;
  constructor(private ds: DataService) {

  }

  // submit Form
  todoSubmit(value: any): void {
    if (value !== "") {
      console.log("its working yepppp!" + value);

      this.place = value;

      this.baseUrl_1 = "http://localhost:7000/api/wiki/findByCityName";
      this.baseUrl_2 = "http://localhost:8000/api/weather/findByCityName";

      const req = {
        params: {
          "place" : value
        }
      };

      this.ds.post(req,this.baseUrl_1).subscribe((res: any) => {
        if (res.status) {       
          let obj = res.data.query.pages;   
          let Ob = Object.keys(obj)[0]; 
          this.wikiJson = obj[Ob]["extract"];
          this.img_url = obj[Ob]["thumbnail"].source;
        } else {
          this.wikiJson = "Issue in fetching data";
        }
      });

      this.ds.post(req,this.baseUrl_2).subscribe((res: any) => {
        if (res.status) {       
          this.weatherJson = res.data;
          this.temp = ((res.data.main.temp -32)  * 5/9).toFixed(2);
          this.temp_min = ((res.data.main.temp_min -32)  * 5/9).toFixed(2);
          this.temp_max = ((res.data.main.temp_max -32)  * 5/9).toFixed(2);
        } else {
          this.weatherJson = "Issue in fetching data";
        }
      });

      //this.todoForm.reset()
    } else {
      alert('Field required **')
    }

  }

}




