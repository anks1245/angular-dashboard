import { ChartModule } from 'primeng/chart'
import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RecentOrders } from '../../../models/recent_orders';
import { OrdersService } from '../../../services/orders.service';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-home',
  imports: [CommonModule ,ChartModule, ChipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    basicData: any;

    basicOptions: any;

    platformId = inject(PLATFORM_ID);

    recentOrders!: RecentOrders[];
    loadingRecentOrder = true;

    orderService = inject(OrdersService);

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.initChart();
        this.orderService.getRecentOrders().subscribe({
          next:(data)=>{
            console.log(data);
            
            this.recentOrders = data
            this.loadingRecentOrder = false
          },
          error:(err)=>{
            console.error("Error",err);
            this.loadingRecentOrder = false
          }
        })
    }

    initChart() {
        if (isPlatformBrowser(this.platformId)) {
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--p-text-color');
            const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
            const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

            this.basicData = {
                labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thurs', 'Fri', 'Sat'],
                datasets: [
                    {
                        label: 'Orders',
                        data: [40, 25, 27, 20, 10, 55, 30],
                        // backgroundColor: [
                        //     'rgba(249, 115, 22, 0.2)',
                        //     'rgba(6, 182, 212, 0.2)',
                        //     'rgb(107, 114, 128, 0.2)',
                        //     'rgba(139, 92, 246, 0.2)',
                        // ],
                        // borderColor: ['rgb(249, 115, 22)', 'rgb(6, 182, 212)', 'rgb(107, 114, 128)', 'rgb(139, 92, 246)'],
                        // borderWidth: 1,
                    },
                ],
            };

            this.basicOptions = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: textColorSecondary,
                        },
                        grid: {
                            color: surfaceBorder,
                        },
                    },
                },
            };
            this.cd.markForCheck()
        }
    }
}
