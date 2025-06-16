import { Component } from '@angular/core';
import { NoteInput } from './note-input/note-input';
import { Flashcards } from './flashcards/flashcards';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NoteInput, Flashcards],
  template: `
  <main class="app-container">
    <div class="card">
      <header class="header">
        <h1>PrepStream</h1>
        <p>Summarize and study smarter</p>
      </header>

      <app-note-input></app-note-input>
      <hr />
      <app-flashcards></app-flashcards>
    </div>
  </main>
`
})
export class App {}