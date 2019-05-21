import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UnauthorisedComponent } from './shared/unauthorized/unauthorized.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'add', loadChildren: 'app/add/add.module#AddModule' },
    { path: 'view', loadChildren: 'app/view/view.module#ViewModule' },
    { path: 'user', loadChildren: 'app/profile/profile.module#ProfileModule' },
    { path: 'not-found', component: NotFoundComponent, data: { title: 'Page not found! :(' } },
    { path: 'unauthorized', component: UnauthorisedComponent, data: { title: 'Unauthorised Access' } }
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
