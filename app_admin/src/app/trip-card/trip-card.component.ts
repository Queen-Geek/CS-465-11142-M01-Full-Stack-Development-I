import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})


export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  editTrip(tripCode: string) {
    this.router.navigate(['/edit-trip', tripCode]); // Navigates to /edit-trip/:code
  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }
}