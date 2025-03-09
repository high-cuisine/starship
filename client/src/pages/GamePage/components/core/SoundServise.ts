import audioCoin from '../../../../assets/audio/sonic-ring-sound.ogg';
import shot from '../../../../assets/audio/shot.mp3';
import eventBus from './EventBus';

class SoundService {
    isSoundOn = true;
    coinAudio = new Audio(audioCoin);
    audioShot = new Audio(shot);

    constructor() {
        eventBus.on('activeSound', (sound: 'shoot' | 'coin') => {
            switch (sound) {
                case 'shoot':
                    this.shootSound();
                    break;
                case 'coin':
                    this.coinSound();
                    break;
            }
        });
    }

    start(defaultState:boolean) {
        eventBus.emit('changeState', defaultState ? 'on' : 'off')
        this.isSoundOn = defaultState
    }

    soundChangeState(state: boolean) {
        this.isSoundOn = state;
    }

    coinSound() {
        if (!this.isSoundOn) return;
        this.coinAudio.volume = 0.6;
        this.coinAudio.play();
    }

    shootSound() {
        if (!this.isSoundOn) return;
        this.audioShot.volume = 0.2;
        this.audioShot.play();
    }
}

export default new SoundService();
