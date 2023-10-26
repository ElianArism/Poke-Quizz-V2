import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private firebaseService: FirebaseService = inject(FirebaseService);
  showRegisterTrainerComponent: boolean = false;
  constructor() {}

  ngOnInit(): void {
    console.log('On init!');
  }

  showRegisterTrainer() {
    this.showRegisterTrainerComponent = true;
  }
}
