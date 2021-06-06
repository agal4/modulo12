
export let mapDateFieldsToDate = ({day, month, year}) => {
    if (day!="" && month!="" && year!=""){
        return new Date(Number(year),Number(month)-1,Number(day));
    } else {
        //Default value: today
        return new Date();
    }
};

export const mapTransferFromViewModelToApi = transfer => {
    const {id, dateFields, ...rest} = transfer;
    return {
        ...rest,
    };
};