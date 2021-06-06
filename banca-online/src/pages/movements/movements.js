import { history } from '../../core/router';
import { getMovements } from './movements.api';
import { mapMovementsListFromApiToViewModel } from './movements.mappers';
import { addMovementRows } from './movements.helpers';
import {getAccount} from "../account/account.api";
import { mapAccountFromApiToViewModel } from '../account/account.mappers';
import {onSetValue} from "../../common/helpers/element.helpers"

const params = history.getParams();
const isEditMode = Boolean(params.id);

getMovements(params.id).then((movementsList) => {
  const viewModelMovementsList = mapMovementsListFromApiToViewModel(movementsList);
  if (isEditMode){
      getAccount(params.id).then(apiAccount => {
        const currentViewModelAccount = mapAccountFromApiToViewModel(apiAccount);
        onSetValue("alias",currentViewModelAccount.alias);
        onSetValue("iban",currentViewModelAccount.iban);
        onSetValue("balance",currentViewModelAccount.balance);
        addMovementRows(viewModelMovementsList.filter(movement => movement.accountId===params.id));
      });
  } else {
    addMovementRows(viewModelMovementsList);
  }
});
