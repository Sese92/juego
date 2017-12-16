export class User{
    constructor(
        public userName:string,
        public email:string,
        public password:string,
        public pais:string,
        public puntuacion:Array<number>,
        public amigos:Array<Amigo>
    ){}
}
export class Amigo{
    constructor(
        public userName:string,
        public puntuacion:number
    ){}
}

export class cordenadar{
    constructor(
        public latitud:string,
        public longitud:number
    ){}
}