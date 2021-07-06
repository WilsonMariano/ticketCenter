import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  private dbpath: string = 'carousel';
  public carouselRef: AngularFirestoreCollection;

  constructor(private db: AngularFirestore) {
    this.carouselRef = db.collection(this.dbpath);
   }

  public getAll(): any {
    return this.carouselRef.valueChanges();
  }

  public edit(carousel: any): Promise<any> {
    return this.db.collection(this.dbpath, ref => ref.limit(1))
    .get()  
    .toPromise()
    .then(snapshot => {
      snapshot.forEach(document => 
        document.ref.update({ ...carousel }));
    });
  }
}
