import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { AppHeaderComponent } from '../../components/app-header/app-header.component';
import { AppSidebarComponent } from "../../components/app-sidebar/app-sidebar.component";
import { SidebarService } from '../../shared/sidebar.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, SidebarModule, AppHeaderComponent, AppSidebarComponent, CommonModule],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  sidebarService = inject(SidebarService)
  visible = !(window.innerWidth <= 768);
  ngOnInit(): void {
    this.sidebarService.sidebarVisible$.subscribe(v=>{
      console.log(v);
      this.visible = v;
    })
  }

  
}
