import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './view/home/home.component';
import { AddProviderComponent } from './view/home/add-provider/add-provider.component';
import { CreateCsvComponent } from './view/home/create-csv/create-csv.component';
import { ListComponent } from './view/home/list/list.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { PlaceProviderBeforeComponent } from './view/home/list/place-provider-before/place-provider-before.component';
import { PlaceProviderAfterComponent } from './view/home/list/place-provider-after/place-provider-after.component';
import { ProvidersComponent } from './view/home/list/providers/providers.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { EditProviderComponent } from './view/home/list/edit-provider/edit-provider.component';
import { DeleteProviderComponent } from './view/home/list/delete-provider/delete-provider.component';
import { NewProviderComponent } from './view/new-provider/new-provider.component';
import { InputComponent } from './shared/components/input/input.component';
import { EditComponent } from './view/edit/edit.component';
import { CorrespondenceComponent } from './shared/components/correspondence/correspondence.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddProviderComponent,
    CreateCsvComponent,
    ListComponent,
    ButtonComponent,
    PlaceProviderBeforeComponent,
    PlaceProviderAfterComponent,
    ProvidersComponent,
    EditProviderComponent,
    DeleteProviderComponent,
    NewProviderComponent,
    InputComponent,
    EditComponent,
    CorrespondenceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path:'', component: HomeComponent },
      { path:'new', component: NewProviderComponent },
      { path:'edit', component: EditComponent},
      { path:'new/correspondence', component: CorrespondenceComponent },
      { path:'edit/correspondence', component: CorrespondenceComponent },
    ]),
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
