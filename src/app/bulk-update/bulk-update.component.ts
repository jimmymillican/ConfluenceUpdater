import { Component, OnInit } from '@angular/core';
import { ConfluenceService } from '../services/ConfluenceService';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bulk-update',
  standalone: false,
  templateUrl: './bulk-update.component.html',
  styleUrls: ['./bulk-update.component.scss'],
})
export class BulkUpdateComponent implements OnInit {
  pages: any[] = [];
  displayedColumns: string[] = ['title', 'action'];
  bulkInProgress = true; // Flag to indicate if bulk update is in progress // KEEPING THIS DISABLED
  allUpdated = false; // Flag to indicate if all pages are updated
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  nextCursor: string = '';
  prevCursor: string = '';

  constructor(private confluenceService: ConfluenceService) {}


  ngOnInit(): void {
    this.loadPages();
  }

  loadPages(cursor: string = ''): void {
    this.confluenceService.fetchPages(this.pageSize, cursor).subscribe(
      (data) => {
        console.log('API Response:', data); // Log the entire response
        this.pages =
          data?.results?.map((page: any) => ({
            ...page,
            newTitle: page.title,
            isUpdating: false, // Track if this page is being updated
            isUpdated: false, // Track if this page is updated
          })) || [];
          this.nextCursor = this.extractCursor(data._links?.next) || ''; // Extract the next cursor
          this.prevCursor = this.extractCursor(data._links?.prev) || ''; // Extract the previous cursor
      },
      (err) => console.error('Error fetching pages:', err)
    );
  }
  extractCursor(link: string): string {
    if (!link) return '';
    const url = new URL(link, window.location.origin); // Use window.location.origin as the base URL
    return url.searchParams.get('cursor') || '';
  }

  updateTitle(page: any): void {
    page.isUpdating = true; // Start the updating process for this page
    this.confluenceService
      .updatePageTitle(page.id, page.newTitle, page.version.number, page.body.storage.value)
      .subscribe(
        () => {
          page.isUpdating = false; // Mark as not updating
          page.isUpdated = true; // Mark as updated
        },
        (err) => {
          page.isUpdating = false; // Mark as not updating
          console.error(`Error updating page ${page.id}:`, err);
        }
      );
  }

  goToNextPage(): void {
    if (this.nextCursor) {
      this.loadPages(this.nextCursor);
    }
  }

  
  goToPreviousPage(): void {
    if (this.prevCursor) {
      this.loadPages(this.prevCursor);
    }
  }


  bulkUpdate() {
    this.bulkInProgress = true; // Mark bulk update as in progress
    const updates = this.pages.map((page) => {
      if (page.title !== page.newTitle) {
        return this.confluenceService
          .updatePageTitle(
            page.id,
            page.newTitle,
            page.version.number,
            page.body.storage.value
          )
          .toPromise()
          .then(() => {
            page.isUpdated = true; // Mark as updated
          })
          .catch((err) => {
            console.error(`Error updating page ${page.id}:`, err);
          });
      }
      return Promise.resolve(); // Skip update for pages with unchanged titles
    });

    Promise.all(updates).then(() => {
      this.bulkInProgress = false; // Mark bulk update as complete
      this.allUpdated = true; // Indicate all updates are done
    });
  }
}
