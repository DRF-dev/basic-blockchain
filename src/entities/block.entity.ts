import {CryptoService} from "../service";

export default class BlockEntity {
  data: { from: string; to: string; amount: number };
  hash: string;
  previousHash: any;
  timestamp: Date;
  pow: number;

  constructor(data: { from: string; to: string; amount: number }, previousHash: any) {
    this.data = data;
    this.hash = '';
    this.previousHash = previousHash;
    this.timestamp = new Date();
    this.pow = 0;
  }

  mine(difficulty: any) {
    const regex = new RegExp(`^(0){${difficulty}}.*`);
    while (!this.hash.match(regex)) {
      this.pow++;
      this.hash = CryptoService.calculateHash(this);
    }
  }
}
