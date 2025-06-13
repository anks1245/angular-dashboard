import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { AppSidebarComponent } from "../../components/app-sidebar/app-sidebar.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, SidebarModule, AppHeaderComponent, AppSidebarComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
