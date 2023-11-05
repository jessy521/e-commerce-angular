import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  constructor(private storeService: StoreService) {}

  @Output() showCategory = new EventEmitter<String>();

  categoriesSubscription: Subscription | undefined;
  categories: String[] = [];

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((_categories) => (this.categories = _categories));
  }

  onShowCategory(category: String): void {
    this.showCategory.emit(category);
  }
  ngOnDestroy(): void {
    this.categoriesSubscription?.unsubscribe();
  }
}
