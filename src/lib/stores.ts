export const stores = [
  {
    id: "surat", city: "Surat",
    address: "2nd Fl, STALWART INSIGNIA Bldg, Piplod, Surat, Gujarat 395007",
    phone: "+919824177913", phoneLabel: "098241 77913",
    instagram: "https://www.instagram.com/vaidehi_craft_surat/",
    facebook: "https://www.facebook.com/siddharthshahvaidehicrafts/",
  },
  {
    id: "pune", city: "Pune",
    address: "CREATICITY MALL, 2F-005 & 006, Ishanya Mall Rd, Shastrinagar, Yerawada, Pune, Maharashtra 411006",
    phone: "+919881403147", phoneLabel: "098814 03147",
    instagram: "https://www.instagram.com/vaidehi_craft_pune/",
    facebook: "https://www.facebook.com/vaidehicraft/",
  },
] as const;

export type StoreId = typeof stores[number]["id"];
export const suratStore = stores[0];
