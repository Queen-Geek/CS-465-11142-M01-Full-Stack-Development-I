import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})

export class AddTripComponent implements OnInit {
  addForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });
    console.log('Form initialized:', this.addForm);
  }
  public onSubmit() {
    console.log('Form submit initiated'); // Log to ensure the function is being called
    this.submitted = true;

    if (this.addForm.valid) {
      console.log('Form is valid, submitting:', this.addForm.value);
      this.tripService.addTrip(this.addForm.value)
        .subscribe({
          next: (data: any) => {
            console.log('Trip added successfully:', data); // Log success
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.error('Error adding trip:', error); // Log error
          }
        });
    } else {
      console.warn('Form is invalid');
    }
  }
  // get the form short name to access the form fields
  get f() { return this.addForm.controls; }
}
