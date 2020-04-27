import { Component, OnInit, Input } from '@angular/core';
import { PictureDocument } from 'src/app/services/pictureDocument.model';
import { PictureService } from 'src/app/services/picture.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-picture-frame',
  templateUrl: './picture-frame.component.html',
  styleUrls: ['./picture-frame.component.scss'],
})
export class PictureFrameComponent implements OnInit {

  @Input() PictureData: PictureDocument;
  public pictureRef: string;

  constructor(private pictureService: PictureService) { }

  ngOnInit(): void {
    this.pictureService.downloadPicture(this.PictureData.uid, this.PictureData.fileType)
      .subscribe(pictureRef => this.pictureRef = pictureRef);
  }
}
