"use client";

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentEffect: HTMLAudioElement | null = null;
  private sadViolinAudio: HTMLAudioElement | null = null;
  private celebrationAudio: HTMLAudioElement | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.currentEffect) this.currentEffect.muted = this.isMuted;
    if (this.sadViolinAudio) this.sadViolinAudio.muted = this.isMuted;
    if (this.celebrationAudio) this.celebrationAudio.muted = this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  private playMediaAudio(src: string, volume: number = 0.7, loop: boolean = false): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    try {
      const audio = new Audio(src);
      audio.volume = this.isMuted ? 0 : volume;
      audio.muted = this.isMuted;
      audio.loop = loop;
      audio.play().catch(() => {
        // Auto-play was prevented by browser policy
      });
      return audio;
    } catch {
      return null;
    }
  }

  // Section 2: Seal Open Sound ("chaloo")
  public playChalo() {
    this.stopCurrentEffect();
    this.currentEffect = this.playMediaAudio("/api/memes/chalo.mp3", 0.75);
  }

  // Section 3: Attempt 1 Sound ("awkward")
  public playAwkward() {
    this.stopCurrentEffect();
    this.currentEffect = this.playMediaAudio("/api/memes/awkward.mp3", 0.7);
  }

  // Section 4: Attempt 5 Sound ("dexter")
  public playDexter() {
    this.stopCurrentEffect();
    this.currentEffect = this.playMediaAudio("/api/memes/dexter.mp3", 0.7);
  }

  // Section 5: Attempt 8 Sound ("awww")
  public playAww() {
    this.stopCurrentEffect();
    this.currentEffect = this.playMediaAudio("/api/memes/awwwww.mp3", 0.75);
  }

  // Section 6: Attempt 11 Sound ("meow meow")
  public playMeow() {
    this.stopCurrentEffect();
    this.currentEffect = this.playMediaAudio("/api/memes/meow%20meow%20moew.mp3", 0.75);
  }

  // Section 8: Sad Violin Background Music (looping, non-restarting)
  public playSadViolin() {
    if (this.sadViolinAudio && !this.sadViolinAudio.paused) {
      return; // Already playing, do not duplicate or restart
    }
    this.stopCurrentEffect();
    this.sadViolinAudio = this.playMediaAudio("/api/memes/sad%20voilin.mp3", 0.35, true);
  }

  // Smoothly fade out and stop sad violin
  public fadeOrStopSadViolin(fadeDurationMs: number = 600) {
    if (!this.sadViolinAudio) return;
    const audio = this.sadViolinAudio;
    this.sadViolinAudio = null;

    const startVolume = audio.volume;
    const stepInterval = 50;
    const totalSteps = Math.max(1, Math.floor(fadeDurationMs / stepInterval));
    let currentStep = 0;

    const fadeTimer = setInterval(() => {
      currentStep++;
      const factor = 1 - currentStep / totalSteps;
      if (factor <= 0) {
        clearInterval(fadeTimer);
        audio.pause();
        audio.currentTime = 0;
      } else {
        try {
          audio.volume = Math.max(0, startVolume * factor);
        } catch {
          clearInterval(fadeTimer);
          audio.pause();
        }
      }
    }, stepInterval);
  }

  // Section 9: Final Image & Celebration Song ("Indian song")
  public playIndianSong() {
    this.fadeOrStopSadViolin(300);
    this.stopCurrentEffect();
    if (this.celebrationAudio && !this.celebrationAudio.paused) {
      return; // Already playing
    }
    this.celebrationAudio = this.playMediaAudio("/api/memes/indian-song.mp3", 0.7);
  }

  // Clean up any short effect currently playing
  public stopCurrentEffect() {
    if (this.currentEffect) {
      try {
        this.currentEffect.pause();
        this.currentEffect.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentEffect = null;
    }
  }

  // Stop all rejection audio (called when user clicks Accept)
  public stopAllRejectionSounds() {
    this.stopCurrentEffect();
    this.fadeOrStopSadViolin(300);
  }

  // Full reset
  public stopAll() {
    this.stopCurrentEffect();
    if (this.sadViolinAudio) {
      this.sadViolinAudio.pause();
      this.sadViolinAudio = null;
    }
    if (this.celebrationAudio) {
      this.celebrationAudio.pause();
      this.celebrationAudio = null;
    }
  }

  // Soft, luxurious chime for progressive reveal steps in intro
  public playChime(freq = 528, duration = 1.2) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + 0.1);
      osc.frequency.exponentialRampToValueAtTime(freq, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction; safe to ignore
    }
  }
}

export const sound = new SoundManager();
