import { Component, OnInit } from "@angular/core";
import { ImageSendService } from "app/core/services/electron/image-send.service";

@Component({
  selector: "app-media",
  templateUrl: "./media.component.html",
  styleUrls: ["./media.component.scss"],
})
export class MediaComponent implements OnInit {
  constructor(private imageService: ImageSendService) {}
  mediaList;
  shwoSpinner = true;
  ngOnInit(): void {
    this.getImages();
  }
  getImages() {
    this.shwoSpinner = true;
    this.imageService.fetchImages().subscribe((res: any) => {
      this.mediaList = res.mainData;
      this.shwoSpinner = false;
    });
  }

  delete(item) {
    this.imageService.removeImage(item).subscribe(
      (res) => {
        console.log(res);
        this.getImages();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
