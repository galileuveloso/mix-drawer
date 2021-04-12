import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SorteioRoutes } from "./sorteio";
import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo : '/sorteio/sortear',
        pathMatch: 'full'
    },
    ...SorteioRoutes
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class appRoutingModule{

}

