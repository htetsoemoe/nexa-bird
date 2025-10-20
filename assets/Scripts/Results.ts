import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({
        type: Label
    })
    public scoreLabel: Label; // The Label Component

    @property({
        type: Label
    })
    public highScore: Label;

    @property({
        type: Label
    })
    public resultEnd: Label;

    // Score value
    maxScore: number = 0;
    currentScore: number;

    updateScore(num: number) {
        this.currentScore = num;
        this.scoreLabel.string = ("" + this.currentScore);
    }

    resetScore() {
        this.updateScore(0);
        this.hideResults();
    }

    addScore() {
        this.updateScore(this.currentScore + 1);
    }

    showResults() {
        this.maxScore = Math.max(this.maxScore, this.currentScore);
        this.highScore.string = "High Score: " + this.maxScore;

        // The node this component is attached to. A component is always attached to a node.
        // Show resultEnd component which exist in Node (Current_Score)
        this.resultEnd.node.active = true; 
        this.highScore.node.active = true;
    }

    hideResults() {
        this.highScore.node.active = false;
        this.resultEnd.node.active = false;
    }
}
