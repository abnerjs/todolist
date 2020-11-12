import { Component } from '@angular/core';
import { StorageService } from '../service/storage.service';

interface Tarefa {
  id: number;
  descricao: string;
  concluida: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public tarefa: Tarefa = {} as any;
  public tarefas: Tarefa[] = [];

  constructor(private storage: StorageService) {
    this.storage.recuperar('tarefas').then((data: any) => {
      if (data != null) {
        this.tarefas = data;
      } else {
        this.tarefas = [];
      }
    });
  }

  adicionar() {
    this.tarefa.id = new Date().getTime();
    this.tarefa.concluida = false;
    this.tarefas.push(this.tarefa);
    console.log(this.tarefas);
    this.tarefa = {} as any;

    this.storage.armazenar('tarefas', this.tarefas);
  }

  finalizar(id: number) {
    const t = this.tarefas.find((item) => {
      if (item.id === id) {
        return item;
      }
    });

    t.concluida = !t.concluida;
    this.storage.armazenar('tarefas', this.tarefas);
  }

  excluir(id: number) {
    this.tarefas = this.tarefas.filter((item) => {
      return item.id !== id;
    });
  }
}
