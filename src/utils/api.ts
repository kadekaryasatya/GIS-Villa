import PocketBase from 'pocketbase';
import { IVilla } from '../utils/data';

const pb = new PocketBase('https://gis-api.pockethost.io');

async function getVillaList(): Promise<IVilla[]> {
  const records = await pb.collection('villa').getFullList({
    sort: '-created',
    expand: 'villa_photos(villa)',
  });
  console.log('records :>> ', records);
  const villas: IVilla[] = records.map((record) => {
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      location: record.location,
      price: record.price,
      lat: record.latitude,
      lng: record.longitude,
      photo: record.expand,
      thumbnail: record.photo,
    };
  });

  return villas;
}

export { getVillaList };
