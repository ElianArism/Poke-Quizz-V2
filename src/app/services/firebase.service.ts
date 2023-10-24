import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app!: FirebaseApp;
  private db!: Firestore;

  constructor() {
    this.connectWithFirestore();
  }

  private connectWithFirestore() {
    // TODO: set this config as env vars
    this.app = initializeApp({
      apiKey: 'AIzaSyBw9ZrUIk7UUGWUpkHzH2c-LUQHQbkXsaA',
      authDomain: 'pokequizz-v2.firebaseapp.com',
      projectId: 'pokequizz-v2',
      storageBucket: 'pokequizz-v2.appspot.com',
      messagingSenderId: '482917161107',
      appId: '1:482917161107:web:9961beefadd15c925ad566',
    });

    this.db = getFirestore(this.app);
    // Continue from here
    // https://firebase.google.com/docs/firestore/query-data/get-data
  }
}
