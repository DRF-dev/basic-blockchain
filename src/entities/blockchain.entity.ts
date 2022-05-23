import BlockEntity from "./block.entity";
import {CryptoService} from "../service";

export default class BlockchainEntity {
  genesisBlock: any;
  chain: BlockEntity[];
  difficulty: any;

  constructor(genesisBlock: any, chain: BlockEntity[], difficulty: any) {
    this.genesisBlock = genesisBlock;
    this.chain = chain;
    this.difficulty = difficulty;
  }

  static create(difficulty: number) {
    const genesisBlock = new BlockEntity({from: '', to: '', amount: 0}, null); //the genesis block has no data i.e. null
    return new BlockchainEntity(genesisBlock, [genesisBlock], difficulty);
  }

  addBlock(from: string, to: string, amount: number) {
    const blockData = { from, to, amount };
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock = new BlockEntity(blockData, lastBlock.hash);
    newBlock.mine(this.difficulty);
    this.chain.push(newBlock);
  }

  isValid() {
    if (this.chain.length === 1) {
      return true
    }

    for (let index = 1; index < this.chain.length; index++) {
      const currentBlock = this.chain[index];
      const previousBlock = this.chain[index - 1];

      if (currentBlock.hash !== CryptoService.calculateHash(currentBlock) ||
        previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }
    }
    return true;
  }
}
