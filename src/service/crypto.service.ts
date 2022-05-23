import {createHash} from "crypto";
import {BlockEntity} from "../entities";

export default class CryptoService {
  static calculateHash(block: BlockEntity): string {
    const data = JSON.stringify(block.data);
    const blockData =
      data +
      block.previousHash +
      block.timestamp.toISOString() +
      block.pow.toString();
    return createHash("sha256").update(blockData).digest("hex");
  }
}
