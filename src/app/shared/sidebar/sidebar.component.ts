import { Component, OnInit } from '@angular/core';

// SErvicios
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor(private sidebarComponent: SidebarService) {
    this.menuItems = sidebarComponent.menu;
    console.log(this.menuItems);
  }

  ngOnInit(): void {
  }

}
