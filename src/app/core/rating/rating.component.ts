import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
@Input('rate') public rate: any;
constructor(){
  this.rateProduct(this.rate);
}
starWidth: number = 0;
ngOnInit(): void {
  this.rateProduct(this.rate);

}
  rateProduct(rateValue: number) {
    this.starWidth = rateValue * 75 / 5;
  }
}
