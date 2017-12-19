export class User{
    constructor(
        public userName:string,
        public email:string,
        public password:string,
        public pais:string,
        public puntuaciones:Array<any>,
        public amigos:Array<any>
    ){}
}
export class Amigo{
    constructor(
        public userName:string,
        public puntuaciones:Array<any>,
    ){}
}