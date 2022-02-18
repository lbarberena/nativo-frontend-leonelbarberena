import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ZipCodesComponent } from './components/zip-codes/zip-codes.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'zip-code', component: ZipCodesComponent },
  { path: '**', redirectTo: 'home' },
  { path: '', redirectTo: 'home', pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
