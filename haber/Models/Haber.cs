//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace haber.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Haber
    {
        public int haberId { get; set; }
        public string haberBaslik { get; set; }
        public Nullable<int> haberKatId { get; set; }
        public string haberIcerik { get; set; }
        public string haberGorsel { get; set; }
    
        public virtual Kategori Kategori { get; set; }
    }
}
