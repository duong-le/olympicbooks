import { isPlatformBrowser } from '@angular/common';

export function FacebookInitializer(platformId: Object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      new Promise((resolve) => {
        // Wait for facebook sdk to initialize before starting the angular app
        window['fbAsyncInit'] = function () {
          resolve(window['FB'].init({ xfbml: true, version: 'v9.0' }));
        };

        // Load facebook sdk script
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s);
          js.id = id;
          js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
      });
    }
  };
}
