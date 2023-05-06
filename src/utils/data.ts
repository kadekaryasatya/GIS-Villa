export interface IVilla {
  id: number;
  name: string;
  location: string;
  description: string;
  photo: string;
  price: number;
}

export const ListVilla: IVilla[] = [
  {
    id: 1,
    name: 'Villa Asri',
    location: 'Denpasar',
    description: 'Description for product 1',
    photo: 'https://plus.unsplash.com/premium_photo-1682377521566-f70ac8abe597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: 20000,
  },
  {
    id: 2,
    name: 'Villa Kenangan',
    location: 'Badung',
    description: 'Description for product 2',
    photo: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    price: 20000,
  },
  {
    id: 3,
    name: 'Villa De Bali',
    location: 'Gianyar',
    description: 'Description for product 3',
    photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    price: 20000,
  },
  {
    id: 4,
    name: 'Villa Candi',
    location: 'Karangasem',
    description: 'Description for product 4',
    photo: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    price: 20000,
  },
  {
    id: 5,
    name: 'Villa Kayu Manis',
    location: 'Tabanan',
    description: 'Description for product 5',
    photo: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbGxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 20000,
  },
  {
    id: 6,
    name: 'The Villas',
    location: 'Jimbaran',
    description: 'Description for product 6',
    photo: 'https://images.unsplash.com/photo-1604014238170-4def1e4e6fcf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fHZpbGxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 20000,
  },
  {
    id: 7,
    name: 'Villa Kertha',
    location: 'Klungkung',
    description: 'Description for product 7',
    photo: 'https://plus.unsplash.com/premium_photo-1682285211680-8fbd6b44aaef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHZpbGxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 20000,
  },
  {
    id: 8,
    name: 'Villa Bali',
    location: 'Nusa Dua',
    description: 'Description for product 8',
    photo: 'https://images.unsplash.com/photo-1626249893774-dc11ed24adbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHZpbGxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 20000,
  },
];

export const villa: IVilla = {
  id: 1,
  name: 'Villa Bali',
  location: 'Nusa Dua',
  description:
    'Villa in Bali is a stunning retreat nestled amidst the lush tropical landscape of the Indonesian island. The villa boasts a perfect blend of traditional Balinese architecture and modern luxury amenities, providing guests with an unforgettable experience.',
  photo: 'https://images.unsplash.com/photo-1626249893774-dc11ed24adbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHZpbGxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
  price: 20000,
};
