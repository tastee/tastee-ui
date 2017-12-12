import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TreeComponent } from 'app/components/tree/tree.component';
import { WelcomeComponent } from 'app/components/welcome/welcome.component';
import { ParametersComponent } from 'app/components/parameters/parameters.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent
    },
    {
        path: 'home',
        component: WelcomeComponent
    },
    {
        path: 'files',
        component: TreeComponent
    },
    {
        path: 'parameters',
        component: ParametersComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
