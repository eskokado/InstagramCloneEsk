import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

  constructor(
    private progresso: Progresso
  ) {}

  public publicar(publicacao: any) : void {
    console.log(publicacao)

    let nomeImagem = Date.now()

    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: any) => {
          // acompanhamento de snapshot
          this.progresso.status = 'andamento'
          this.progresso.estado = snapshot
    //      console.log('Snapshot capturado no on()', snapshot)
        },
        (error) => {
          this.progresso.status = 'erro'
          console.log(error)
        },
        () => {
          // finalização do processo
          this.progresso.status = 'concluido'
          console.log('upload completo')
        }
      )
    /*
  firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    .push( { titulo: publicacao.titulo } )
    */
  }
}