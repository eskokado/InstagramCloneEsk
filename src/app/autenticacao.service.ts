import { Usuario } from "./acesso/usuario.model";

export class Autenticacao {
  public cadastarUsuario(usuario: Usuario): void {
    console.log('Chegamos até o servico: ', usuario)
  }
}