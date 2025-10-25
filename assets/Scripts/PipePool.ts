import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import { Pipes } from './Pipes';

@ccclass('PipePool')
export class PipePool extends Component {
    @property({
        type: Prefab
    })
    public prefabPipes: null;

    @property({
        type: Node
    })
    public pipePoolHome;

    public createPipe;

    // Constructor for creating a pool for a specific node template (usually a prefab).
    // You can pass a component (type or name) argument for handling event for reusing and recycling node.
    // Create a pool
    public pool = new NodePool;

    initPool() {
        let initCount = 3;

        for(let i = 0; i < initCount; i++) {
            // Create a new pipes
            this.createPipe = instantiate(this.prefabPipes); // Instantiate a node from the Prefab.

            if (i == 0) { // for the first times, need to add created first pipes to parent node (pipePoolHome)
                this.pipePoolHome.addChild(this.createPipe); 
            } else { // for second and third times, put those pipes to NodePool
                this.pool.put(this.createPipe);
            }
        }
    }

    addPool() {
        if (this.pool.size() > 0) { // If NodePool size is not zero (nodes exist in NodePool)
            this.createPipe = this.pool.get();
        } else {
            this.createPipe = instantiate(this.prefabPipes); // If NodePool is empty, create new pipe node
        }
        this.pipePoolHome.addChild(this.createPipe); // Add created pipes node to parent node (pipePoolHome)
    }

    reset() {
        this.pipePoolHome.removeAllChildren();
        this.pool.clear();
        this.initPool();
    }
}


