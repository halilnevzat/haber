import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../services/myAlert.service';
import { AlertDialogComponent } from './../dialogs/alert-dialog/alert-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { haber } from './../../models/haber';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { HaberDialogComponent } from '../dialogs/haber-dialog/haber-dialog.component';



@Component({
  selector: 'app-haber',
  templateUrl: './haber.component.html',
  styleUrls: ['./haber.component.css']
})
export class HaberComponent implements OnInit {
  
  haberler:haber[];
  displayedColumns = ['haberId','haberBaslik','haberKatId','haberKatAdi','haberIcerik','haberGorsel','islemler'];
  dataSource:any;  
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort; set matSort(sort: MatSort) {
    this.dataSource.sort = sort;  
}
dialogRef : MatDialogRef<HaberDialogComponent>;
ConfirmDialogRef : MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }
 
  ngOnInit() {
   this.HaberListele();
  }
  HaberListele(){
    this.apiServis.HaberListe().subscribe((d:haber[]) =>{
      this.haberler = d;
      //console.log(d);
    this.dataSource=new MatTableDataSource(this.haberler);   
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
  var yeniKayit:haber=new haber();  
  this.dialogRef=this.matDialog.open(HaberDialogComponent,{
    width:"400px",
    data:{
      kayit:yeniKayit,
      islem:'ekle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if(d){    
    this.apiServis.HaberEkle(d).subscribe((s:Sonuc)=>{
      this.alert.AlertUygular(s);
      if(s.islem){
        this.HaberListele();

      }
    });
  }
  });
}
Duzenle(kayit:haber){
  this.dialogRef=this.matDialog.open(HaberDialogComponent,{
    width:"400px",
    data:{
      kayit:kayit,
      islem:'duzenle'
    }
  });
  this.dialogRef.afterClosed().subscribe(d=>{
    if (d){
    kayit.haberBaslik =d.haberBaslik;
    kayit.haberIcerik =d.haberIcerik;
    kayit.haberGorsel =d.haberGorsel;
    kayit.haberKatId =d.haberKatId;
    this.apiServis.HaberDuzenle(kayit).subscribe((s:Sonuc)=>{
      this.alert.AlertUygular(s);
    })
  }
  });
}
Sil(kayit:haber){
this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
  width:'500px'
});
this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.haberBaslik +" başlıklı ve " + kayit.haberId + " IDli " + "haber silinecektir onaylıyor musunuz ?"
this.ConfirmDialogRef.afterClosed().subscribe(d=> {
  if(d){
    this.apiServis.HaberSil(kayit.haberId).subscribe((s:Sonuc)=>{
      this.alert.AlertUygular(s);
      if (s.islem){
        this.HaberListele();
      }
    });
  }
});
}

}
