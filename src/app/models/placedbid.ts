export class PlacedBid {
    uid: String;
    bidAmount: Number;
    buyerFirstName: String;
    buyerLastName: String;
    buyerEmail: String;

    constructor() {
        this.uid = '';
        this.bidAmount = 0;
        this.buyerFirstName = '';
        this.buyerLastName = '';
        this.buyerEmail = '';
    }
}