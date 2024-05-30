import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  Books: any = [];
  searchTitle: string = '';
  minPrice: number | undefined;
  maxPrice: number | undefined;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res);
      this.Books = res;
    });
  }

  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('Are you sure you want to delete it permanently?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      });
    }
  }

  bookMatches(book: any): boolean {
    if (!this.searchTitle && !this.minPrice && !this.maxPrice) return true;

    let titleMatch = !this.searchTitle || book.title.toLowerCase().includes(this.searchTitle.toLowerCase());
    let priceMatch = (!this.minPrice || book.price >= this.minPrice) && (!this.maxPrice || book.price <= this.maxPrice);

    return titleMatch && priceMatch;
  }
}
