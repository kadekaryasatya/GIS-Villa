export interface IVilla {
  id: number;
  name: string;
  location: string;
  description: string;
  photo: string;
  price: number;
  lat: number;
  lng: number;
}

export const ListVilla: IVilla[] = [
  {
    id: 1,
    name: 'Villa Cyan',
    location: 'Kerobokan',
    description: 'Description for product 1',
    photo: 'https://plus.unsplash.com/premium_photo-1682377521566-f70ac8abe597?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: 325000,
    lat: -8.672995084922647,
    lng: 115.15584390105502,
  },
  {
    id: 2,
    name: 'Jerami Villa',
    location: 'Denpasar',
    description: 'Description for product 2',
    photo: 'https://lh5.googleusercontent.com/p/AF1QipPYQ52sAxU0ARIqCPAgefBQSra0FLd0_gyte8C8=w408-h544-k-no',
    price: 225000,
    lat: -8.682071387228769,
    lng: 115.20284258100577,
  },
  {
    id: 3,
    name: 'Villa De Kerobokan',
    location: 'Kerobokan',
    description: 'Description for product 3',
    photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlsbGF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
    price: 425000,
    lat: -8.676118198573034,
    lng: 115.17944546944283,
  },
  {
    id: 4,
    name: 'Villa June',
    location: 'Kerobokan',
    description: 'Description for product 4',
    photo: 'https://lh5.googleusercontent.com/p/AF1QipNX9rtjVouZpQQjpaXkVhEseSNGo8uj4tqWWWwx=w408-h272-k-no',
    price: 310000,
    lat: -8.683145026907887,
    lng: 115.1604680237137,
  },
  {
    id: 5,
    name: 'Joglo Villa Bali',
    location: 'Denpasar',
    description: 'Description for product 5',
    photo:
      'https://lh3.googleusercontent.com/gps-proxy/AE4_-5HRst3n9KEeprXsxklkcSxgPjAwhc2XqdlhCYLaAn_0j8avjLlGVp_9PTJS_Rj-0NABNH8-Tf8Ir3ZO3Nyloia7upszLLh4WV1H3dutFc48ZanScaBpQ8p886U3f9MW_o78LiY1DkiyHcz6Eb_wd0DfwkrVx8ZiGMygwAhqzrB94h7qsSSAxD2rGA=w408-h272-k-no',
    price: 265000,
    lat: -8.636657298369041,
    lng: 115.22587925990408,
  },
  {
    id: 6,
    name: 'Granzotto Style Villa',
    location: 'Denpasar',
    description: 'Description for product 6',
    photo: 'https://lh5.googleusercontent.com/p/AF1QipNS1fKRkLreCo6kLZM8bY9TJ8vxn4KnCn0mwr9U=w408-h306-k-no',
    price: 195000,
    lat: -8.651873451153563,
    lng: 115.2345701783658,
  },
  {
    id: 7,
    name: 'Saka Umah Villa',
    location: 'Denpasar',
    description: 'Description for product 7',
    photo: 'https://lh5.googleusercontent.com/p/AF1QipMw05ETe9vOWrTDf-ka1TkaNWG1a3ZS5mEEVWis=w408-h272-k-no',
    price: 225000,
    lat: -8.668360016933425,
    lng: 115.21070214494173,
  },
  {
    id: 8,
    name: 'Villa Bali',
    location: 'Nusa Dua',
    description: 'Description for product 8',
    photo: 'https://images.unsplash.com/photo-1626249893774-dc11ed24adbe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHZpbGxhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    price: 20000,
    lat: 51.5074,
    lng: -0.1278,
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
  lat: 51.5074,
  lng: -0.1278,
};
