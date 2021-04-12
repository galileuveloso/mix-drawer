export class Team
{
    constructor(
        public id?: number,
        public nome?: string,
        public players?: Player[]
    )   {}
}

export class Player
{
    constructor(
        public id?: number,
        public nome?: string
    )   {}
}

export class Map
{
    constructor(
        public nome?: string,
        public src?: string,
        public game?: Game
    )   {}
}

export class Match
{
    constructor(
        public teams: Team[],
        public map: Map,
        public out?: Player[]
    ){}
}

export class Game
{
    constructor(
        public nome?: string,
        public src?: string
    ){}
}