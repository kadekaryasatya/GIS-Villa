export interface IVilla {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  price_end?: number;
  lat: number;
  lng: number;
  photo: any | Array<any>;
  category: any | Array<any>;
  house_rules?: any | Array<any>;
  facilities?: any | Array<any>;
  room?: any | Array<any>;
  thumbnail: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IHouseRules {
  id: string;
  name: string;
}

export interface IFacilities {
  id: string;
  name: string;
}
