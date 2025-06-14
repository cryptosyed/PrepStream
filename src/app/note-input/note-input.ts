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
      ></textarea>
      <br />
      <button type="submit" [disabled]="loading">
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
  noteText = '';   // User's raw note input
  summary = '';    // AI-generated summary of notes
  loading = false; // Tracks loading state during API call

  constructor(private flashcardService: FlashcardService) {}

  async onSubmit() {
    // Skip empty submissions
    if (!this.noteText.trim()) return;
    this.loading = true;
    this.summary = '';

    try {
      // Call Hugging Face API for summarization
      const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-cnn', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${environment.huggingFaceKey}`, // stored securely in env file
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputs: this.noteText })
      });

      const result = await response.json();
      console.log('Hugging Face API response:', result);

      // Extract summary text from response
      const output = result?.[0]?.summary_text;
      this.summary = output || 'Could not summarize this.';
      this.flashcardService.generateFlashcards(this.summary);  // Generate flashcards from summary

    } catch (err) {
      console.error('Error summarizing:', err);
      this.summary = 'An error occurred.';
    } finally {
      this.loading = false;
    }
  }
}