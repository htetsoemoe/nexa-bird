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
    EventTouch,
    EventMouse,
    Contact2DType,
    Collider2D,
    IPhysics2DContact,
} from "cc";
const {ccclass, property} = _decorator;

import { Ground } from "./Ground";
import { Results } from "./Results";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";

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
        type: Bird
    })
    public bird: Bird;

    @property({
        type: PipePool
    })
    public pipeQueue: PipePool;

    @property({
        type: CCInteger
    })
    public speed: number = 300;

    @property({
        type: CCInteger
    })
    public pipeSpeed: number = 200;

    public isOver: boolean; 

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
        this.isOver = true;
        director.pause();
    }

    // Listen all of our key-click and mouse-click
    initListener() {
        // Register a callback of a specific input event type.
        // input.on(eventType, callback, target), target means current Input.EventType

        // In part 8: Hit Detection, don't use anymore
        // input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // When user click, the bird need to fly
        this.node.on(Node.EventType.TOUCH_START, () => {
            if (this.isOver == true) {
                this.resetGame();
                this.bird.resetBird();
                this.startGame();
            }

            if (this.isOver == false) {
                this.bird.fly();
            }
        })
    }

    /**
      This method is using for mouse tracking 

    initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);

        // --- Mouse Events (for desktop) ---
        // --- Mouse (Desktop) ---
        this.node.on(Node.EventType.MOUSE_DOWN, (event: EventMouse) => {
            const clickY = event.getLocationY();
            const birdY = this.bird.node.getWorldPosition().y;

            if (clickY > birdY) {
                this.bird.fly();
            } else {
                this.bird.down();
            }
        });
    }
     */

    // TESTING METHOD: DELETE ME IN FINAL VERSION
    // In Part 8: Hit Detection ==> Need to comment out, don't use no more
    // onKeyDown(event: EventKeyboard) {
    //     switch(event.keyCode) {
    //         case KeyCode.KEY_A:
    //             this.gameOver();
    //         break;
    //         case KeyCode.KEY_P:
    //             this.results.addScore();
    //         break;
    //         case KeyCode.KEY_Q: // if game quit, resetGame() and resetBird()
    //             this.resetGame();
    //             this.bird.resetBird();
    //     }
    // }

    startGame() {
        this.results.hideResults();
        director.resume(); // Resume game logic execution after pause, if the current scene is not paused, nothing will happen.
    }

    gameOver() {
        this.results.showResults();
        this.isOver = true;
        director.pause();
    }

    resetGame() {
        this.results.resetScore(); // called updateScore(0) and hideResults()
        this.pipeQueue.reset(); // reset the pipes 
        this.isOver = false;
        this.startGame();
    }

    passPipe() {
        this.results.addScore();
    }

    createPipe() {
        this.pipeQueue.addPool();
    }

    // Collider methods
    contactGroundPipe() {
        let collider = this.bird.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.hitSomething = true;
    }

    birdStruck() {
        this.contactGroundPipe()

        if (this.bird.hitSomething == true) {
            this.gameOver();
        }
    }

    /*
    Update is called every frame, if the Component is enabled. 
    This is a lifecycle method. It may not be implemented in the super class. 
    You can only call its super class method inside it. It should not be called manually elsewhere.

    @param dt — the delta time in seconds it took to complete the last frame
    */
    update() {
        if (this.isOver == false) {
            this.birdStruck();
        }
    }
}