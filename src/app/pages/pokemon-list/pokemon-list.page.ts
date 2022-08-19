import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, Platform } from '@ionic/angular';
import { GetapiService } from 'src/app/movil/getapi.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.page.html',
  styleUrls: ['./pokemon-list.page.scss'],
})
export class PokemonListPage implements OnInit {
  pokenListy: any[] = [];
  offset: number = 0;

  backTop: boolean;
  @ViewChild(IonContent) content: IonContent
  constructor(private pokeApi: GetapiService, private platform: Platform) { }

  ngOnInit() {

    this.pokeApi.getdataList().subscribe((data: any) => {
      this.pokenListy = data;
      console.log(this.pokenListy);
    })


  }

  loadData($event) {
    this.offset += 25;

    this.pokeApi.getdataList(this.offset).subscribe((res: any[]) => {
      $event.target.complete();
      this.pokenListy = this.pokenListy.concat(res)


    })

  }

  logScrolling($event: { detail: { scrollTop: number } }) {
    if ($event.detail.scrollTop > this.platform.height()) {
      this.backTop = true
    } else {
      this.backTop = false
    }


  }

  goToTop(){
    this.content.scrollToTop(1000);
  }

}
