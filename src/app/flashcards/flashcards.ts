import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardService } from '../shared/flashcard.service';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="flashcardService.currentCard">
      <h3>Flashcards</h3>
      <p><strong>Q:</strong> {{ flashcardService.currentCard.question }}</p>
      <p><strong>A:</strong> {{ flashcardService.currentCard.answer }}</p>
      <button (click)="prev()">Previous</button>
      <button (click)="next()">Next</button>
    </div>
  `
})
export class Flashcards {
  constructor(public flashcardService: FlashcardService) {}
  next() { this.flashcardService.next(); }
  prev() { this.flashcardService.previous(); }
}