export class User {
    userId: Number;
    uid: String;
    firstName: String;
	lastName: String;
	address: String;
	city: String;
	state: String;
	pin: Number;
	phone: Number;
	email: String;
	userType: String;

    constructor() {
        this.userId = 0;
        this.uid = '';
        this.firstName = '';
        this.lastName = '';
        this.address = '';
        this.city = '';
        this.state = '';
        this.pin = 0;
        this.phone = 0;
        this.email = '';
        this.userType = '';
    }

}