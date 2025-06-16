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
    <form (ngSubmit)="onSubmit()" style="margin-bottom: 2rem;">
      <textarea
        [(ngModel)]="noteText"
        name="noteText"
        placeholder="Paste your notes here..."
        rows="6"
        required
        style="width: 100%; padding: 1rem; font-size: 1rem;"
      ></textarea>
      <br />
      <button type="submit" [disabled]="loading" style="margin-top: 1rem;">
        {{ loading ? 'Summarizing...' : 'Summarize' }}
      </button>
    </form>

    <div *ngIf="summary">
      <h3>Summary:</h3>
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