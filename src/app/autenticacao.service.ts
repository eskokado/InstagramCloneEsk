import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';

export class Autenticacao {
  public cadastarUsuario(usuario: Usuario): void {
    firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
      .then((resposta: any) => {
        console.log(resposta)
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }
}