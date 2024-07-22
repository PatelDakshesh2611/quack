import { Component } from '@angular/core';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [UserDetailsComponent, CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  isUserDetailsModalOpen = false;

  openUserDetailsModal() {
    this.isUserDetailsModalOpen = true;
  }

  handleCloseUserDetailsModal(isOpen: boolean) {
    this.isUserDetailsModalOpen = isOpen;
  }

}
