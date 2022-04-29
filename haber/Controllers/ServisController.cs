using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using haber.Models;
using haber.ViewModel;

namespace haber.Controllers
{
    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();

        #region Kategori
       [HttpGet]
       [Route("api/kategoriliste")]
        public List<KategoriModel> KategoriListe()
        {
            List<KategoriModel> liste = db.Kategoris.Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi,
                katHaberSay = x.Habers.Count()


            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/kategoribyid/{katId}")]
        public KategoriModel KategoriById(int katId)
        {
            KategoriModel kayit = db.Kategoris.Where(s => s.katId == katId).Select(x => new KategoriModel()
            {
                katId = x.katId,
                katAdi = x.katAdi,
                katHaberSay = x.Habers.Count()
            }).FirstOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle (KategoriModel model)
        {
            if (db.Kategoris.Count (s=>s.katAdi== model.katAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "Girilen Kategori Kayıtlıdır !";
                    return sonuc;
            }
            Kategori yeni = new Kategori();
            yeni.katAdi = model.katAdi;
            db.Kategoris.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "Kategori Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/kategoriduzenle")]
        public SonucModel KategoriDuzenle(KategoriModel model)
        {
            Kategori kayit = db.Kategoris.Where(s => s.katId == model.katId).FirstOrDefault();
            if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            kayit.katAdi = model.katAdi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "Kategori Düzenlendi";
                                
            return sonuc;
        }
        [HttpDelete]
        [Route("api/kategorisil/{katId}")]
            public SonucModel KategoriSil(int katId)
        {
            Kategori kayit = db.Kategoris.Where(s => s.katId == katId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "Kayıt Bulunamadı";
                return sonuc;
            }
            if(db.Habers.Count(s=> s.haberKatId == katId) > 0)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "Haber Kaydı Olan Kategori Silinemez !";
                return sonuc;
            }
            db.Kategoris.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "Kategori Silindi !";
            return sonuc;
        }
        #endregion

        #region Haber
        [HttpGet]
        [Route("api/haberliste")]
        public List<HaberModel> HaberListe()
        {
            List<HaberModel> liste = db.Habers.Select(x => new HaberModel()
            {
                haberId = x.haberId,
                haberBaslik = x.haberBaslik,
                haberIcerik = x.haberIcerik,
                haberGorsel = x.haberGorsel,
                haberKatId = x.haberKatId,
                haberKatAdi = x.Kategori.katAdi
            }).ToList(); 
            return liste;
        }
        [HttpGet]
        [Route("api/haberlistebykatid/{katId}")]
        public List<HaberModel> HaberListeByKatId(int katId)
        {
            List<HaberModel> liste = db.Habers.Where(s=>s.haberKatId == katId).Select(x => new HaberModel()
            {
                haberId = x.haberId,
                haberBaslik = x.haberBaslik,
                haberIcerik = x.haberIcerik,
                haberGorsel = x.haberGorsel,
                haberKatId = x.haberKatId,
                haberKatAdi = x.Kategori.katAdi
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/haberbyid/{haberId}")]
        public HaberModel HaberById (int haberId)
        {
            HaberModel kayit = db.Habers.Where(s => s.haberId == haberId).Select(x=> new HaberModel()
            {
                haberId = x.haberId,
                haberBaslik = x.haberBaslik,
                haberIcerik = x.haberIcerik,
                haberGorsel = x.haberGorsel,
                haberKatId = x.haberKatId,
                haberKatAdi = x.Kategori.katAdi

            }).FirstOrDefault();
            return kayit;
        }
        [HttpPost]
        [Route("api/haberekle")]
        public SonucModel HaberEkle(HaberModel model)
        {
            if(db.Habers.Count(s=>s.haberBaslik == model.haberBaslik && s.haberKatId == model.haberKatId) > 0)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "girilen haber ilgili kategoride kayıtlıdır !";
                return sonuc;
            }
            Haber yeni = new Haber();
            yeni.haberBaslik = model.haberBaslik;
            yeni.haberIcerik = model.haberIcerik;
            yeni.haberGorsel = model.haberGorsel;
            yeni.haberKatId = model.haberKatId;            
            db.Habers.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "Haber Eklenmiştir !";

            return sonuc;
        }
        [HttpPut]
        [Route("api/haberduzenle")]
        public SonucModel HaberDuzenle(HaberModel model)
        {
            Haber kayit = db.Habers.Where(s => s.haberId == model.haberId).FirstOrDefault();
                if(kayit == null)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "kayıt bulunamadı !";
                return sonuc;
            }
            kayit.haberBaslik = model.haberBaslik;
            kayit.haberIcerik = model.haberIcerik;
            kayit.haberGorsel = model.haberGorsel;
            kayit.haberKatId = model.haberKatId;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "haber Düzenlendi";
            return sonuc;

        }
        [HttpDelete]
        [Route("api/habersil/{haberId}")]
        public SonucModel HaberSil (int haberId)
        {
            Haber kayit = db.Habers.Where(s => s.haberId == haberId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "kayıt bulunamadı !";
                return sonuc;
            }
            db.Habers.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "haber silindi !";
            return sonuc;
        }
        #endregion
        #region Kullanici
        [HttpPost]
        [Route("api/kullaniciekle")]
        public SonucModel KullaniciEkle(KullaniciModel model)
        {
            if (db.Kullanicis.Count(s => s.kullaniciAdi == model.kullaniciAdi) > 0)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "Bu kullanıcı adı kullanılmaktadır";
                return sonuc;
            }
            Kullanici yeni = new Kullanici();
            yeni.kullaniciAdi = model.kullaniciAdi;
            yeni.kullaniciParola = model.kullaniciParola;
            yeni.kullaniciYetki = model.kullaniciYetki;
            db.Kullanicis.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "Kullanıcı Eklenmiştir !";

            return sonuc;
        }
        [HttpGet]
        [Route("api/kullaniciliste")]
        public List<KullaniciModel> KullaniciListe()
        {
            List<KullaniciModel> liste = db.Kullanicis.Select(x => new KullaniciModel()
            {
                kullanciId = x.kullanciId,
                kullaniciAdi = x.kullaniciAdi,               
                kullaniciYetki= x.kullaniciYetki,                
            }).ToList();
            return liste;
        }
        [HttpPut]
        [Route("api/kullaniciduzenle")]
        public SonucModel KullaniciDuzenle(KullaniciModel model)
        {
            Kullanici kayit = db.Kullanicis.Where(s => s.kullanciId == model.kullanciId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "kullanıcı bulunamadı !";
                return sonuc;
            }
            kayit.kullaniciAdi = model.kullaniciAdi;
            kayit.kullaniciParola = model.kullaniciParola;
            kayit.kullaniciYetki = model.kullaniciYetki;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "kullanıcı Düzenlendi";
            return sonuc;

        }
        [HttpDelete]
        [Route("api/kullanicisil/{kullaniciId}")]
        public SonucModel KullaniciSil(int kullaniciId)
        {
            Kullanici kayit = db.Kullanicis.Where(s => s.kullanciId == kullaniciId).FirstOrDefault();
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.Mesaj = "kayıt bulunamadı !";
                return sonuc;
            }
            db.Kullanicis.Remove(kayit);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.Mesaj = "Kullanıcı silindi !";
            return sonuc;
        }
        #endregion
    }
}
