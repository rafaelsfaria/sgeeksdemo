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
    _id: '',
    title: '',
    content: '',
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
            this.deleteNote(note._id);
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

  async editModal(note: Note) {
    const modal = await this.modalController.create({
      component: NoteFormPage,
      componentProps: {
        'note': note,
        'task': 'Edit'
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (typeof data !== 'undefined') {
      note.title = data.note.title;
      note.content = data.note.content;
      this.noteService.updateNote(note)
        .subscribe(updatedNote => {
          const index = this.notes.findIndex(x => x._id === updatedNote._id);
          this.notes.splice(index, 1, updatedNote);
        });
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
    if (typeof data !== 'undefined') {
      this.noteService.addNote(data.note)
      .subscribe(addedNote => this.notes.push(addedNote));
    }
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id)
      .subscribe( _ => {
        const index = this.notes.findIndex(x => x._id === id);
        this.notes.splice(index, 1);
      })
  }
}
