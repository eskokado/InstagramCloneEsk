import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';

import { Bd } from '../../bd.service'
import { Progresso } from '../../progresso.service'

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public email: string
  public imagem: any

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  })

  constructor(
    private bd: Bd,
    private progresso: Progresso
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    })
    console.log('Status no publicar ', this.progresso.status)
    console.log('Estado no publicar', this.progresso.estado)
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }
}
