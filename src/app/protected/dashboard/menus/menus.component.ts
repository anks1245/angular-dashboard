import { Component, inject, OnInit } from '@angular/core';
import { MenusService } from '../../../services/menus.service';
import { Menu } from '../../../models/menus';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-menus',
  imports: [TableModule, ButtonModule],
  templateUrl: './menus.component.html',
  styleUrl: './menus.component.scss'
})
export class MenusComponent implements OnInit{
  menuService = inject(MenusService);
  menu!: Menu[];
  loading = true

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next:(menu)=>{
        // this.menu = data
        this.loading = false
        console.log(menu);
        this.menu = menu
        
      },
      error:(error)=>{
        this.loading = false
        console.log(error)
      }
    })
  }
  
}
