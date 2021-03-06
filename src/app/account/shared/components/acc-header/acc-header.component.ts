import { Component, OnInit, OnDestroy } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from '../../../../shared/models/user.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acc-header',
  templateUrl: './acc-header.component.html',
  styleUrls: ['./acc-header.component.scss']
})
export class AccHeaderComponent implements OnInit, OnDestroy {
    id: number;
    currentUser: User;

    currentUserSubscription: Subscription;

  constructor(
        private router: Router,
        private authService: AuthService,
    ) {
        // this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/index']);
    }

    ngOnInit() {
        let user: any = localStorage.getItem('entity');
        user = JSON.parse(user);
        this.id = user.id;
    }
    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    // deleteUser(id: number) {
    //     this.userService.delete(id).pipe(first()).subscribe(() => {
    //         this.loadAllUsers();
    //     });
    // }

    // private loadAllUsers() {
    //     this.userService.getAll().pipe(first()).subscribe(users => {
    //         this.users = users;
    //     });
    // }

}
