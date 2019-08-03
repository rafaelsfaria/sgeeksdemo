import { Component } from '@angular/core';
import { NoteService } from '../note.service';
import { Note } from '../models/note.model';
import { ModalController, AlertController } from '@ionic/angular';
import { NoteFormPage } from '../note-form/note-form.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notes: Note[] = [];
  emptyNote: Note = {
    __id: '',
    title: '',
    content: ''
  }

  constructor(
    private noteService: NoteService,
    public modalController: ModalController,
    public alertController: AlertController
    ) {
    this.getNotes();
  }

  getNotes() {
  	this.noteService.getNotes()
      .subscribe(notes => this.notes = notes);
  }

  async deleteAlert(note) {
    const alert = await this.alertController.create({
      header: 'Deletar Nota',
      subHeader: note.title,
      message: note.content,
      buttons: [
      {
        text: 'Deletar',
        handler: () => {
          this.deleteNote(note);
        }
      },
      {
        text: 'Cancelar',
        role: 'cancel'
      }
      ]
    });

    await alert.present();
  }

  async editModal(note) {
    const modal = await this.modalController.create({
      component: NoteFormPage,
      componentProps: {
        'note': note,
        'task': 'Edit'
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss(); 
    console.log(data);
    if (data.task == 'Edit') {
      
    }
  }

  async addModal(note = this.emptyNote) {
    const modal = await this.modalController.create({
      component: NoteFormPage,
      componentProps: {
        'note': note,
        'task': 'Create'
      }
    });
    
    await modal.present();
    const { data } = await modal.onDidDismiss(); 
    console.log(data);
    if (data.task == 'Create') {
      this.notes.push(data.note);
    }
  }

  deleteNote(note) {
    const index = this.notes.indexOf(note);
    this.notes.splice(index, 1);
  }
}
