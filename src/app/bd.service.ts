import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Progresso } from './progresso.service';

@Injectable()
export class Bd {

  constructor(
    private progresso: Progresso
  ) {}

  public publicar(publicacao: any) : void {
//    console.log(publicacao)

//    let nomeImagem = Date.now()

    firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    .push( { titulo: publicacao.titulo } )
    .then((resposta: any) => {
//      console.log(resposta)
      let nomeImagem = resposta.key

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
  //        console.log(error)
        },
        () => {
          // finalização do processo
          this.progresso.status = 'concluido'
//          console.log('upload completo')
        }
      )
    })
 
  }

  public consultaPublicacoes(emailUsuario: string): Promise<any> {

    return new Promise((resolve, reject) => {
      // consultar publicações da database
      firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          console.log(snapshot.val())
          let publicacoes: Array<any> = [];

          snapshot.forEach((childSnapshot: any) => {

            let publicacao = childSnapshot.val()

            // consultar a url da imagem (storage)
            firebase.storage().ref()
              .child(`imagens/${childSnapshot.key}`)
              .getDownloadURL()
              .then((url: string) => {
                //console.log(url)
                publicacao.url_imagem = url
                // consultar o nome do usuário
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    //console.log(snapshot.val().nome_usuario)
                    publicacao.nome_usuario = snapshot.val().nome_usuario

                    publicacoes.push(publicacao)
                  })
                
              })
          });
          // console.log(publicacoes)
          resolve(publicacoes)
        })
    })

  }

}