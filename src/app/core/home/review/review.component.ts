import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  @Input() rating: number = 0;
  @Input() maxrating  = 5;
  maxratingArray:any=[];

  ngOnInit(): void {
    this.maxratingArray =Array(this.maxrating).fill(0);

  }
  // get starList(): number[] {
  //   return Array(Math.floor(this.rating)).fill(0);
  // }
}
