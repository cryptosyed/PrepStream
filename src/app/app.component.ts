import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteInputComponent } from './note-input/note-input.component';
import { FlashcardsComponent } from './flashcards/flashcards.component';
import { SafeHtmlPipe } from './shared/safe-html.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NoteInputComponent, FlashcardsComponent, SafeHtmlPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  summary: string = '';

  // This method clears the old summary when a new generation starts
  onGenerationStarted(): void {
    this.summary = '';
  }

  // This method receives the new summary from the note-input component
  onSummaryGenerated(summary: string): void {
    this.summary = summary;
  }
}