import { SortearComponent } from "./sortear";
import { Routes } from "@angular/router";

export const SorteioRoutes: Routes = [
    {
        path: 'sorteio',
        redirectTo: 'sorteio/sortear'
    },
    {
        path: 'sorteio/sortear',
        component: SortearComponent
    }
]