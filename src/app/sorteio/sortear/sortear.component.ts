import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'src/app/services/drawer.service';
import { Map, Match, Player, Team, Game } from '../shared';
import * as $ from 'jquery';

@Component({
  selector: 'app-sortear',
  templateUrl: './sortear.component.html',
  styleUrls: ['./sortear.component.css']
})
export class SortearComponent implements OnInit {

  constructor(private drawerService: DrawerService) { }

  player : Player;
  team : Team;
  map : Map;
  match: Match;
  maps: Map[];
  game: Game;
  

  playersCadastrados : Player[];
  teamsCadastrados : Team[];
  mapsCadastrados : Map[];
  games: Game[];

  ngOnInit(): void {
    this.player = new Player(0, "");
    this.team = new Team(0, "");
    this.map = new Map("", null);
    this.match = new Match([], null,[]);
    this.game = new Game("Valorant",null);
    this.playersCadastrados = this.drawerService.ListarPlayers();
    this.teamsCadastrados = this.drawerService.ListarTeams();
    this.mapsCadastrados = [];
    this.maps = this.drawerService.ListarMaps(this.game);
    this.games = this.drawerService.ListarGames();
  }
  AddPlayersCollapse(): void
  {
    this.ToogleIconCollapse('playerscollapse', 'iconplayerscollapse');
  }

  CancelAddPlayer(): void 
  {
    $('#playerscollapse').fadeToggle();
    this.player.nome = "";
  }
  
  AddPlayer(): void
  {
    if(this.player.nome != ""){
      this.drawerService.AddPlayer(this.player);
      this.playersCadastrados = this.drawerService.ListarPlayers();
      this.player.nome = "";
    }
  }

  RemovePlayer(id: number){
    this.drawerService.RemovePlayer(id);
    this.playersCadastrados = this.drawerService.ListarPlayers();
  }

  AddTeam(): void
  {
    if(this.team.nome != ""){
      this.drawerService.AddTeam(this.team);
      this.teamsCadastrados = this.drawerService.ListarTeams();
      this.team.nome = "";
    }
  }

  CancelAddTeam(): void
  {
    $('#teamcollapse').fadeToggle();
    this.team.nome = "";
  }

  AddTeamCollapse(): void{
    this.ToogleIconCollapse('teamcollapse','iconteamscollapse');
  }

  RemoveTeam(id: number){
    this.drawerService.RemoveTeam(id);
    this.teamsCadastrados = this.drawerService.ListarTeams();
  }

  AddMap(): void
  {
    this.drawerService.AddMap(this.map);
    this.mapsCadastrados = this.drawerService.ListarMaps();
    this.map.nome = "";
  }

  Draw(): void
  {
    this.match = this.drawerService.Draw(this.teamsCadastrados, this.playersCadastrados, this.mapsCadastrados);
  }

  Clear(): void
  {
    this.mapsCadastrados = [];
    this.playersCadastrados = [];
    this.teamsCadastrados = [];
  }

  MapsCollapse(): void
  {
    this.ToogleIconCollapse('mapscollapse','iconmapscollapse');
  
  }

  SelectMap(mapa: Map): void
  {
    if(this.MapaCadastrado(mapa) === true){
      $('#map'+mapa.nome).removeClass('select');
      if(this.mapsCadastrados.indexOf(mapa) === 0){
        this.mapsCadastrados.shift();
      }else{
        this.mapsCadastrados.splice(this.mapsCadastrados.indexOf(mapa), 1);
      }
    }else{
      $('#map'+mapa.nome).addClass('select');
      this.mapsCadastrados.push(mapa);
    }
  }

  SelectGame(idigm: string) : void
  {
    this.game.nome = idigm;
    this.maps = this.drawerService.ListarMaps(this.game);
  }

  MapaCadastrado(mapa: Map): boolean
  {
    let retorno = false;
    this.mapsCadastrados.forEach(maps => {
      if(maps.nome == mapa.nome)
        retorno = true;
    });
    return retorno;
  } 

  VerificaClassSelect(map: Map): string
  {
    if(this.mapsCadastrados.indexOf(map) > -1)
      return "select";
    else
      return "";
  }

  VerificaClassSelectGame(game: Game): string
  {
    if(this.game.nome == game.nome)
      return "selectgame";
    else
      return "";
  }

  ToogleIconCollapse(div: string, icon:string): void
  {
    $('#'+div).fadeToggle();
    if($('#'+icon).hasClass('glyphicon-chevron-down')){
      $('#'+icon).removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
      if(div == 'mapscollapse')
        $('#alert-player').addClass('collapse');
    }
    else{
      $('#'+icon).removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
      if(div == 'mapscollapse')
        $('#alert-player').removeClass('collapse');
    }
  }

  TamanhoDiv(): string
  {
    return (12 / this.match.teams.length).toString()[0]; 
  }

  MostraOpcaoSorteio(): boolean {
    if (this.teamsCadastrados.length > 0 && this.mapsCadastrados.length > 0 && this.playersCadastrados.length > 0)
      return true;
    return false;
  }

}
