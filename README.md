# Personalized Freshers' Welcome Invitation Experience

A premium, highly interactive, cinematic, and personalized digital invitation experience created for university faculty members.

## Features
- **Personalized URL Routing**: Dynamic invitations tailored per faculty member (e.g. `/invite/7xK92Lm` for Dr. Rajesh Sharma).
- **Cinematic Entrance Experience**: Progressive multi-step story reveal with university identity, event identity, personalized reveal, and an interactive 3D wax seal to unseal.
- **Editorial Main Invitation**: Designed with deep obsidian card aesthetics, champagne gold accents, warm ivory typography, and high-readability schedule cards.
- **Witty Rejection Interaction & Memes**: A 15-stage escalating rejection journey featuring authentic faculty memes mapped to each witty Hindi-in-English response.
- **Audio Soundscape**: Event-synchronized audio triggers including unseal sound, reaction sound bites (`awkward`, `dexter`, `awww`, `meow`), sad violin background, and final Indian celebration music.
- **Accept Celebration**: Gold and ivory confetti celebration, VIP faculty entry pass, and Google Calendar sync.

## Project Structure
- `frontend/`: Next.js 16 (App Router), TypeScript, Tailwind CSS, Framer Motion, Canvas Confetti, Lucide Icons.
- `memes and sounds/`: Original meme illustrations and audio assets served dynamically.

## Getting Started
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) or test faculty routes like [http://localhost:3000/invite/7xK92Lm](http://localhost:3000/invite/7xK92Lm).
