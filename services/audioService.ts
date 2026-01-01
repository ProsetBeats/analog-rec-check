
class AudioService {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private createNoiseBuffer() {
    this.init();
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 0.1;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Simulates the mechanical "clack-pop" of a cassette button being depressed or released.
   */
  public playClick(type: 'on' | 'off') {
    this.init();
    if (!this.ctx) return;

    const noiseBuffer = this.createNoiseBuffer();
    if (!noiseBuffer) return;

    const now = this.ctx.currentTime;

    // Helper to play a short mechanical burst
    const playBurst = (time: number, freq: number, volume: number, duration: number) => {
      if (!this.ctx) return;
      
      // Noise burst (The high frequency impact)
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(freq, time);
      
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(volume, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(time);
      noise.stop(time + duration);

      // Thump (The low frequency body resonance)
      const thump = this.ctx.createOscillator();
      const thumpGain = this.ctx.createGain();
      thump.frequency.setValueAtTime(type === 'on' ? 120 : 100, time);
      thump.frequency.exponentialRampToValueAtTime(40, time + duration);
      thumpGain.gain.setValueAtTime(volume * 1.5, time);
      thumpGain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      thump.connect(thumpGain);
      thumpGain.connect(this.ctx.destination);
      thump.start(time);
      thump.stop(time + duration);
    };

    if (type === 'on') {
      // Double click effect: Latch engagement
      playBurst(now, 6000, 0.2, 0.02);
      playBurst(now + 0.025, 3000, 0.3, 0.04);
    } else {
      // Single release pop: Spring return
      playBurst(now, 4500, 0.25, 0.03);
    }
  }

  /**
   * Simulates a heavy solenoid engagement (mechanical "clunk") when the system is ready.
   */
  public playReady() {
    this.init();
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;

    // Deep solenoid clunk
    const clunk = this.ctx.createOscillator();
    const clunkGain = this.ctx.createGain();
    clunk.type = 'square';
    clunk.frequency.setValueAtTime(45, now);
    clunk.frequency.exponentialRampToValueAtTime(30, now + 0.2);
    clunkGain.gain.setValueAtTime(0.3, now);
    clunkGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    clunk.connect(clunkGain);
    clunkGain.connect(this.ctx.destination);
    clunk.start(now);
    clunk.stop(now + 0.2);

    // Second mechanical echo
    const clunk2 = this.ctx.createOscillator();
    const clunk2Gain = this.ctx.createGain();
    clunk2.type = 'sawtooth';
    clunk2.frequency.setValueAtTime(90, now + 0.05);
    clunk2Gain.gain.setValueAtTime(0.1, now + 0.05);
    clunk2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    clunk2.connect(clunk2Gain);
    clunk2Gain.connect(this.ctx.destination);
    clunk2.start(now + 0.05);
    clunk2.stop(now + 0.15);

    // Clean status chime
    const beep = this.ctx.createOscillator();
    const beepGain = this.ctx.createGain();
    beep.frequency.setValueAtTime(880, now + 0.1);
    beepGain.gain.setValueAtTime(0.1, now + 0.1);
    beepGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    beep.connect(beepGain);
    beepGain.connect(this.ctx.destination);
    beep.start(now + 0.1);
    beep.stop(now + 0.6);
  }
}

export const audioService = new AudioService();
