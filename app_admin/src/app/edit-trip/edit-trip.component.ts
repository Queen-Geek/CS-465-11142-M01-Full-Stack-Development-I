import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {
  editForm!: FormGroup;
  submitted = false;
  tripCode: string | null = null; // Declare tripCode property

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,  // Inject ActivatedRoute
    private tripService: TripDataService 
  ) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    console.log('Edit Form initialized:', this.editForm);

    // Get the trip code from the route parameters
    this.tripCode = this.route.snapshot.paramMap.get('code');
    if (this.tripCode) {
      this.loadTripData(this.tripCode); // Load the trip data using the code
    }
  }

  loadTripData(tripCode: string): void {
    this.tripService.getTrip(tripCode).subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          console.log('Trip data retrieved:', data[0]);
          this.editForm.patchValue(data[0]); // Use the first item from the array
        } else {
          console.error('No trip found with code:', tripCode);
        }
      },
      error: (error: any) => {
        console.error('Error fetching trip:', error);
      }
    });
  }

  public onSubmit() {
    console.log('Form submit initiated');
    this.submitted = true;

    if (this.editForm.valid) {
      console.log('Form is valid, submitting:', this.editForm.value);
      this.tripService.updateTrip(this.editForm.value)
        .subscribe({
          next: (data: any) => {
            console.log('Trip updated successfully:', data);
            this.router.navigate(['']); // Adjust the route as needed
          },
          error: (error: any) => {
            console.error('Error updating trip:', error);
          }
        });
    } else {
      console.warn('Form is invalid');
    }
  }

  // Getter for form controls
  get f() { return this.editForm.controls; }
}
