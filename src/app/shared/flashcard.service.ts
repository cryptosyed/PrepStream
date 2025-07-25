import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flashcard } from './gemini.service';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private readonly _flashcards = new BehaviorSubject<Flashcard[]>([]);
  readonly flashcards$ = this._flashcards.asObservable();

  get flashcards(): Flashcard[] {
    return this._flashcards.getValue();
  }

  setFlashcards(flashcards: Flashcard[]) {
    this._flashcards.next(flashcards);
  }

  clearFlashcards() {
    this._flashcards.next([]);
  }
}
