import { NotesService } from './../notes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

declare let $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  token = localStorage.getItem('userToken');
  citizenID: string = '';
  dataService: any = '';
  error: string = '';
  constructor(
    private _AuthService: AuthService,
    private _NotesService: NotesService
  ) {
    //wanna take dta from localstorage
    this.dataService = this._AuthService.userDta.getValue();
  }

  ngOnInit(): void {
    this.getAllNotes();
  }
  //add notesForm

  addNotesForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  });

  //add notes

  SubmitAddNotes(addNotesForm: FormGroup) {
    let noteDta: Object = {
      title: addNotesForm.value.title,
      desc: addNotesForm.value.desc,
      citizenID: this.dataService._id,
      token: this.token,
    };

    if (addNotesForm.valid) {
      this._NotesService.addNotes(noteDta).subscribe((response) => {
        if (response.message == 'success') {
          this.getAllNotes();
          $('#exampleModal').modal('hide');
        }
      });
    }
  }

  //getNotes

  getNoteArray: any[] = [];

  getAllNotes() {
    let getNotesDta: Object = {
      userID: this.dataService._id,
      token: this.token,
    };
    this._NotesService.getAllNotes(getNotesDta).subscribe((response) => {
      this.getNoteArray = response.Notes;
    });
  }

  //updateNotes

  userID: string = '';

  edit(note: string) {
    this.userID = note;
  }

  upDataNoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  });

  setValue() {
    for (let i = 0; i < this.getNoteArray.length; i++) {
      if (this.getNoteArray[i]._id == this.userID) {
        this.upDataNoteForm.controls.title.setValue(this.getNoteArray[i].title);
        this.upDataNoteForm.controls.desc.setValue(this.getNoteArray[i].desc);
      }
    }
  }
  SubmitUpdataNote(upDataNoteForm: FormGroup) {
    let updtaNoteData: object = {
      title: upDataNoteForm.value.title,
      desc: upDataNoteForm.value.desc,
      token: this.token,
      NoteID: this.userID,
    };
    if (upDataNoteForm.valid) {
      this._NotesService.updateNote(updtaNoteData).subscribe((response) => {
        if (response.message == 'updated') {
          this.getAllNotes();
          $('#exampleModalUpdata').modal('hide');
        }
      });
    }
  }

  //deleteNote

  delete(delNote: string) {
    this.userID = delNote;
  }

  deleteNote() {
    let deleteNoteData: object = {
      NoteID: this.userID,
      token: this.token,
    };
    this._NotesService.deleteNote(deleteNoteData).subscribe((response) => {
      if (response.message == 'deleted') {
        this.getAllNotes();
        $('#exampleModaldelete').modal('hide');
      }
    });
  }
}
