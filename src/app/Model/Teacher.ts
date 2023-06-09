import { Field } from "./Field";

export interface Teacher {
    _id:string;
    name:string;
    email:string;
    password:string;
    phone:string;
    pricePerHour:number;
    experience:number;
    Latitude:number;
    Longitude:number;
    FieldId:Field;
    rating: number;
    pictureUrl: string
    registerationDate: Date;
    Active:boolean;
    AcceptanceDate: Date,
}



