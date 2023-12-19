import { Component, OnInit } from '@angular/core';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  slideIndex : number = 1;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  ngOnInit(): void {
      this.showDiv(this.slideIndex);
  }
  //#region  slide show banner
  public plusDiv(n : number) {
    this.slideIndex += n;
    this.showDiv(this.slideIndex);
  }
  public carousel() {
    setTimeout(() => {
      this.slideIndex += 1;
      this.showDiv(this.slideIndex);
    }, 2000);
  }
  public showDiv(n : number) {
    //handle image
    let x = document.getElementsByClassName("slide-image");
    this.slideIndex = n;
    if (this.slideIndex > x.length) {this.slideIndex = 1}
    if (this.slideIndex < 1) {this.slideIndex = x.length}
    for(let i = 0; i < x.length; i++) {
      if(x[i].classList.contains("slide-block")) {
        x[i].classList.remove("slide-block");
      }  
    }
    // const slideShow = x[this.slideIndex - 1];
    x[this.slideIndex - 1].classList.add("slide-block");

    //handle dots
    let dots = document.getElementsByClassName("dot");
    for(let i = 0; i < dots.length; i++) {
      if(dots[i].classList.contains("dot-active")) {
        dots[i].classList.remove("dot-active");
      }
    }
    // const dotShow = dots[this.slideIndex - 1];
    dots[this.slideIndex - 1].classList.add("dot-active");
    // this.carousel(); 
  }
  //#endregion
}
