import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AppUpdateDetectorService {

  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
    this.swUpdate.activateUpdate();

    this.swUpdate.available.subscribe(() => {
      // tslint:disable-next-line: max-line-length
      const snack = this.snackbar.open('You\'re running an outdated version. To update press update or refresh your page', 'Update', { duration: 6000 });

      snack.onAction().subscribe(() => {
        window.location.reload();
      });
    });
  }
}
