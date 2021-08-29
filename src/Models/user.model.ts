import { v4 as uuidv4 } from 'uuid';

export class User {
    Id: string;
	FirstName: string;
	LastName: string;
	Email: string;
	Password: string;
	constructor(data: any) {
		this.Id = uuidv4();
        this.FirstName = data.FirstName;    
		this.LastName = data.LastName;
		this.Email = data.Email;
		this.Password = data.Password;
	}
}
