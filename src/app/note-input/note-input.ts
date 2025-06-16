import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlashcardService } from '../shared/flashcard.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-note-input',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
  <form (ngSubmit)="onSubmit()" class="note-form">
    <label>
      <span>Your Notes</span>
      <textarea
        [(ngModel)]="noteText"
        name="noteText"
        required
        rows="6"
        placeholder="Paste your notes here..."
      ></textarea>
    </label>

    <button type="submit" [disabled]="loading">
      {{ loading ? 'Summarizing...' : 'Generate Summary' }}
    </button>
  </form>

  <div *ngIf="summary" class="summary-box">
    <h3>Summary</h3>
    <p>{{ summary }}</p>
  </div>
`
})
export class NoteInput {
  noteText = '';
  summary = '';
  loading = false;

  constructor(private flashcardService: FlashcardService) {}

  async onSubmit() {
    if (!this.noteText.trim()) return;
    this.loading = true;
    this.summary = '';

    try {
      const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${environment.huggingFaceKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: this.noteText })
      });

      const result = await response.json();
      const output = result?.[0]?.summary_text;

      this.summary = output || 'Could not summarize this.';
      if (output) this.flashcardService.generateFlashcards(this.summary);

    } catch (err) {
      console.error('Error summarizing:', err);
      this.summary = 'An error occurred.';
    } finally {
      this.loading = false;
    }
  }
}