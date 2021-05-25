/* //Data structure
Account {
    id: string,
    type: string,
    alias: name->alias,
} */

export const mapAccountFromApiToViewModel = account => {
    return {
        ...account,
        alias: account.name,
    };
};

export const mapAccountFromViewModelToApi = account => {
    return {
        ...account,
        name: account.alias,
    };
};