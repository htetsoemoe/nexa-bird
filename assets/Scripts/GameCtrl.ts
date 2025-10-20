import { 
    _decorator, 
    CCInteger, 
    Component, 
    Node, 
    input, 
    Input, 
    EventKeyboard, 
    KeyCode,
    director,
} from "cc";
const {ccclass, property} = _decorator;

import { Ground } from "./Ground";
import { Results } from "./Results";

@ccclass('GameCtrl')
export class GameCtrl extends Component {

    @property({
        type: Ground,
        tooltip: 'this is ground'
    })
    public ground: Ground;

    @property({
        type: Results,
        tooltip: "results is here"
    })
    public results: Results;

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 200;

    // When lode the game
    /**
     When attaching to an active node or its node first activated. 
     onLoad is always called before any start functions, this allows you to order initialization 
     of scripts. This is a lifecycle method. It may not be implemented in the super class. 
     You can only call its super class method inside it. It should not be called manually elsewhere.
     */
    onLoad() {
        this.initListener();
        this.results.resetScore();
        director.pause();
    }

    // Listen all of our key-click and mouse-click
    initListener() {
        // Register a callback of a specific input event type.
        // input.on(eventType, callback, target), target means current Input.EventType
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    // TESTING METHOD: DELETE ME IN FINAL VERSION
    onKeyDown(event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.gameOver();
            break;
            case KeyCode.KEY_P:
                this.results.addScore();
            break;
            case KeyCode.KEY_Q:
                this.resetGame();
        }
    }

    startGame() {
        this.results.hideResults();
        director.resume(); // Resume game logic execution after pause, if the current scene is not paused, nothing will happen.
    }

    gameOver() {
        this.results.showResults();
        director.pause();
    }

    resetGame() {
        this.results.resetScore(); // called updateScore(0) and hideResults()
        this.startGame();
    }
}