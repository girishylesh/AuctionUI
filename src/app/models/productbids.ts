import { Product } from "./product";
import { PlacedBid } from "./placedbid";

export class ProductBid {
    bids: Array<PlacedBid>;
    product: Product;

    constructor() {
        this.bids = null;
        this.product = null;
    }
}