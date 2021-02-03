export class apiUser {
    username: string;
    name: string;
    email: string;
    phone: string;
    id: number;
    website: string;
    company: iUserCompany = new iUserCompany();
    address: iuserAddress = new iuserAddress();
}

export class iUserCompany {
    bs: string;
    catchPhrase: string;
    name: string;
}

export class iuserAddress {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
    geo: iGeoLocation = new iGeoLocation();
}

export class iGeoLocation {
    lat: string;
    lng: string;
}