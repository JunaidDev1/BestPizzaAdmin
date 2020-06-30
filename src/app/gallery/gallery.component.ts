import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Gallery } from '../models/gallery';
import { Constant } from '../models/constant.enum';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  allImages: Array<Gallery>;
  newImage: any;
  imageUrl: any;
  loading: boolean = false;

  constructor() {
    this.getAllImages();
  }

  ngOnInit() {
  }


  getAllImages() {
    var self = this;
    self.loading = true;
    firebase.database().ref().child('gallery')
      .orderByChild('uid').equalTo('xqI3oZ7q3AYFyYZA8NRPrjqvGGE2')
      .once('value', (snapshot) => {
        var data = snapshot.val();
        for (var key in data) {
          var temp = data[key];
          temp.key = key;
          self.allImages.push(temp);
        }
        self.loading = false;
      })
      .catch((e) => {
        console.log(e.message);
        self.loading = false;
      })
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
      contentType: 'image/jpeg/png'
    };
    const filename = Math.floor(Date.now() / 1000);
    storageRef.child('galleryImages/' + filename).put(self.newImage, metadata)
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
    var postKey = firebase.database().ref().child('gallery').push().key;
    var updates = {};
    var temp = {
      imageUrl: downloadURL,
      uid: 'xqI3oZ7q3AYFyYZA8NRPrjqvGGE2',
      timestamp: Number(new Date())
    }
    updates['/gallery/' + postKey] = temp;
    firebase.database().ref().update(updates).then(() => {
      self.allImages.unshift(self.imageUrl);
      self.loading = false;
    })
  }

}
