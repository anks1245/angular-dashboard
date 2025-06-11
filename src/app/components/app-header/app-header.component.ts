import { Component, inject } from '@angular/core';
import { SidebarService } from '../../shared/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent {
  sidebarService = inject(SidebarService)
  toggleSidebar(){
    this.sidebarService.toggleSidebar();
  }
}
