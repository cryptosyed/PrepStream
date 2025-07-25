PrepStream ✨
PrepStream is a modern, AI-powered study application designed to help you learn smarter, not harder. Simply paste your notes, and PrepStream will generate a concise summary and a set of interactive flashcards using the power of the Google Gemini API.

(Note: You can replace this with a screenshot of your running application)

🚀 Key Features
AI-Powered Summaries: Get the key takeaways from long texts instantly.

Automatic Flashcard Generation: Create a deck of study cards from your notes with a single click.

Interactive Studying: Flip flashcards to reveal answers and track your progress.

Sleek, Modern UI: A beautiful, responsive, dark-themed interface that's easy on the eyes.

🛠️ Tech Stack
Front-End: Angular (v17+)

Styling: Tailwind CSS

Language: TypeScript

AI Integration: Google Gemini API

⚙️ Setup and Installation
Follow these steps to get PrepStream running on your local machine.

1. Prerequisites
   Make sure you have Node.js (which includes npm) and the Angular CLI installed on your system.

2. Clone the Repository
   git clone [https://github.com/your-username/prepstream-angular-app.git](https://github.com/your-username/prepstream-angular-app.git)
   cd prepstream-angular-app

3. Install Dependencies
   Run the following command in the project's root directory to install all the necessary packages:

npm install

4. Set Up Your API Key
   This is a crucial step for the AI features to work.

Navigate to the src/environments/ folder.

You will find a file named environment.development.ts. Open it.

Replace the placeholder text 'YOUR_GEMINI_API_KEY_HERE' with your actual Google Gemini API key.

// src/environments/environment.development.ts
export const environment = {
production: false,
geminiApiKey: 'YOUR_GEMINI_API_KEY_HERE' // <-- PASTE YOUR KEY HERE
};

(Optional) For production builds, do the same in the environment.ts file.

Security Note: The environment files are included in the .gitignore file to prevent your API key from being accidentally committed to a public repository.

▶️ How to Run the Application
Once the setup is complete, you can start the local development server with this command:

ng serve

Now, open your web browser and navigate to http://localhost:4200/. The application should be running!

📂 Project Structure
The project follows a standard Angular structure, with the main logic organized as follows:

src/app/
├── flashcards/ # Handles the display and interaction of flashcards
├── note-input/ # Manages the user's text input and the "Generate" button
└── shared/ # Contains services and pipes used across the app
├── flashcard.service.ts # Manages flashcard state
└── gemini.service.ts # Handles all communication with the Gemini API

Happy studying!

Made with ❤️ by Syed Muzammil
