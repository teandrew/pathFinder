import { Component } from '@angular/core';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showFeedback: boolean = false;
  public feedbackEmotes = [
    {
      class: 'far fa-grin-beam fa-3x',
      type: 'happy',
      isActive: false
    },
    {
      class: 'far fa-meh fa-3x',
      type: 'meh',
      isActive: false
    },
    {
      class: 'far fa-frown fa-3x',
      type: 'sad',
      isActive: false
    }
  ]

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string
  ) {}

  triggerFeedback() {
    this.showFeedback = !this.showFeedback;
  }

  setToActive(emote: Object) {
    for (var i = 0; i < this.feedbackEmotes.length; i++) {
      if (this.feedbackEmotes[i].class == emote['class'])
        this.feedbackEmotes[i].isActive = true;
      else 
        this.feedbackEmotes[i].isActive = false;
    }
  }

  onActivate(event: any) {
    window.scroll(0,0)
    /*
    if (isPlatformBrowser(this.platformId)) {
      let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
          window.clearInterval(scrollToTop);
        }
      }, 16);
    }
    */
  }
}
