import { KategoriComponent } from './components/kategori/kategori.component';
import { HaberComponent } from './components/haber/haber.component';
import { AnasayfaComponent } from './components/anasayfa/anasayfa.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path :'',
  component:AnasayfaComponent
},
{
  path :'haber',
  component:HaberComponent
},
{
  path :'kategori',
  component:KategoriComponent
}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
