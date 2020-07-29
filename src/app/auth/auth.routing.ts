import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

// Components
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)], // Me parece que siempre que sean otro routing que no sean
    exports: [RouterModule], // la principal se pone el RouterModule.forChild(routes) " .forChild "

})

export class AuthRoutingModule {}
