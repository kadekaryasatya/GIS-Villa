import PocketBase from 'pocketbase';
import { IVilla } from '../utils/data';

const pb = new PocketBase('https://gis-api.pockethost.io');

async function getVillaList(): Promise<IVilla[]> {
  const records = await pb.collection('villa').getFullList({
    sort: '-created',
    expand: 'villa_photos(villa),category(villa).detail_category',
  });
  const villas: IVilla[] = records.map((record) => {
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      location: record.location,
      price: record.price,
      lat: record.latitude,
      lng: record.longitude,
      photo: record.expand['villa_photos(villa)'],
      category: record.expand['category(villa)'],
      thumbnail: record.photo,
    };
  });
  console.log('villas :>> ', villas);

  return villas;
}

async function getVillaDetail(id: any): Promise<IVilla> {
  const record = await pb.collection('villa').getOne(id, {
    expand: 'villa_photos(villa),category(villa).detail_category',
  });
  console.log('record :>> ', record);

  const villa: IVilla = {
    id: record.id,
    name: record.name,
    description: record.description,
    location: record.location,
    price: record.price,
    lat: record.latitude,
    lng: record.longitude,
    photo: record.expand['villa_photos(villa)'],
    category: record.expand['category(villa)'],

    thumbnail: record.photo,
  } as IVilla;

  // const villas: IVilla = record.map((record: any) => {
  //   return {
  //     id: record.id,
  //     name: record.name,
  //     description: record.description,
  //     location: record.location,
  //     price: record.price,
  //     lat: record.latitude,
  //     lng: record.longitude,
  //     photo: record.expand['villa_photos(villa'],
  //     thumbnail: record.photo,
  //   };
  // });
  console.log('villa :>> ', villa);
  return villa;
}

export { getVillaList, getVillaDetail };
