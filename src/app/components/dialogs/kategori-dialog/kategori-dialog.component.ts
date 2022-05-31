import { FormBuilder, FormGroup } from '@angular/forms';
import { kategori } from './../../../models/kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';






@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {

dialogBaslik:string;
islem:string;
frm:FormGroup;
yeniKayit:kategori;

  constructor(
    public ApiService:ApiService,
    public MatDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<KategoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
    
  ) {
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik="Kategori Ekle";
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik="Kategori Düzenle";
    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      katId:[this.yeniKayit.katId],
      katAdi:[this.yeniKayit.katAdi],
    });
  }
}
