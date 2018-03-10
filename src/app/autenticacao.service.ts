import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';

export class Autenticacao {
  public cadastarUsuario(usuario: Usuario): void {
    //console.log('Chegamos até o serviço: ', usuario)

    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {

        // remove a senha do atributo senha do objeto usuário
        delete usuario.senha

        // registrando dados complementares do usuário no path email na base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set( usuario )


      })
      .catch((error: Error) => {
        console.log(error)
      })
  }
}