import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { Router } from '@angular/router';
import { GlobalService } from '../../../core/services/global.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  pagesNumber: number = 0;
  currentPage: number = 1;
  totalPages: number = 0;
  searchedUser: User;

  constructor(
    private cd: ChangeDetectorRef,
    private _userService: UserService,
    private _router: Router,
    private _globalService: GlobalService
  ) {
    this.searchedUser = new User();
  }

  ngOnInit() {
    this.cd.markForCheck();
    this.getData(this.currentPage);
  }

  getData(pageNumber: number) {
    this._userService.getUsersList(pageNumber).subscribe((resp) => {
      this.users = resp.data;
      this.pagesNumber = resp.total_pages;
      this.currentPage = resp.page;
      this.totalPages = resp.total_pages;
      this.cd.markForCheck();
    });
  }
  showDetails(id: number): void {
    this._router.navigate(['/user_details'], {
      queryParams: { id: id },
    });
  }
  nextPage() {
    if (this.currentPage == this.totalPages) return;
    this.getData(this.currentPage + 1);
  }
  previousPage() {
    if (this.currentPage == 1) return;
    this.getData(this.currentPage - 1);
  }

  searchUserById(event: any) {
    let userId = event.target.value;

    if (!userId) return;

    this._userService.getUserDetails(userId).subscribe(
      (resp) => {
        this.searchedUser = resp.data;

        let newUsers: User[] = [this.searchedUser];

        this.users = newUsers;

        this.cd.markForCheck();
      },
      (error) => {
        this._globalService.toastrError("This user doesn't exist, ");
      }
    );
  }

  refresPage() {
    this.getData(this.currentPage);
  }
}
