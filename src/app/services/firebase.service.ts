import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  CollectionReference,
  DocumentData,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ITrainer } from '../interfaces/trainer.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app!: FirebaseApp;
  private collection!: CollectionReference<DocumentData, DocumentData>;

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

    const db = getFirestore(this.app);
    this.collection = collection(db, 'trainers');

    // Continue from here
    // https://firebase.google.com/docs/firestore/query-data/get-data
  }

  async saveTrainer(trainer: {
    trainerName: string;
    imgLogo?: string;
    password: string;
    score: number;
  }) {
    try {
      const trainerDoc = await this.getTrainerByUsername(trainer.trainerName);
      if (trainerDoc.exists()) {
        return;
      }
      await setDoc(doc(this.collection), trainer);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }

  async updateTrainer(username: string, trainer: Partial<ITrainer>) {
    try {
      const trainerDoc = await this.getTrainerByUsername(username);
      await updateDoc(trainerDoc.ref, trainer);
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }

  async getTrainerByUsername(username: string): Promise<any> {
    try {
      const trainerQuery = query(
        this.collection,
        where('trainerName', '==', username)
      );

      const queryResults = await getDocs(trainerQuery);

      if (!queryResults.docs[0]?.exists()) {
        throw new Error('Trainer does not exist');
      }

      return queryResults.docs[0];
    } catch (error: any) {
      throw new Error(error?.message);
    }
  }
}
