import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FlashcardService } from '../shared/flashcard.service';
import { Flashcard } from '../shared/gemini.service';

@Component({
  selector: 'app-flashcards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flashcards.component.html',
  styleUrls: ['./flashcards.component.scss']
})
export class FlashcardsComponent implements OnInit, OnDestroy {
  flashcards: Flashcard[] = [];
  currentCardIndex = 0;
  isFlipped = false;
  
  private flashcardsSub!: Subscription;

  constructor(public flashcardService: FlashcardService) {}

  ngOnInit() {
    this.flashcardsSub = this.flashcardService.flashcards$.subscribe(cards => {
      this.flashcards = cards;
      this.currentCardIndex = 0;
      this.isFlipped = false;
    });
  }

  ngOnDestroy() {
    if (this.flashcardsSub) {
      this.flashcardsSub.unsubscribe();
    }
  }

  get currentCard(): Flashcard | undefined {
    return this.flashcards[this.currentCardIndex];
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }

  previousCard() {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.isFlipped = false;
    }
  }

  nextCard() {
    if (this.currentCardIndex < this.flashcards.length - 1) {
      this.currentCardIndex++;
      this.isFlipped = false;
    }
  }
}