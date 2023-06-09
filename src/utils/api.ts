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

async function postVillaDetail(name: string, description: string, latitude: number, longitude: number, location: string, price: number) {
  const villa = {
    name: name,
    description: description,
    latitude: latitude,
    longitude: longitude,
    location: location,
    price: price,
  };

  const createdVilla = await pb.collection('villa').create(villa);

  const id_villa = {
    id: createdVilla.id,
  };

  return id_villa;
}

async function deleteVilla(id: string) {
  await pb.collection('villa').delete(id);
}

async function postCategoryVilla(idVilla: string, selectedCategories: any) {
  const data = {
    villa: idVilla,
    detail_category: selectedCategories,
  };

  await pb.collection('category').create(data);

  return data;
}

async function postHouseRules(idVilla: string, ruleId: any, allowed: boolean) {
  const data = {
    villa: idVilla,
    house_rules_detail: ruleId,
    allowed: allowed,
  };

  await pb.collection('house_rules').create(data);

  return data;
}

async function postFacilitiesVilla(idVilla: string, selectedFacilities: any) {
  const data = {
    villa: idVilla,
    facilities_name: selectedFacilities,
  };

  await pb.collection('facilities').create(data);

  return data;
}

const postPhotoVilla = async (idVilla: string, file: File) => {
  const formData = new FormData();

  formData.append('villa', idVilla);
  formData.append('path_photo', file);

  await pb.collection('villa_photos').create(formData);

  return formData;
};

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

async function postRoomDetail(name: string, idVilla: string, bed: number, bath: number, price: number) {
  const room = {
    name: name,
    villa: idVilla,
    bed: bed,
    bath: bath,
    price_per_night: price,
  };

  const createdRoom = await pb.collection('room').create(room);

  const id_room = {
    id: createdRoom.id,
  };

  return id_room;
}

const postPhotoRoom = async (idRoom: string, file: File) => {
  const formData = new FormData();

  formData.append('room', idRoom);
  formData.append('path_room_photo', file);

  await pb.collection('room_photo').create(formData);

  return formData;
};

export { getVillaList, getVillaDetail, postVillaDetail, postCategoryVilla, getCategoryList, getHouseRulesList, getFacilitiesList, deleteVilla, postPhotoRoom, postHouseRules, postFacilitiesVilla, postPhotoVilla, postRoomDetail };
