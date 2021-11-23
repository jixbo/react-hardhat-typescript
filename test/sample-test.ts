import { ethers } from "hardhat";
import chai from "chai";
import { Greeter__factory, Greeter } from "../typechain-types";
const { expect } = chai;

describe("Greeter", () => {
  let greeter: Greeter;
  before(async () => {
    const signers = await ethers.getSigners();
    const greeterFactory = await ethers.getContractFactory("Greeter") as Greeter__factory;
    greeter = await greeterFactory.deploy("Hello, world!");
    await greeter.deployed();
  });
  it("Should return the new greeting once it's changed", async function () {


    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
