import { ethers } from "hardhat";
import chai from "chai";

//chai.use(chaiAsPromised);
const { expect } = chai;

describe("Mining", () => {

  it("Mining several blocks works with autmining off", async () => {
    await ethers.provider.send("evm_setAutomine", [false]);
    let block = await ethers.provider.getBlockNumber();
    await mineBlocks(10);
    expect(block + 10).to.eq(await ethers.provider.getBlockNumber());
  });

  it("Automining on does not work", async () => {
    await ethers.provider.send("evm_setAutomine", [true]);
    let block = await ethers.provider.getBlockNumber();
    await mineBlocks(10);
    expect(block + 10).to.eq(await ethers.provider.getBlockNumber());
  });

  async function mineBlocks(blocks: number) {
    for (let index = 0; index < blocks; index++) {
      await ethers.provider.send("evm_mine", []);
    }
  }
});
