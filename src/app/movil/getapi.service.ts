import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class GetapiService {

  urlAPI = environment.pokemonApi.baseUrl
  
  constructor(private http: HttpClient) { 

  }
  getdataList(offset=0){
  return  this.http.get(`${environment.pokemonApi.baseUrl}/pokemon?offset=${offset}&limit=25`)
  .pipe(
    map(result =>{
      return result['results']
    }),
    map(pokemon =>{
      return pokemon.map((poke, index)=>{
        poke.image=this.getPokeImage(offset + index +1);
        poke.pokeIndex = offset + index +1
        return poke;
      })
    })
  )
  }
  getPokeImage(index: number){
    return `${environment.pokemonApi.imageUrl}/${index}.png`
    
  }
}



  




