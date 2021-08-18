export async function getAvailablePlans(): Promise<Array<ISubscription>> {
    return [
        {
            name: '1 pessoa',
            membersLimit: 1,
            price: 7.9,
        },
        {
            name: '2 pessoas',
            membersLimit: 2,
            price: 14.9,
        },
        {
            name: '3 pessoas',
            membersLimit: 3,
            price: 22.9,
        },
        {
            name: '5 pessoas',
            membersLimit: 5,
            price: 39.9,
        },
        {
            name: '10 pessoas',
            membersLimit: 10,
            price: 69.9,
        },
        {
            name: '15 pessoas',
            membersLimit: 15,
            price: 99.9,
        },
        {
            name: '30 pessoas',
            membersLimit: 30,
            price: 199.9,
        },
        {
            name: '60 pessoas',
            membersLimit: 60,
            price: 449.9,
        },
    ];
}
