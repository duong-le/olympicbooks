import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  zaloChatWidget: any = '<div class="zalo-chat-widget" data-oaid="3378651306062428036" data-style="2"></div>';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private sanitized: DomSanitizer) {
    this.zaloChatWidget = this.sanitized.bypassSecurityTrustHtml(this.zaloChatWidget);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) this.initZaloSDK();
  }

  initZaloSDK() {
    let node = document.createElement('script');
    node.src = 'https://sp.zalo.me/plugins/sdk.js';
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
