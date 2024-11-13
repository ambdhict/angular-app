// import { Module } from "./module.interface"; 

export class CurrentUser{
    username: string = '';
    expirationDate: Date = new Date;
    userFullname: string = '';
    // modules: string[] = []; // array of module objects

    // sample
    // username: 'johndoe',
    // expirationDate: new Date('2024-12-31'),
    // userFullname: 'John Doe',
    // modules: [
    //     { id: 'admin', name: 'Admin Panel', description: 'Access to admin functionalities' },
    //     { id: 'reports', name: 'Reports', description: 'Access to view reports' }
    // ]
}