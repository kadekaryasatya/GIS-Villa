import PocketBase from 'pocketbase';
import { IVilla } from '../utils/data';

const pb = new PocketBase('https://gis-api.pockethost.io');

async function getVillaList(): Promise<IVilla[]> {
  const records = await pb.collection('villa').getFullList({
    sort: '-created',
  });

  const villas: IVilla[] = records.map((record) => {
    return {
      id: record.id,
      name: record.name,
      description: record.description,
      location: record.location,
      price: record.price,
      photo: record.photo,
      lat: record.latitude,
      lng: record.longitude,
    };
  });

  return villas;
}

export { getVillaList };
