import { Component, OnChanges, Input } from '@angular/core';
import { PictureDocument } from 'src/app/services/pictureDocument.model';
import { PictureService } from 'src/app/services/picture.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-picture-frame',
  templateUrl: './picture-frame.component.html',
  styleUrls: ['./picture-frame.component.scss'],
})
export class PictureFrameComponent implements OnChanges {

  @Input() PictureData: PictureDocument;
  public pictureRef: Observable<string>;

  constructor(private pictureService: PictureService) {
  }

  ngOnChanges(): void {
    this.pictureRef = this.pictureService.downloadPicture(this.PictureData.uid, this.PictureData.fileType);
  }
}
