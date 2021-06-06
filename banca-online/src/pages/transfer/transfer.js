import { history } from '../../core/router';
import {getAccount} from "../account/account.api";
import {getAccountList} from "../account-list/account-list.api";
import {setAccountOptions} from "./transfer.helpers"
import {formValidation} from "./transfer.validations"
import {onSubmitForm, onSetValue, onUpdateField, onSetError, onSetFormErrors} from "../../common/helpers/element.helpers"
import { mapDateFieldsToTransactionDate } from './transfer.mapper';

let transfer = {
    //Iban origen
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
    transactionDate: {
        day: "",
        month: "",
        year: "",
        //Default value: today
        fullDate: new Date(),
    },
    //Email beneficiario
    email: "",
};

const params = history.getParams();
const hasIdParam = Boolean(params.id);

getAccountList().then(accountList => {
    setAccountOptions(accountList);
    if (hasIdParam){
        onSetValue("select-account",params.id);
        transfer = {
            ...transfer,
            id: params.id,
        };
    } else {
        //Set the first value of the list as default
        onSetValue("select-account",accountList[0].id);
        transfer = {
            ...transfer,
            id: accountList[0].id,
        };
    }
});

onUpdateField("select-account", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        id: value,
    };
});

onUpdateField("iban", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        iban: value,
    };
    /* formValidation.validateField("iban",transfer.iban).then(result => {
        onSetError("iban", result);
    }); */
});

onUpdateField("name", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        name: value,
    };
    formValidation.validateField("name",transfer.name).then(result => {
        onSetError("name", result);
    });
});

onUpdateField("amount", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        amount: value,
    };
    formValidation.validateField("amount",transfer.amount).then(result => {
        onSetError("amount", result);
    });
});

onUpdateField("concept", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        concept: value,
    };
});

onUpdateField("notes", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        notes: value,
    };
});

//Date fields:
onUpdateField("day", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        transactionDate: {
            ...transfer.transactionDate,
            day: value,
        }
    };
});
onUpdateField("month", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        transactionDate: {
            ...transfer.transactionDate,
            month: value,
        }
    };
});
onUpdateField("year", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        transactionDate: {
            ...transfer.transactionDate,
            year: value,
        }
    };
});

onUpdateField("email", (event) => {
    const value = event.target.value;
    transfer = {
        ...transfer,
        email: value,
    };
    /* formValidation.validateField("email",transfer.email).then(result => {
        onSetError("email", result);
    }); */
});

onSubmitForm("transfer-button", () => {
    //If transfer date fields are contributed, map them to a Date
    if (areDateFieldsContributed(Object.values(transfer.transactionDate))){
        transfer = {
            ...transfer,
            transactionDate: {
                ...transfer.transactionDate,
                fullDate: mapDateFieldsToTransactionDate(transfer.transactionDate),
            }
        }
    }
    formValidation.validateForm(transfer).then((result) => {
        onSetFormErrors(result);
        if(result.succeeded){
            console.log("Saved");
            console.log(transfer);
            /* onSave().then(apiTransfer=> {
                history.back();
            }); */
        }
    });
});

const areDateFieldsContributed = (fieldValues) => fieldValues.every(fieldValue => fieldValue=!""&&fieldValue!=null);

const onSave = () => {
    const apiTransfer = mapTransferFromViewModelToApi(transfer);
    return insertTransfer(apiTransfer);
}


