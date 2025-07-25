import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService, GeminiResponse } from '../shared/gemini.service';
import { FlashcardService } from '../shared/flashcard.service';
import { SafeHtmlPipe } from '../shared/safe-html.pipe';

@Component({
  selector: 'app-note-input',
  standalone: true,
  imports: [CommonModule, FormsModule, SafeHtmlPipe],
  templateUrl: './note-input.component.html',
  styleUrls: ['./note-input.component.scss']
})
export class NoteInputComponent {

  @Output() generationStarted = new EventEmitter<void>();
  @Output() summaryGenerated = new EventEmitter<string>();

  noteText = '';
  isLoading = false;
  error: string | null = null;

  constructor(
    private geminiService: GeminiService,
    private flashcardService: FlashcardService
  ) {}

  async onGenerate() {
    if (!this.noteText.trim() || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.generationStarted.emit(); 
    this.flashcardService.clearFlashcards();

    try {
      const result: GeminiResponse = await this.geminiService.getSummaryAndFlashcards(this.noteText);
      if (result && result.summary && result.flashcards) {
        this.summaryGenerated.emit(result.summary); 
        this.flashcardService.setFlashcards(result.flashcards);
      } else {
        throw new Error("Received invalid data from the AI.");
      }
    } catch (err: any) {
      this.error = err.message || 'An unknown error occurred.';
    } finally {
      this.isLoading = false;
    }
  }
}