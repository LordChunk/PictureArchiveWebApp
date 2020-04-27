import { Component, OnInit, ViewChild } from '@angular/core';
import { PictureService } from '../services/picture.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Observable } from 'rxjs';
import { PictureDocument } from '../services/pictureDocument.model';

@Component({
  selector: 'app-list-picture',
  templateUrl: './list-picture.component.html',
  styleUrls: ['./list-picture.component.scss'],
})
export class ListPictureComponent implements OnInit {

  constructor(private pictureService: PictureService) { }

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  public PictureData: Observable<PictureDocument[]>;

  handler(event) {
    console.log(event);
  }

  ngOnInit() {
    // Subscribe to list of image links
    // this.pictureService.getPictureRefs(10).subscribe(
    //   (data: string[]) => {
    //     // Assign data to return value
    //     this.ImageLinks = data;
    //   });
    // this.ImageLinks = this.pictureService.getPictureRefs(10).pipe();

    this.PictureData = this.pictureService.getPictureRefs();
  }
}
