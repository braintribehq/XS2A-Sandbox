import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {URL_PARAMS_PROVIDER} from "./app/common/constants/constants";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


// const getUrlParams = (): any => {
//     const params = {};
//     const url = window.location.href;
//     const questionMarkPosition = url.indexOf('?');
//     if (questionMarkPosition > -1) {
//         const queryString = url.substr(questionMarkPosition + 1);
//         let part;
//         const queries = queryString.split('&');
//         for (let i = 0, length = queries.length; i < length; i++) {
//             const queryPair = queries[i];
//             part = queryPair.split(/=(.+)/);
//             params[part[0]] = part[1];
//         }
//     }
//     return params;
// };
//
// platformBrowserDynamic([
//     {
//       provide: URL_PARAMS_PROVIDER, useValue: getUrlParams()
//     }
//
// ]).bootstrapModule(AppModule)
//   .catch(err => console.error(err));
