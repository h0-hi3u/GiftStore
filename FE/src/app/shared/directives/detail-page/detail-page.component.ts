import { HelperNumber } from './../../../core/helpers/helperNumber';
import { Component, OnInit } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  slideIndex: number = 1;

  constructor(public helperNumber: HelperNumber){}
  ngOnInit(): void {
      this.showDiv(this.slideIndex)
  }
  //#region slide image
  public currentDiv(n: number) { 
    this.showDiv(this.slideIndex = n);
  }
  public showDiv(n: number) {
    //handle image
    let x = document.getElementsByClassName('slide-image');
    if (x.length != 0) {
      this.slideIndex = n;
      if (this.slideIndex > x.length) {
        this.slideIndex = 1;
      }
      if (this.slideIndex < 1) {
        this.slideIndex = x.length;
      }
      for (let i = 0; i < x.length; i++) {
        if (x[i].classList.contains('slide-block')) {
          x[i].classList.remove('slide-block');
        }
      }
      x[this.slideIndex - 1].classList.add('slide-block');

      //handle border small-image
      let dots = document.getElementsByClassName('small-image');
      for (let i = 0; i < dots.length; i++) {
        if (dots[i].classList.contains('active')) {
          dots[i].classList.remove('active');
        }
      }
      dots[this.slideIndex - 1].classList.add('active');
    }
  }
  //#endregion
}
