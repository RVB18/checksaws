import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChequeslistComponent } from './chequeslist/chequeslist.component';
import { VendorComponent } from './vendor/vendor.component';
import { VendorchecksdetailsComponent } from './vendorchecksdetails/vendorchecksdetails.component';
import { SinglechequeprintComponent } from './singlechequeprint/singlechequeprint.component';
import { MulticheckComponent } from './multicheck/multicheck.component';
import { Multicheck2Component } from './multicheck2/multicheck2.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TableviewComponent } from './tableview/tableview.component';
import { UserComponent } from './user/user.component'
import { AdduserComponent } from './adduser/adduser.component'
import { EdituserComponent } from './edituser/edituser.component'

import { SettingsComponent } from './settings/settings.component';
//
const routes: Routes = [
  {path:'cheques',component:ChequeslistComponent},
{path:'vendor',component:VendorComponent},
{path:'vendorcheckdetails/:name',component:VendorchecksdetailsComponent},
{path:'singlecheck/:data',component:SinglechequeprintComponent},
{path:'multicheck',component:MulticheckComponent},
{path:'multicheck2',component:Multicheck2Component},
{path:'',component:LoginComponent},
{path:'signup',component:SignupComponent},
{path:'login',component:LoginComponent},
{path:'quickbooks',component:Multicheck2Component},
{path:'user',component:UserComponent},
{path:'adduser',component:AdduserComponent},
{path:'edituser',component:EdituserComponent},

{path:'settings',component:SettingsComponent},
{path:'tableview',component:TableviewComponent}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
