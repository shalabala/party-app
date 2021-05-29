import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, CollectionReference, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Party } from '../shared/model/party.model';

const party="party"
@Injectable({
  providedIn: 'root'
})
export class PartyService {
  cRef: AngularFirestoreCollection<Party>
  constructor(private firestore: AngularFirestore) {
    this.cRef=firestore.collection(party)
  }

  getById(id: string): Observable<Party>{
    return this.cRef.doc(id).valueChanges()
  }

  set(p: Party): Promise<void>{
    return this.cRef.doc(p.id).set(p)
  }

  update(p: Party): Promise<void>{
    return this.cRef.doc(p.id).update(p)
  }

  getAllForCompany(companyId: string): Observable<Party[]>{
    return this.firestore.collection(party,ref=>{
      return ref.where("href","==",companyId)
    }).valueChanges() as Observable<Party[]>
  }

  delete(p: Party){
    return this.cRef.doc(p.id).delete()
  }

  
}
