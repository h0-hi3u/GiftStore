import { Component } from '@angular/core';

@Component({
  selector: 'social-fixed',
  templateUrl: './social-fixed.component.html',
  styleUrls: ['./social-fixed.component.scss'],
})
export class SocialFixedComponent {
  constructor() {
    window.addEventListener("scroll", this.calculateScrollTop);
  }
  public backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  public calculateScrollTop() {
    const btnBackToTop = document.getElementById("back-to-top");
    if(window.scrollY >= 200) {
      if(!btnBackToTop?.classList.contains("active")) {
        btnBackToTop?.classList.add("active");
      }
    }
    else {
      if(btnBackToTop?.classList.contains("active")) {
        btnBackToTop?.classList.remove("active");
      }
    }
  }
}
