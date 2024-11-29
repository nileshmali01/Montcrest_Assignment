import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    country: '',
    state: '',
    city: ''
  };

  countries = ['USA', 'Canada', 'India'];
  states = [];
  cities = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  onCountryChange() {
    // Fetch states based on country
    this.apiService.getStates(this.user.country).subscribe((states) => {
      this.states = states;
      this.cities = [];
      this.user.state = '';
      this.user.city = '';
    });
  }

  onStateChange() {
    // Fetch cities based on selected state
    this.apiService.getCities(this.user.state).subscribe((cities) => {
      this.cities = cities;
      this.user.city = '';
    });
  }

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.apiService.registerUser(this.user).subscribe((response) => {
      if (response.success) {
        alert('Registration successful!');
      } else {
        alert('Registration failed');
      }
    });
  }
}
