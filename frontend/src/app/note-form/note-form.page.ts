import { Component, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Note } from '../models/note.model';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.page.html',
})
export class NoteFormPage {

  @Input() note: Note;
  @Input() task: String;

  placeholder: {
    title: String,
    content: String,
  } = {
      title: 'Título',
      content: 'Conteúdo',
    };

  noteForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
    public modalController: ModalController,
    public navParams: NavParams,
    private fb: FormBuilder
  ) {  }

  ionViewDidEnter() {
    if (this.task === 'Edit') {
      this.placeholder.title = this.note.title;
      this.placeholder.content = this.note.content;
    }
  }

  async close() {
    await this.modalController.dismiss({
      'note': this.noteForm.value,
    });
  }

  async cancel() {
    await this.modalController.dismiss();
  }
}
