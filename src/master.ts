import {fork, on, Worker} from "cluster";

export class Master {
  private slaves: Worker[] = [];

  constructor(){
    console.log('Generated Master, creating listener');

    for (let i = 0; i < 2; i++) {
      const slave = fork();
      this.slaves.push(slave);
    }

    on('exit', (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  }
}
