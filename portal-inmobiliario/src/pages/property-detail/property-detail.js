import {history, routes} from "../../core/router";
import {getPropertyDetail, getEquipmentList, insertContact} from "./property-detail.api";
import {mapPropertyDetailsFromApiToViewModel} from "./property-details.mappers";
import {setPropertyValues} from "./property-detail.helpers";
import { onUpdateField, onSetError, onSubmitForm, onSetFormErrors } from "../../common/helpers";
import { formValidation } from "./property-detail.validations";

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

let contact = {
    email: '',
    message: '',
};

onUpdateField('email', (event) => {
    const value = event.target.value;
    contact = {
      ...contact,
      email: value,
    };
    formValidation.validateField('email', contact.email).then((result) => {
      onSetError('email', result);
    });
});

onUpdateField('message', (event) => {
    const value = event.target.value;
    contact = {
      ...contact,
      message: value,
    };
    formValidation.validateField('message', contact.message).then((result) => {
      onSetError('message', result);
    });
});

onSubmitForm('contact-button', () => {
    formValidation.validateForm(contact).then((result) => {
        onSetFormErrors(result);
        if(result.succeeded){
            onSave().then(savedContact => {
                console.log('contact saved');
                console.log(savedContact);
                history.push(routes.propertyList);
            });
        }
    });
});

const onSave = () => {
    return insertContact(contact);
  };

const params = history.getParams();
Promise.all([getPropertyDetail(params.id), getEquipmentList()]).then(
    ([apiPropertyDetails, equipmentList]) => {
        propertyDetails = mapPropertyDetailsFromApiToViewModel(apiPropertyDetails[0], equipmentList);
        setPropertyValues(propertyDetails);
    }
);

