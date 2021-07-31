import {getProvinceList, getSaleTypeList} from '../property-list/property-list.api';
import {getEquipmentList} from '../property-detail/property-detail.api';
import {setCheckboxList, setOptionList, formatCheckboxId, formatDeleteFeatureButtonId, onAddFeature, onRemoveFeature, onAddImage} from './upload-property.helpers';
import { formValidation } from './upload-property.validations';
import {onUpdateField, onSubmitForm, onSetError, onSetFormErrors, onAddFile} from '../../common/helpers'
import {mapPropertyFromViewModelToApi} from './upload-property.mappers';
import {insertProperty} from './upload-property.api';

let property = {
 title: "",
 notes: "",
 email: "",
 phone: "",
 price: "",
//map to saleTypeIds
 saleTypes:[],
 address: "",
 city: "",
 //map to provinceId
 province:"", 
 squareMeter:"",
 rooms:"",
 bathrooms:"",
 locationUrl:"",
 //map to equipmentIds
 equipment: [],
 mainFeatures: [], 
 images: [],
};

Promise.all([getSaleTypeList(), getProvinceList(), getEquipmentList()]).then(
    ([saleTypeList, provinceList, equipmentList]) => {
        setCheckboxList(saleTypeList, 'saleTypes');
        setCheckboxEvents(saleTypeList, 'saleTypes');
        setOptionList(provinceList, 'province');
        setCheckboxList(equipmentList, 'mainFeatures');
        setCheckboxEvents(equipmentList, 'equipment');
    }
);

const setCheckboxEvents = (list,id) => {
    list.forEach(element => {
        const checkboxId = formatCheckboxId(element);
        onUpdateField(checkboxId, event => {
            const value = event.target.value;
            const isChecked = event.target.checked;
            updateListProperty(isChecked, id, value);
            formValidation.validateField(id,property[id]).then(result => {
                onSetError(id, result);
            });
        });
    });
}

const updateListProperty = (isChecked, id, value) => {
    property = {
        ...property,
        //Add values from checked fields, remove values from unchecked fields
        [id]: isChecked ? addValue(property[id],value).sort() : removeValue(property[id],value).sort(),
    };
}

const addValue = (elements,elementToBeAdded) => [...elements, elementToBeAdded];

const removeValue = (elements,elementToBeRemoved) => elements.filter(element => element != elementToBeRemoved);

onUpdateField("title", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        title: value,
    };
    formValidation.validateField("title",property.title).then(result => {
        onSetError("title", result);
    });
});

onUpdateField("notes", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        notes: value,
    };
    formValidation.validateField("notes",property.notes).then(result => {
        onSetError("notes", result);
    });
});

onUpdateField("email", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        email: value,
    };
    formValidation.validateField("email",property.email).then(result => {
        onSetError("email", result);
    });
});

onUpdateField("phone", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        phone: value,
    };
    formValidation.validateField("phone",property.phone).then(result => {
        onSetError("phone", result);
    });
});

onUpdateField("price", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        price: value,
    };
    formValidation.validateField("price",property.price).then(result => {
        onSetError("price", result);
    });
});

onUpdateField("address", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        address: value,
    };
    formValidation.validateField("address",property.address).then(result => {
        onSetError("address", result);
    });
});

onUpdateField("city", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        city: value,
    };
    formValidation.validateField("city",property.city).then(result => {
        onSetError("city", result);
    });
});

onUpdateField("province", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        province: value,
    };
    formValidation.validateField("province",property.province).then(result => {
        onSetError("province", result);
    });
});

onUpdateField("squareMeter", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        squareMeter: value,
    };
    formValidation.validateField("squareMeter",property.squareMeter).then(result => {
        onSetError("squareMeter", result);
    });
});

onUpdateField("rooms", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        rooms: value,
    };
    formValidation.validateField("rooms",property.rooms).then(result => {
        onSetError("rooms", result);
    });
});

onUpdateField("bathrooms", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        bathrooms: value,
    };
    formValidation.validateField("bathrooms",property.bathrooms).then(result => {
        onSetError("bathrooms", result);
    });
});

onUpdateField("locationUrl", (event) => {
    const value = event.target.value;
    property = {
        ...property,
        locationUrl: value,
    };
    formValidation.validateField("locationUrl",property.bathrooms).then(result => {
        onSetError("locationUrl", result);
    });
});

onSubmitForm("insert-feature-button", () => {
    const value = document.getElementById("newFeature").value;
    if(value){
        property = {
            ...property,
            mainFeatures: addValue(property.mainFeatures, value),
        };
        onAddFeature(value);
        //Event for removing the feature
        onSubmitForm(formatDeleteFeatureButtonId(value), () => {
            property = {
                ...property,
                mainFeatures: removeValue(property.mainFeatures, value),
            }
            onRemoveFeature(value);
        })
        formValidation.validateField("mainFeatures",property.mainFeatures).then(result => {
            onSetError("mainFeatures", result);
        });
    }
});

onAddFile("add-image", (file) => {
    property = {
        ...property,
        images: addValue(property.images, file),
    };
    onAddImage(file);
    formValidation.validateField("images",property.images).then(result => {
        onSetError("images", result);
    });
});

const onSave = () => {
     const apiProperty = mapPropertyFromViewModelToApi(property);
     return insertProperty(apiProperty);
}

onSubmitForm('save-button', () => {
  formValidation.validateForm(property).then((result) => {
    onSetFormErrors(result);
    if (result.succeeded) {
        console.log({property});
        onSave().then((apiProperty) => {
            console.log({apiProperty});
            history.back();
        });
    }
  });
});