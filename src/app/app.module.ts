import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { HaberDialogComponent } from './components/dialogs/haber-dialog/haber-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HaberComponent } from './components/haber/haber.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { AnasayfaComponent } from './components/anasayfa/anasayfa.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AnasayfaComponent,
    MainNavComponent,
    HaberComponent,
    KategoriComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    HaberDialogComponent,
    KategoriDialogComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatSortModule,
    ReactiveFormsModule
  
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    HaberDialogComponent,
    KategoriDialogComponent
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
