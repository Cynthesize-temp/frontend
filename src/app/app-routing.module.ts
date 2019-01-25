import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { extract } from './core';
import { CallbackComponent } from './callback/callback.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'home', redirectTo: '/idea/feed', pathMatch: 'full' },
    { path: 'idea', loadChildren: 'app/idea/idea.module#IdeaModule' },
    { path: 'user', loadChildren: 'app/profile/profile.module#ProfileModule' },
    { path: 'project', loadChildren: 'app/project/project.module#ProjectModule' }
  ]),
  { path: 'callback', component: CallbackComponent },
  // Fallback when no prior route is matched
  { path: 'not-found', component: NotFoundComponent, data: { title: extract('Page not found! :(') } },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
