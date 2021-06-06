export const mapMovementsListFromApiToViewModel = (movementsList) => {
    return movementsList.map(movement => mapMovementFromApiToViewModel(movement));
}

const mapMovementFromApiToViewModel = (movement) => {
    return {
        transaction: new Date(movement.transaction).toLocaleDateString(),
        realTransaction: new Date(movement.realTransaction).toLocaleDateString(),
        description: movement.description,
        amount: `${movement.amount} €`,
        balance: `${movement.balance} €`,
        accountId: movement.accountId,
    };
};