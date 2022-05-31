import { haber } from './../models/haber';
import { kategori } from './../models/kategori';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl ="http://localhost:10565/api/";
constructor(
  public http: HttpClient
) { }
KategoriListe(){
  return this.http.get(this.apiUrl+"kategoriliste");
}
KategoriById(katId:string){
return this.http.get(this.apiUrl+"kategoribyid/"+katId);
}
KategoriEkle(katAdi:kategori){
  return this.http.post(this.apiUrl+"kategoriekle",katAdi);
}
KategoriDuzenle(katAdi:kategori){
  return this.http.put(this.apiUrl+"kategoriduzenle",katAdi);
}
KategoriSil(katId:string){
  return this.http.delete(this.apiUrl+"kategorisil/"+katId);
  }

  HaberListe(){
    return this.http.get(this.apiUrl+"haberliste");
  }
  HaberById(haberId:string){
  return this.http.get(this.apiUrl+"haberbyid/"+haberId);
  }
  HaberEkle(haberAdi:haber){
    return this.http.post(this.apiUrl+"haberekle",haberAdi);
  }
  HaberDuzenle(haberAdi:haber){
    return this.http.put(this.apiUrl+"haberduzenle",haberAdi);
  }
  HaberSil(haberId:string){
    return this.http.delete(this.apiUrl+"habersil/"+haberId);
    }
}
