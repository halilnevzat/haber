import { AlertDialogComponent } from './../components/dialogs/alert-dialog/alert-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
alertDialogRef: MatDialogRef<AlertDialogComponent>;
constructor(
  public matDialog : MatDialog
) { }

AlertUygular (s: Sonuc){
  var baslik ="";
  if (s.islem){
    baslik ="İşlem Başarılı";

  }else {
    baslik="İşlem başarısız";
  }

  this.alertDialogRef=this.matDialog.open(AlertDialogComponent,{
    width:'300px'
  });
  this.alertDialogRef.componentInstance.dialogBaslik=baslik;
  this.alertDialogRef.componentInstance.dialogIslem=s.islem;
  this.alertDialogRef.componentInstance.dialogMesaj=s.mesaj;

  this.alertDialogRef.afterClosed().subscribe(D=>{
    this.alertDialogRef=null;
  });
}

}
