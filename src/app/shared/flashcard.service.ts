import { Injectable } from '@angular/core';

export interface Flashcard {
  question: string;
  answer: string;
}

@Injectable({ providedIn: 'root' })
export class FlashcardService {
  flashcards: Flashcard[] = [];
  currentIndex = 0;

  generateFlashcards(text: string) {
    this.flashcards = [
      { question: 'What is the main idea?', answer: 'Mock answer 1' },
      { question: 'List one key point.', answer: 'Mock answer 2' }
    ];
    this.currentIndex = 0;
  }

  get currentCard() {
    return this.flashcards[this.currentIndex];
  }

  next() {
    if (this.currentIndex < this.flashcards.length - 1) this.currentIndex++;
  }

  previous() {
    if (this.currentIndex > 0) this.currentIndex--;
  }
}