import { Validators, createFormValidation } from '@lemoncode/fonk';
import { iban } from '@lemoncode/fonk-iban-validator';
import { laterDate } from '@lemoncode/fonk-later-date-validator';
/*  //Iban origen
 id: "",
 //Iban destino
 iban: "",
 //Beneficiario
 name: "",
 //Importe
 amount: "",
 //Concepto
 concept: "",
 //Observaciones
 notes: "",
 //Fecha ejecucion
 transactionDate: "",
 //Email beneficiario
 email: "", */
const validationSchema = {
  field: {
    id: [],
    iban: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
      {
        validator: iban.validator,
        message: 'IBAN no válido',
      },
    ],
    name: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    amount: [
      {
        validator: Validators.required,
        message: 'Campo requerido',
      },
    ],
    concept: [],
    notes: [],
    date: [
      {
        validator: laterDate.validator,
        message: 'Introduzca una fecha válida',
        customArgs: { date: new Date() },
      },
    ],
    email: [
      {
        validator: Validators.email,
        message: 'Email no válido',
      },
    ],
  },
};

export const formValidation = createFormValidation(validationSchema);
