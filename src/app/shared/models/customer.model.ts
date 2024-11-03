export interface Customer {
    id:number,
    name:string,
    username:string,
    email:string,
    height:number,
    weight:number,
    age:number,
    allergies:string,
    goalId:number,
    dietTypeId:number,
    role:{
        id:number,
        name:string
    }
}