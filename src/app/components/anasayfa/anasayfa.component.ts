import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from './../../services/myAlert.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-anasayfa',
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.css']
})
export class AnasayfaComponent implements OnInit {
confirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public alert:MyAlertService,
    public matDialog:MatDialog
  ) { }

  ngOnInit() {
  }

  AlertAc(p:boolean){
    var s:Sonuc= new Sonuc();
    s.islem=p;
    s.mesaj="bu bir test mesajıdır";
    this.alert.AlertUygular(s)
  }
 
  ConfirmAc () {
this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
  width:'400px'
});
this.confirmDialogRef.componentInstance.dialogMesaj="Kayıt Silincektir Onaylıyor musunuz ?";
this.confirmDialogRef.afterClosed().subscribe(d=>{
  console.log(d);
  if(d){
    //silmeRutini
  }
});

  }
}
