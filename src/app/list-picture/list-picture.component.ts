import { Component, OnInit } from '@angular/core';
import { PictureService } from '../services/picture.service';

@Component({
  selector: 'app-list-picture',
  templateUrl: './list-picture.component.html',
  styleUrls: ['./list-picture.component.scss'],
})
export class ListPictureComponent implements OnInit {

  constructor(private pictureService: PictureService) { }

  public ImageLinks: string[];
  ngOnInit() {
    // Subscribe to list of image links
    this.pictureService.getPictureRefs(40).subscribe(
      (data: string[]) => {
        // Assign data to return value
        this.ImageLinks = data;
      });
  }

}
