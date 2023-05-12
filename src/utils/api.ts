import PocketBase from 'pocketbase';
import { IVilla } from '../utils/data';

const pb = new PocketBase('https://gis-api.pockethost.io');

async function getVillaList(): Promise<IVilla[]> {
  const records = await pb.collection('villa').getFullList({
    sort: '-created',
    expand: 'villa_photos(villa)',
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
      thumbnail: record.photo,
    };
  });
  console.log('villas :>> ', villas);

  return villas;
}

async function getVillaDetail(): Promise<IVilla> {
  const record = await pb.collection('villa').getOne('RECORD_ID', {
    sort: '-created',
    expand: 'villa_photos(villa)',
  });
  const villas: IVilla = record.map((record: any) => {
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      location: record.location,
      price: record.price,
      lat: record.latitude,
      lng: record.longitude,
      photo: record.expand['villa_photos(villa'],
      thumbnail: record.photo,
    };
  });

  return villas;
}

export { getVillaList, getVillaDetail };
