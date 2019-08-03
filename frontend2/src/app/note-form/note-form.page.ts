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

  noteForm = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  constructor(
  	public modalController: ModalController,
    public navParams: NavParams,
    private fb: FormBuilder
  	) { }

  async close(submitted = false) {
    if (submitted) {
      this.note.title = this.noteForm.value.title;
      this.note.content = this.noteForm.value.content;
      await this.modalController.dismiss({
        'note': this.note,
        'task': this.task
      });
    } else {
      await this.modalController.dismiss({
        'task': 'Cancel'
      });
    }
  }
}
