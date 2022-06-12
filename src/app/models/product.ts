import { User } from "./user";

export class Product {
    productId: Number;
    uid: String;
    name: String;
    shortDesc: String;
    detailedDesc: String;
    startingPrice: Number;
    category: String;
    bidEndDate: Date;
    user: User;

    constructor() {
        this.productId = 0;
        this.uid = '';
        this.name = '';
        this.shortDesc = '';
        this.detailedDesc = '';
        this.startingPrice = 0;
        this.category = '';
        this.bidEndDate = null;
        this.user = null;
    }
}