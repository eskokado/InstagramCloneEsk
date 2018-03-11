import * as firebase from 'firebase';

export class Bd {
  public publicar(publicacao: any) : void {
    console.log(publicacao)

    let nomeImagem = Date.now()

    firebase.storage().ref()
      .child(`imagens/${nomeImagem}`)
      .put(publicacao.imagem)
      .on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: any) => {
          // acompanhamento de snapshot
          console.log(snapshot)
        },
        (error) => {
          console.log(error)
        },
        () => {
          // finalização do processo
          console.log('upload completo')
        }
      )
    /*
  firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
    .push( { titulo: publicacao.titulo } )
    */
  }
}