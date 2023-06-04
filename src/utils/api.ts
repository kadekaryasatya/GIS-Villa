import PocketBase from 'pocketbase';
import { ICategory, IFacilities, IHouseRules, IVilla } from '../utils/data';

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

  return villas;
}

async function getVillaDetail(id: any): Promise<IVilla> {
  const record = await pb.collection('villa').getOne(id, {
    expand: 'villa_photos(villa),category(villa).detail_category,house_rules(villa).house_rules_detail,room(villa).room_photo(room),facilities(villa).facilities_name',
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
    house_rules: record.expand['house_rules(villa)'],
    room: record.expand['room(villa)'],
    facilities: record.expand['facilities(villa)'],
    thumbnail: record.photo,
  } as IVilla;

  return villa;
}

async function postVillaDetail(name: string, description: string, latitude: number, longitude: number) {
  const villa = {
    name: name,
    description: description,
    latitude: latitude,
    longitude: longitude,
  };

  const createdVilla = await pb.collection('villa').create(villa);

  const id_villa = {
    id: createdVilla.id,
  };

  return id_villa;
}

async function deleteVilla(id: string) {
  let confirm = window.confirm('Are you sure delete this ?');
  if (!confirm) {
    return;
  }
  await pb.collection('villa').delete(id);
  window.location.reload();
}

async function postCategoryVilla(idVilla: string, selectedCategories: any) {
  const data = {
    villa: idVilla,
    detail_category: selectedCategories,
  };
  console.log('data :>> ', data);

  await pb.collection('category').create(data);

  return data;
}

async function getCategoryList(): Promise<ICategory[]> {
  const records = await pb.collection('detail_category').getFullList({
    sort: '-created',
  });
  const category: ICategory[] = records.map((record) => {
    return {
      id: record.id,
      name: record.name,
    };
  });

  return category;
}

async function getHouseRulesList(): Promise<IHouseRules[]> {
  const records = await pb.collection('house_rules_detail').getFullList({
    sort: '-created',
  });
  const house_rules: IHouseRules[] = records.map((record) => {
    return {
      id: record.id,
      name: record.name,
    };
  });

  return house_rules;
}

async function getFacilitiesList(): Promise<IFacilities[]> {
  const records = await pb.collection('facilities_name').getFullList({
    sort: '-created',
  });
  const house_rules: IFacilities[] = records.map((record) => {
    return {
      id: record.id,
      name: record.name,
    };
  });

  return house_rules;
}

export { getVillaList, getVillaDetail, postVillaDetail, postCategoryVilla, getCategoryList, getHouseRulesList, getFacilitiesList, deleteVilla };
