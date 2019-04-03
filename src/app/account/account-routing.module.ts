import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { EventsComponent } from './events/events.component';
import { BoardPageComponent } from './board-page/board-page.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '', component: AccountComponent, children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'profile/settings', component: SettingsComponent },
      { path: 'events', component: EventsComponent },
      { path: 'board', component: BoardPageComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
