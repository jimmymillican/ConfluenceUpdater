import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss'] // or .css depending on your choice
})
export class AppComponent {
  title = 'Confluence Updater';

  
  ngOnInit(): void {
  }



}