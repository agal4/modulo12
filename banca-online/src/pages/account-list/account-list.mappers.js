//Data Structure:
/* Account{
    {
        id: String;
        iban: String;
        name: String;
        balance: String; numb => String + euro symb
        lastTransaction: String; String -> DD/MM/YYYY
    }
} */

export const mapAccountListFromApiToViewModel = (accountList) => {
    return accountList.map(account => mapAccountFromApiToViewModel(account));
}

const mapAccountFromApiToViewModel = (account) => {
    return {
        id: account.id,
        iban: account.iban,
        name: account.name,
        balance: `${account.balance} €`,
        lastTransaction: new Date(account.lastTransaction).toLocaleDateString(),
    };
};

