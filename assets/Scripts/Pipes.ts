import { _decorator, Component, Node, Vec3, screen, find, UITransform } from 'cc';
const { ccclass, property } = _decorator;

// Random for pipe position
const random = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

@ccclass('Pipes')
export class Pipes extends Component {
    @property({
        type: Node,
        tooltip: 'Top Pipe'
    })
    public topPipe: Node;

    @property({
        type: Node,
        tooltip: 'Bottom Pipe'
    })
    public bottomPipe: Node;

    public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0);
    public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0);
    public scene = screen.windowSize;

    public game; // Speed of the pipes from the GameCtrl
    public pipeSpeed: number; // Final speed of the pipes
    public tempSpeed: number; // Temporary speed

    isPass: boolean; // check bird pass the pipes

    onLoad() {
        // to eliminate `Circular Dependency` between Pipes and GameCtrl
        this.game = find("GameCtrl").getComponent("GameCtrl"); // find() Finds a node by hierarchy path, the path is case-sensitive.
        this.pipeSpeed = this.game.pipeSpeed;
        this.initPos();
        this.isPass = false;
    }

    initPos() {
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);
        this.tempStartLocationDown.x = (this.topPipe.getComponent(UITransform).width + this.scene.width);

        let gap = random(90, 100);
        let topHeight = random(0, 450);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10));

        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);
    }

    /**
     Update is called every frame, if the Component is enabled. This is a lifecycle method. 
     It may not be implemented in the super class. You can only call its super class method inside it. 
     It should not be called manually elsewhere.
     */
    update(deltaTime: number) {

        this.tempSpeed = this.pipeSpeed * deltaTime;

        this.tempStartLocationDown = this.bottomPipe.position;
        this.tempStartLocationUp = this.topPipe.position;

        // Move top and bottom pipes to left based on tempSpeed
        this.tempStartLocationDown.x -= this.tempSpeed;
        this.tempStartLocationUp.x -= this.tempSpeed;

        // Re-position top and bottom pipes
        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);

        if (this.isPass == false && this.topPipe.position.x <= 0) {
            this.isPass = true;
            this.game.passPipe();        
        }

        if (this.topPipe.position.x < (0 - this.scene.width)) {
            this.game.createPipe();
            this.destroy(); // If the pipes pass -460, we need to destroy the pipes
        }
    }
}


