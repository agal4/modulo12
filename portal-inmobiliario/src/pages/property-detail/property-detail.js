import {history} from "../../core/router";
import {getPropertyDetail, getEquipmentList} from "./property-detail.api";
import {mapPropertyDetailsFromApiToViewModel} from "./property-details.mappers";
import {setPropertyValues} from "./property-detail.helpers";

let propertyDetails = {
    id: '',
    title: '',
    city: '',
    rooms: '',
    squareMeter: '',
    bathrooms: '',
    price: '',
    notes: '',
    mainFeatures: '',
    equipments: '',
    locationUrl: '',
    mainImage: '',
    images: '',
};

const params = history.getParams();
Promise.all([getPropertyDetail(params.id), getEquipmentList()]).then(
    ([apiPropertyDetails, equipmentList]) => {
        propertyDetails = mapPropertyDetailsFromApiToViewModel(apiPropertyDetails[0], equipmentList);
        setPropertyValues(propertyDetails);

    }
);

