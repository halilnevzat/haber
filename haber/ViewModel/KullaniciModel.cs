using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haber.ViewModel
{
    public class KullaniciModel
    {
        public int kullanciId { get; set; }
        public string kullaniciAdi { get; set; }
        public Nullable<int> kullaniciYetki { get; set; }
        public string kullaniciParola { get; set; }
    }
}