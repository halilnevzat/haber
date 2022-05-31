import { kategori } from './../../models/kategori';
import { KategoriDialogComponent } from './../dialogs/kategori-dialog/kategori-dialog.component';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { AlertDialogComponent } from './../dialogs/alert-dialog/alert-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


import { HaberDialogComponent } from '../dialogs/haber-dialog/haber-dialog.component';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  kategoriler:kategori[];
  displayedColumns = ['katId','katAdi','katHaberSay','islemler'];
  dataSource:any;  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort; set matSort(sort: MatSort) {
    this.dataSource.sort = sort;  
}
dialogRef : MatDialogRef<KategoriDialogComponent>;
ConfirmDialogRef : MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
    
  ) { }

  ngOnInit() {
    this.KategoriListele();
    
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:kategori[]) =>{
      this.kategoriler = d;
      //console.log(d);
    this.dataSource=new MatTableDataSource(this.kategoriler);   
    this.dataSource.sort=this.sort;
    this.dataSource.paginator = this.paginator; 

  });
}

Filtrele(e){
  var deger=e.target.value;
  this.dataSource.filter=deger.trim().toLowerCase();
  if(this.dataSource.paginator){
    this.dataSource.paginator.firstPage();
  }
}

Ekle(){
  var yeniKayit:kategori=new kategori();  
  this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
    width:"400px",
    data:{
      kayit:yeniKayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){    
    this.apiServis.KategoriEkle(d).subscribe((s:Sonuc)=>{
      this.alert.AlertUygular(s);
      if(s.islem){
        this.KategoriListele();

      }
    });
  }
  });
}
Duzenle(kayit:kategori){
  this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
    width:"400px",
    data:{
      kayit:kayit,
      islem:'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    kayit.katId =d.katId;
    kayit.katAdi =d.katAdi;
    this.apiServis.KategoriDuzenle(kayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygular(s);
    })
  }
  });
}
Sil(kayit:kategori){
this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
  width:'500px'
});
this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.katAdi + " isimli kategori silinecektir onaylıyor musunuz ?"
this.ConfirmDialogRef.afterClosed().subscribe(d=> {
  if(d){
    this.apiServis.KategoriSil(kayit.katId).subscribe((s:Sonuc)=>{
      this.alert.AlertUygular(s);
      if (s.islem){
        this.KategoriListele();
      }
    });
  }
});
}


}
