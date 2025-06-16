import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardService } from '../shared/flashcard.service';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="flashcardService.flashcards.length > 0">
      <h3>Flashcards</h3>
      <p><strong>Q:</strong> {{ flashcardService.currentCard?.question }}</p>
      <p><strong>A:</strong> {{ flashcardService.currentCard?.answer }}</p>
      <p>Flashcard {{ flashcardService.currentIndex + 1 }} of {{ flashcardService.flashcards.length }}</p>
      <button (click)="prev()" [disabled]="flashcardService.currentIndex === 0">Previous</button>
      <button (click)="next()" [disabled]="flashcardService.currentIndex === flashcardService.flashcards.length - 1">Next</button>
    </div>

    <div *ngIf="flashcardService.flashcards.length === 0">
      <p>No flashcards to display. Please generate a summary.</p>
    </div>
  `
})
export class Flashcards {
  constructor(public flashcardService: FlashcardService) {}

  next() {
    this.flashcardService.next();
  }

  prev() {
    this.flashcardService.previous();
  }
}