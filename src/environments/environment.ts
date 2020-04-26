// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUri: 'https://picturearchive1.azurewebsites.net',
  firebase: {
    apiKey: 'AIzaSyAvK_cpvCf6_zcr6YEWNZoBPECNp1_nKEw',
    authDomain: 'images-chu-mk.firebaseapp.com',
    databaseURL: 'https://images-chu-mk.firebaseio.com',
    projectId: 'images-chu-mk',
    storageBucket: 'images-chu-mk.appspot.com',
    messagingSenderId: '26394416274',
    appId: '1:26394416274:web:bff9348aac857dfafb024b',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
