import { Component } from '@angular/core';
import { NoteInput } from './note-input/note-input';
import { Flashcards } from './flashcards/flashcards';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NoteInput, Flashcards],
  template: `
    <main style="max-width: 800px; margin: auto; padding: 2rem; font-family: Arial;">
      <h1 style="text-align: center; font-size: 2rem; margin-bottom: 2rem;">PrepStream</h1>
      <app-note-input></app-note-input>
      <app-flashcards></app-flashcards>
    </main>
  `
})
export class App {}