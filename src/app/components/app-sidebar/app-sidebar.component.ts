import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../shared/sidebar.service';
import { NgClass } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-sidebar',
  imports: [NgClass, ConfirmDialog, ToastModule],
  templateUrl: './app-sidebar.component.html',
  styleUrl: './app-sidebar.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class AppSidebarComponent {
  router = inject(Router)
  sidebarService = inject(SidebarService)
  visible = true
  currentRoute = '';
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService){
    this.sidebarService.sidebarVisible$.subscribe(v=>{
      this.visible = v;
    })
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }
  navigate(route: string): void {
    this.router.navigate(["dashboard/"+route]);
  }
  isActive(path: string): boolean {
    return this.currentRoute.includes(path);
  }

  confirmLogout(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Logout',
            },
            accept: () => {
                // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
                localStorage.clear()
                this.router.navigate(["/"])
            },
            reject: () => {
                // this.messageService.add({
                //     severity: 'error',
                //     summary: 'Rejected',
                //     detail: 'You have rejected',
                //     life: 3000,
                // });
            },
        });
    }
  logout(){
    localStorage.clear()
    this.router.navigate(["/"])
  }
}
