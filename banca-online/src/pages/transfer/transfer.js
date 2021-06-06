import { history, routes } from '../../core/router';
import { getAccountList } from '../account-list/account-list.api';
import { getAccount } from '../account/account.api';
import { setAccountOptions } from './transfer.helpers';
import { formValidation } from './transfer.validations';
import {
  onSubmitForm,
  onSetValue,
  onUpdateField,
  onSetError,
  onSetFormErrors,
} from '../../common/helpers/element.helpers';
import {
  mapDateFieldsToDate,
  mapTransferFromViewModelToApi,
} from './transfer.mapper';
import { insertTransfer } from './transfer.api';

let transfer = {
  //Origin account id
  id: '',
  //Iban origen
  senderIban: '',
  //Iban destino
  iban: '',
  //Beneficiario
  name: '',
  //Importe
  amount: '',
  //Concepto
  concept: '',
  //Observaciones
  notes: '',
  dateFields: {
    day: '',
    month: '',
    year: '',
  },
  //Fecha ejecución
  date: '',
  //Email beneficiario
  email: '',
};

const params = history.getParams();
const hasIdParam = Boolean(params.id);

getAccountList().then((accountList) => {
  setAccountOptions(accountList);
  if (hasIdParam) {
    onSetValue('select-account', params.id);
    transfer = {
      ...transfer,
      id: params.id,
    };
  } else {
    //Set the first value of the list as default
    onSetValue('select-account', accountList[0].id);
    transfer = {
      ...transfer,
      id: accountList[0].id,
    };
  }
});

onUpdateField('select-account', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    id: value,
  };
});

onUpdateField('iban', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    iban: value,
  };
  formValidation.validateField('iban', transfer.iban).then((result) => {
    onSetError('iban', result);
  });
});

onUpdateField('name', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    name: value,
  };
  formValidation.validateField('name', transfer.name).then((result) => {
    onSetError('name', result);
  });
});

onUpdateField('amount', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    amount: value,
  };
  formValidation.validateField('amount', transfer.amount).then((result) => {
    onSetError('amount', result);
  });
});

onUpdateField('concept', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    concept: value,
  };
});

onUpdateField('notes', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    notes: value,
  };
});

//Date fields:
onUpdateField('day', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    dateFields: {
      ...transfer.dateFields,
      day: value,
    },
  };
});
onUpdateField('month', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    dateFields: {
      ...transfer.dateFields,
      month: value,
    },
  };
});
onUpdateField('year', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    dateFields: {
      ...transfer.dateFields,
      year: value,
    },
  };
});

onUpdateField('email', (event) => {
  const value = event.target.value;
  transfer = {
    ...transfer,
    email: value,
  };
  formValidation.validateField('email', transfer.email).then((result) => {
    onSetError('email', result);
  });
});

onSubmitForm('transfer-button', () => {
  //Get the sender iban from id
  getAccount(transfer.id).then((apiAccount) => {
    transfer = {
      ...transfer,
      senderIban: apiAccount.iban,
    };
    //If transfer date fields are contributed, map them to a Date
    if (areDateFieldsContributed(Object.values(transfer.dateFields))) {
      transfer = {
        ...transfer,
        date: mapDateFieldsToDate(transfer.dateFields),
      };
    }
    formValidation.validateForm(transfer).then((result) => {
      onSetFormErrors(result);
      if (result.succeeded) {
        onSave().then((apiTransfer) => {
          console.log('Saved to api');
          console.log(apiTransfer);
          history.push(routes.accountList);
        });
      }
    });
  });
});

const areDateFieldsContributed = (fieldValues) =>
  fieldValues.every((fieldValue) => (fieldValue = !'' && fieldValue != null));

const onSave = () => {
  const apiTransfer = mapTransferFromViewModelToApi(transfer);
  return insertTransfer(apiTransfer);
};
