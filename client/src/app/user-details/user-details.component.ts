import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent  implements OnInit{

  userDetailsForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.userDetailsForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      preferences: ['', Validators.required]
    });
  }

  @Output() close = new EventEmitter<boolean>();

  closeUserDetailsModal() {
    this.close.emit(false);
  }

  onSubmit(): void {
    if (this.userDetailsForm.valid) {
      console.log(this.userDetailsForm.value);
      this.closeUserDetailsModal();
      this.router.navigate(['/chat']);
    } else {
      this.userDetailsForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
    }
  }

  get name() {
    return this.userDetailsForm.get('name');
  }

  get gender() {
    return this.userDetailsForm.get('gender');
  }

  get preferences() {
    return this.userDetailsForm.get('preferences');
  }

}
