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
    const sentences = text
      .split('.')
      .map(s => s.trim())
      .filter(Boolean);

    this.flashcards = [];

    for (let i = 0; i < Math.min(sentences.length, 5); i++) {
      const sentence = sentences[i];

      let question = '';
      if (sentence.toLowerCase().startsWith('it')) {
        question = `What is ${sentence.split(' ')[1]}?`;
      } else if (sentence.includes(' because ')) {
        question = `Why ${sentence.split(' because ')[0]}?`;
      } else if (sentence.toLowerCase().includes('used')) {
        question = `What is ${sentence.split(' ')[0]} used for?`;
      } else {
        question = `Explain: ${sentence.split(' ')[0]}...`;
      }

      this.flashcards.push({
        question,
        answer: sentence
      });
    }

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