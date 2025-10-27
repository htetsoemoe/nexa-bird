import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdAudio')
export class BirdAudio extends Component {
    @property({
        type: [AudioClip]
    })
    public clips: AudioClip[] = []; // To store audio files

    @property({
        type: AudioSource
    })
    public audioSource: AudioSource = null!; // To play a single audio file

    onAudioQueue(index: number) {
        let clip: AudioClip = this.clips[index]; // Get a specific audioClip from an audio array
        this.audioSource.playOneShot(clip); // Play a specific audioClip with AudioSource
    }
}


