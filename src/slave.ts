import {pid} from "process";
import * as cluster from "cluster";
import * as puppeteer from "puppeteer";

export class Slave {
  private browser: puppeteer.Browser;

  constructor() {
    console.log(`Slave ${pid} started, starting virtual browser`);

    this.warmUp();
  }

  async warmUp(){
    this.browser = await puppeteer.launch();

    cluster.on('listening', () => {
      // Worker is listening
    });
  }
}
