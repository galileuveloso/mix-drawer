import { Team, Player, Map, Match, Game } from '../sorteio/shared';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  constructor() { }
  games: Game[] = [
    new Game("Valorant", '../../../assets/valorant.png'),
    new Game("CSGO", '../../../assets/csgo.png')
  ]

  maps: Map[] = [new Map('Ascent','../../../assets/ascent.jfif', this.games[0]),
  new Map('Bind','../../../assets/bind.jpg', this.games[0]),
  new Map('Haven','../../../assets/haven.jpg', this.games[0]),
  new Map('Icebox','../../../assets/icebox.jfif', this.games[0]),
  new Map('Split','../../../assets/split.jpg', this.games[0]),
  new Map('Mirage','../../../assets/mirage.png', this.games[1]),
  new Map('DustII','../../../assets/dust2.jpg', this.games[1]),
  new Map('Inferno','../../../assets/inferno.jpg', this.games[1]),
  new Map('Overpass','../../../assets/overpass.png', this.games[1]),
  new Map('Train','../../../assets/train.png', this.games[1]),
  new Map('Nuke','../../../assets/nuke.jpg', this.games[1])
];
  ListarTeams(): Team[]
  {
    return localStorage['teams'] ? JSON.parse(localStorage['teams']) : [];
  }

  ListarPlayers(): Player[]
  {
    return localStorage['players'] ? JSON.parse(localStorage['players']) : [];
  }

  ListarMaps(game?: Game): Map[]
  {
    if(game == null)
      return this.maps;
    else
      return this.maps.filter(function(x){if(x.game.nome == game.nome) return x});
  }

  ListarGames(): Game[]
  {
    return this.games;
  }

  AddTeam(team: Team): void
  {
    let teams = this.ListarTeams();
    team.id = new Date().getTime();
    teams.push(team);
    localStorage['teams'] = JSON.stringify(teams);
  }

  RemoveTeam(id: number)
  {
    let teams: Team[] = this.ListarTeams();
    teams = teams.filter(team => team.id !== id);
    localStorage['teams'] = JSON.stringify(teams);
  }


  AddPlayer(player: Player): void
  {
    let players = this.ListarPlayers();
    player.id = new Date().getTime();
    players.push(player);
    localStorage['players'] = JSON.stringify(players);
  }

  RemovePlayer(id: number)
  {
    let players: Player[] = this.ListarPlayers();
    players =players.filter(player => player.id !== id);
    localStorage['players'] = JSON.stringify(players);
  }

  AddMap(map: Map): void
  {
    let maps = this.ListarMaps();
    maps.push(map);
    localStorage['maps'] = JSON.stringify(maps);
  }

  /*RemoveMap(id: number)
  {
    let maps: Map[] = this.ListarMaps();
    maps = maps.filter(map => map.id !== id);
    localStorage['maps'] = JSON.stringify(maps);
  }*/

  Draw(teams: Team[], players: Player[], maps: Map[]): Match
  {
    let map = maps[Math.floor(Math.random() * (maps.length +1))];
    players = this.Shuffle(this.ListarPlayers());
    const intervalo = Math.trunc(players.length / teams.length);
    let i = 0;
    let j = intervalo;
    let out: Player[];
    teams.forEach(team => {
      team.players = players.slice(i,j);
      out = players.slice(j);
      i += intervalo;
      j += intervalo;
    });
    return new Match(teams, map, out);
  }


   Shuffle(array: Player[]) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
}
