using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haber.ViewModel
{
    public class HaberModel
    {
        public int haberId { get; set; }
        public string haberBaslik { get; set; }
        public Nullable<int> haberKatId { get; set; }
        public string haberKatAdi { get; set; }
        public string haberIcerik { get; set; }
        public string haberGorsel { get; set; }
    }
}