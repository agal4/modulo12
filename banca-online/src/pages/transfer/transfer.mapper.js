//viewModel => api
//iban => iban
//name => name
//amount => amount
//concept => description
//notes => notes
//date => realTransaction. if realTransaction ===  null => hoy
//+transaction => hoy
//email => email
//+accountId => current account id


export let mapDateFieldsToTransactionDate = ({day, month, year}) => {
    if (day!="", month!="", year!=""){
        return new Date(Number(year),Number(month)-1,Number(day));
    } else {
        return null;
    }
};