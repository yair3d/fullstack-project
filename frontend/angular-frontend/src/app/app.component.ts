import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div class="container">
        <a class="navbar-brand" href="#">User Management System</a>
      </div>
    </nav>
    <div class="container">
      <app-user-form></app-user-form>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  styles: []
})
export class AppComponent {
  title = 'User Management System';
}

