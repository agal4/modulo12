import { Validators, createFormValidation } from '@lemoncode/fonk';
import { isUrl } from '@lemoncode/fonk-is-url-validator';
import { positiveNumber } from '@lemoncode/fonk-positive-number-validator';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';

/*
 //Datos Generales 
 //Titulo
 title: "",
 //Comentarios
 notes: "",
 //Email
 email: "",
 //Telefono
 phone: "",
 //Precio
 price: "",
 //Tipo de venta
 saleTypes: [] -> array

 //Datos de la vivienda
 //Direccion
 address: "",
 //Localidad
 city: "",
 //Provincia
 province:"",
 //Metros cuadrados
 squareMeter:"",
 //Habitaciones
 rooms="",
 //Cuartos de baño
 bathrooms="",
 //Url ubicación
 locationURL="",


 //Caracteristicas basicas -> array
 equipment:[],
 //Caracteristicas insertables -> array
 mainFeatures: [],
 
 
 //SubirFotos -> array
 images: []
 
 */

const validationSchema = {
  field: {
    title: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    notes: [],
    email: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
    phone: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: Validators.pattern,
        customArgs: { pattern: /^(6|8|9)\d{8}$/},
        message: 'Introduzca un número válido',
      },
    ],
    price: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: positiveNumber.validator,
        message: 'Introduzca un número válido',
      },
    ],
    saleTypes: [
        {
          validator: arrayRequired.validator,
          customArgs: { minLength: 1, maxLength: 4 },
          message: 'Introduzca un tipo de propiedad',
        },
    ],
    address: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    city: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    province: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    squareMeter: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: positiveNumber.validator,
        customArgs: { allowZero: false },
        message: 'Introduzca un número válido',
      },
    ],
    rooms: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: positiveNumber.validator,
        customArgs: { allowZero: true },
        message: 'Introduzca un número válido',
      },
    ],
    bathrooms: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: positiveNumber.validator,
        customArgs: { allowZero: true },
        message: 'Introduzca un número válido',
      },
    ],
    locationUrl: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    /*   {
        validator: isUrl.validator,
        message: 'Introduzca una URL válida',
      }, */
      {
        validator: Validators.pattern,
        customArgs: { pattern: /^https:\/\/www\.google\.com\/maps\/embed?.*$/},
        message: 'Introduzca una URL de Maps',
      },
    ],
    newFeatures: [],
    equipment: [],
    images: [],
  },
};

export const formValidation = createFormValidation(validationSchema);
