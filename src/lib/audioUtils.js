/**
 * Utility to generate and play a professional notification sound
 * using the Web Audio API (no external file needed).
 */

class NotificationSound {
  constructor() {
    this.audioContext = null;
    this.isMuted = false;
  }

  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  async unlock() {
    this.init();
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
      console.log('AudioContext unlocked via user gesture');
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
  }

  async play() {
    if (this.isMuted) return;
    
    this.init();
    
    // Resume context if suspended (browser security)
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Subtle "ping" sound configuration
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, this.audioContext.currentTime); // A5
    oscillator.frequency.exponentialRampToValueAtTime(440, this.audioContext.currentTime + 0.1); // A4
    
    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, this.audioContext.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }
}

export const soundManager = new NotificationSound();
