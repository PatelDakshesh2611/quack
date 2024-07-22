import { Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  {path: '', component: HeroComponent},
  {path: 'chat', component: ChatComponent},
  // {path: '', redirectTo: '/home', pathMatch: 'full'}
];
