import {Validators, createFormValidation} from "@lemoncode/fonk";
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
        id: [Validators.required],
        iban: [Validators.required],
        name: [Validators.required],
        amount: [Validators.required],
        concept: [],
        notes: [],
        transactionDate: [],
        /* transactionDate: [laterDate.validator], */
        email: [Validators.email],
    },
};

export const formValidation = createFormValidation(validationSchema);