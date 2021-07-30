import {getRoomWord} from "../property-list/property-list.mappers"

export const mapPropertyDetailsFromApiToViewModel = (propertyDetails, equipmentList) => {
    return {
        id: propertyDetails.id,
        title: propertyDetails.title,
        city: propertyDetails.city,
        rooms: `${propertyDetails.rooms} ${getRoomWord(propertyDetails.rooms)}`,
        squareMeter: `${propertyDetails.squareMeter}m2`,
        bathrooms: `${propertyDetails.bathrooms} ${getBathroomWord(propertyDetails.bathrooms)}`,
        price: `${propertyDetails.price.toLocaleString()} €`,
        notes: propertyDetails.notes,
        mainFeatures: Array.isArray(propertyDetails.mainFeatures) ? propertyDetails.mainFeatures : '',
        equipments: Array.isArray(propertyDetails.equipmentIds) ? mapEquipmentsFromIds(propertyDetails.equipmentIds,equipmentList) : '',
        locationUrl: propertyDetails.locationUrl,
        mainImage: Array.isArray(propertyDetails.images) ? propertyDetails.images[0] : '',
        images: Array.isArray(propertyDetails.images) ? propertyDetails.images : '',
    };
};

const getBathroomWord = (baths) => {
    return baths > 1 ? 'baños' : 'baño';
};

const mapEquipmentsFromIds = (equipIdList, equipList) => {
    return equipIdList.map(equipId => findEquipmentById(equipId, equipList).name);
};

const findEquipmentById = (equipId, equipList) => {
    return equipList.find(equipObj => equipObj.id===equipId);
};





