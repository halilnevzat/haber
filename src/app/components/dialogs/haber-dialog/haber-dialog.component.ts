import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { haber } from 'src/app/models/haber';

@Component({
  selector: 'app-haber-dialog',
  templateUrl: './haber-dialog.component.html',
  styleUrls: ['./haber-dialog.component.css']
})
export class HaberDialogComponent implements OnInit {
dialogBaslik:string;
islem:string;
frm:FormGroup;
yeniKayit:haber;
  constructor(
    public ApiService:ApiService,
    public MatDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<HaberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) {
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem=='ekle'){
      this.dialogBaslik="Haber Ekle";
    }
    if(this.islem=='duzenle'){
      this.dialogBaslik="Haber Düzenle";
    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      haberId:[this.yeniKayit.haberId],
      haberBaslik:[this.yeniKayit.haberBaslik],
      haberGorsel:[this.yeniKayit.haberGorsel],
      haberIcerik:[this.yeniKayit.haberIcerik],
      haberKatAdi:[this.yeniKayit.haberKatAdi],
      haberKatId:[this.yeniKayit.haberKatId],
    });
  }
}
