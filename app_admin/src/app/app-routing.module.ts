import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

const routes: Routes = [
  { path: '', component: TripListingComponent }, // Default route
  { path: 'add-trip', component: AddTripComponent }, // Add Trip route
    { path: 'edit-trip/:code', component: EditTripComponent } // Edit Trip route
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }