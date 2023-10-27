import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register-trainer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-trainer.component.html',
  styleUrls: ['./register-trainer.component.scss'],
})
export class RegisterTrainerComponent {
  private readonly firestoreService: FirebaseService = inject(FirebaseService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  readonly router: Router = inject(Router);

  registerForm!: FormGroup<{
    trainerName: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor() {
    const validators = [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ];

    this.registerForm = this.fb.nonNullable.group({
      trainerName: ['', validators],
      password: ['', validators],
    });
  }

  async registerTrainer(): Promise<void> {
    try {
      if (this.registerForm.touched && !this.registerForm.invalid) return;

      const { password, trainerName } = this.registerForm.getRawValue();
      this.registerForm.get('password')?.getError('required');
      console.log('hola');
      await this.firestoreService.saveTrainer({
        trainerName,
        password,
        score: 0,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
