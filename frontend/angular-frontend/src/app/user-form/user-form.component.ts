import { Component, OnInit } from '@angular/core';
import { DataService, User, NewUser } from '../data.service';
import { Observable, BehaviorSubject, switchMap, catchError, of, tap, finalize } from 'rxjs';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  users$: Observable<User[]>;
  loading = false;
  error: string | null = null;
  private refreshUsers$ = new BehaviorSubject<void>(undefined);

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      edad: [null, [Validators.required, Validators.min(1)]]
    });

    this.users$ = this.refreshUsers$.pipe(
      tap(() => this.loading = true),
      switchMap(() => this.dataService.getData().pipe(
        catchError(error => {
          this.error = error;
          return of([]);
        }),
        finalize(() => this.loading = false)
      ))
    );
  }

  ngOnInit(): void {
    this.refreshUsers$.next();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.loading = true;
      this.error = null;

      const newUser: NewUser = this.userForm.value;

      this.dataService.addUser(newUser).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => {
          this.userForm.reset();
          this.refreshUsers$.next();
        },
        error: (error) => {
          this.error = error;
        }
      });
    }
  }

  deleteUser(id: number): void {
    if (!this.loading) {
      this.loading = true;
      this.error = null;

      this.dataService.deleteUser(id).pipe(
        finalize(() => this.loading = false)
      ).subscribe({
        next: () => {
          this.refreshUsers$.next();
        },
        error: (error) => {
          this.error = error;
        }
      });
    }
  }

  get nombreControl() { return this.userForm.get('nombre'); }
  get correoControl() { return this.userForm.get('correo'); }
  get edadControl() { return this.userForm.get('edad'); }
}

