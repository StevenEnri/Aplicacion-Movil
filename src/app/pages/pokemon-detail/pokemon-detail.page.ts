import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvolutionChain, EvolutionChainDetails } from 'src/app/models/evolucion.model';

import { GetapiService } from 'src/app/movil/getapi.service';


@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
 
  details: any;

  statsSum = 0;

  evolutionChain: EvolutionChain;
  evolutionChainDetailsList: EvolutionChainDetails[];

  categories: string = 'about'

  constructor(private actRoute: ActivatedRoute, private pokemonService: GetapiService) { }

  ngOnInit() {
    const params = this.actRoute.snapshot.params;
    if(params && params.index){
      this.pokemonService.getPokeDetails(params.index).subscribe((res: any)=>{
        this.details = res;
        const stats: {base_stat: number}[] = this.details.stats;

        stats.forEach(stat =>{
          this.statsSum+= stat.base_stat;
        });
      });

      this.pokemonService.getSpecies(params.index).subscribe((specie: any)=>{
        if(specie && specie.evolution_chain?.url){
          this.pokemonService.getEvolutionChain(specie.evolution_chain.url).subscribe(res =>{
            this.evolutionChain = res;
            this.processEvolutionChain();
          });
        }
      });
    }
  }

  private processEvolutionChain(){
    let evoData = this.evolutionChain.chain;
    this.evolutionChainDetailsList = [];

    do {
      var evoDetails = evoData['evolution_details'][0];

      const pokemonIndex = Number(evoData.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""));
    
      this.evolutionChainDetailsList.push({
        speciesName: evoData.species.name,
        minlevel: !evoDetails ? 1 : evoDetails.min_level,
        triggerName: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
        pokemonIndex: pokemonIndex
      });
    
      evoData = evoData['evolves_to'][0];
    } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
  }



}