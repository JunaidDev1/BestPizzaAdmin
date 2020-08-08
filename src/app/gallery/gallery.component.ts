import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Gallery } from '../models/gallery';
import { Constant } from '../models/constant.enum';
import { DataHelperService} from '../data-helper.service'

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  allImages: Array<Gallery> = [];
  newImage: any;
  imageUrl: any;
  loading: boolean = false;

  constructor(public service:DataHelperService) {
    service.getObservable().subscribe(data => {
      if (data.allImagesFetched) {
        this.allImages = service.allImages;
      } 
    });
  }

  ngOnInit() {
  }

  copyUrl(index) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.allImages[index].imageUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    alert(Constant.LINK_COPY);
  }


  onChangeFile(event: EventTarget) {
    let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
    let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
    let files: FileList = target.files;
    this.newImage = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }


  uploadImage() {
    var self = this;
    self.loading = true;
    let storageRef = firebase.storage().ref();
    var metadata = {
      contentType: Constant.CONTENT_TYPE
    };
    const filename = Math.floor(Date.now() / 1000);
    storageRef.child(Constant.GALLERY_IMAGES + filename).put(self.newImage, metadata)
      .on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              self.updateData(downloadURL);
            })
            .catch((e) => {
              console.log(e.message);
              self.loading = false;
            })
        });
  }


  updateData(downloadURL) {
    var self = this;
    var postKey = firebase.database().ref().child(Constant._GALLERY_NODE).push().key;
    var updates = {};
    var temp = {
      imageUrl: downloadURL,
      uid: localStorage.getItem('uid'),
      timestamp: Number(new Date())
    }
    updates[Constant.GALLERY_NODE + postKey] = temp;
    firebase.database().ref().update(updates).then(() => {
      self.allImages.unshift(self.imageUrl);
      self.loading = false;
    })
  }

}
