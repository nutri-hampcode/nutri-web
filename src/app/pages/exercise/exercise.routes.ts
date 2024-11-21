import { Routes } from "@angular/router";
import { ExerciseLayoutComponent } from "./layout/layout.component";
import { ExerciseShowComponent } from "./exercise-user/exercise-show/exercise-show.component";
import { ExerciseDetailComponent } from "./exercise-user/exercise-tip-show/exercise-tip-show.component";

export const exerciseRoutes:Routes = [
    {
        path: '',
        component: ExerciseLayoutComponent,
        children: [
            {path: "all", component: ExerciseShowComponent},
            {path: ':id', component: ExerciseDetailComponent}
        ]
    }
];