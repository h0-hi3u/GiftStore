import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { environment } from 'src/environment/environment';
import { Storage, ref, uploadBytesResumable, getDownloadURL} from '@angular/fire/storage';

@Component({
  selector: 'app-test-firebase',
  templateUrl: './test-firebase.component.html',
  styleUrls: ['./test-firebase.component.scss']
})
export class TestFirebaseComponent {
  public file: any = {};
  // app = initializeApp(environment.firebaseConfig);
  // db = getFirestore(this.app);
  constructor (public storage: Storage){}
  chooseFile(event: any) {
    this.file = event.target.files[0];
  }
  addData() {
    const storageRef = ref(this.storage, 'image/' + this.file.name);
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.log(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at ', downloadURL);
        })
      },
    )
  }
}
