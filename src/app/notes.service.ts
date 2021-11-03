import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  baseUrl: string = 'https://routeegypt.herokuapp.com/';

  constructor(private _HttpClient: HttpClient) {}

  addNotes(noteDta: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `addNote`, noteDta);
  }

  getAllNotes(noteDta: object): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `getUserNotes`, noteDta);
  }

  updateNote(noteDta: object): Observable<any> {
    return this._HttpClient.put(this.baseUrl + `updateNote`, noteDta);
  }

  deleteNote(noteDta: any):Observable<any> {

    let options:object ={
      headers:new HttpHeaders({}),
      body:{
        NoteID:noteDta.NoteID,
        token:noteDta.token,
      }
    }
    return this._HttpClient.delete(this.baseUrl + `deleteNote`, options);
  }
}
