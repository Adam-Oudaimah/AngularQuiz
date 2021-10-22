import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  id: number = 0;
  loading: boolean = true;
  constructor(
    private cd: ChangeDetectorRef,
    private _userService: UserService,
    private activateRouter: ActivatedRoute,
    private _location: Location
  ) {
    // Initialization inside the constructor
    this.user = new User();
  }

  ngOnInit() {
    this.loading = true;
    this.activateRouter.queryParams.subscribe((params) => {
      this.id = +params['id'] || 0;
    });

    this._userService.getUserDetails(this.id).subscribe((resp) => {
      this.user = resp.data;
      this.loading = false;
      this.cd.markForCheck();
    });
  }

  backClicked() {
    this._location.back();
  }
}
