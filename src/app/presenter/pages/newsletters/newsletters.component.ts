import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  contentChild,
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { NewslettersService } from '../../../core/services/newsletters.service';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  INewsletterData,
  INewsletterSubscription,
} from '../../../common/interfaces/service.interface';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubscriptionsService } from '../../../core/services/subscriptions.service';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-newsletters',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
  ],
  providers: [NewslettersService, SubscriptionsService],
  templateUrl: './newsletters.component.html',
  styleUrl: './newsletters.component.scss',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class NewslettersComponent implements AfterViewInit {
  subscriptions!: INewsletterSubscription[];
  columnsToDisplay = ['id', 'title', 'content'];

  newsletterForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    attachment: new FormControl(''),
  });

  newsletters!: MatTableDataSource<INewsletterData>;

  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: any | null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private newslettersService: NewslettersService,
    private subscriptionsService: SubscriptionsService,
    private snackBar: MatSnackBar
  ) {
    this.newsletters = new MatTableDataSource();
  }

  ngAfterViewInit(): void {
    this.getNewsletters();
    this.getSubscriptions();
    this.newsletters.paginator = this.paginator;
    this.newsletters.sort = this.sort;
    this.buildForm();
  }

  buildForm(): void {
    this.newsletterForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      attachment: ['', [Validators.required]],
    });
  }

  getNewsletters() {
    this.newslettersService
      .getNewsletters()
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.error.message, 'Cerrar', {
            duration: 3000,
          });
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.newsletters.data = response;
        }
      });
  }

  getSubscriptions() {
    this.subscriptionsService
      .getActiveSubscribers()
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.error.message, 'Cerrar', {
            duration: 3000,
          });
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.subscriptions = response;
        }
      });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.newsletterForm.patchValue({
      attachment: file,
    });
  }

  submitForm(): void {
    const formData = {
      title: this.newsletterForm.value.title,
      content: this.newsletterForm.value.content,
      assetFile: this.newsletterForm.value.attachment,
    } as INewsletterData;

    this.newslettersService
      .postNewsletter(formData)
      .pipe(
        catchError((error) => {
          this.snackBar.open(error.error.message, 'Cerrar', {
            duration: 3000,
          });
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.snackBar.open(response.message, 'Cerrar', {
            duration: 3000,
          });
          this.newsletterForm.reset();
          this.getNewsletters();
        }
      });
  }

  sendNewsletters(newsletter: number): void {
    const activeSubscriptionIds = this.subscriptions
      .filter((subscription) => subscription.active)
      .map((subscription) => subscription.id);

    if (activeSubscriptionIds) {
      this.newslettersService
        .sendNewsletter({
          // TODO send user id from storage
          user: 1,
          subscribers: activeSubscriptionIds,
          newsletter,
        })
        .pipe(
          catchError((error) => {
            this.snackBar.open(error.error.message, 'Cerrar', {
              duration: 3000,
            });
            return of(null);
          })
        )
        .subscribe((response) => {
          if (response) {
            this.snackBar.open(response.message, 'Cerrar', {
              duration: 3000,
            });
          }
        });
    }
  }

  toggleSubscription(subscription: INewsletterSubscription): void {
    subscription.active = !subscription.active;
  }
}
