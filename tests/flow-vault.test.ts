import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("flow-vault", () => {
  it("ensures simnet is initialized", () => {
    expect(simnet.blockHeight).toBeDefined();
  });

  it("allows deposits with valid amount", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "deposit",
      [Cl.uint(1000000)],
      wallet1
    );
    expect(result).toBeOk(Cl.bool(true));
  });

  it("rejects deposits with zero amount", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "deposit",
      [Cl.uint(0)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(102));
  });

  it("tracks user deposit balance", () => {
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(5000000)], wallet1);

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-user-deposit",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(result).toBeUint(5000000);
  });

  it("allows withdrawal up to deposited amount", () => {
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(2000000)], wallet2);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw",
      [Cl.uint(1000000)],
      wallet2
    );
    expect(result).toBeOk(Cl.bool(true));
  });

  it("rejects over-withdrawal", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw",
      [Cl.uint(99999999)],
      wallet2
    );
    expect(result).toBeErr(Cl.uint(101));
  });

  it("only owner can pause vault", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "pause-vault",
      [],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(100));
  });

  it("paused vault rejects deposits", () => {
    simnet.callPublicFn("flow-vault", "pause-vault", [], deployer);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "deposit",
      [Cl.uint(1000000)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(105));
  });

  it("returns vault status", () => {
    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-vault-status",
      [],
      deployer
    );
    const status = result.expectTuple();
    expect(status["total-deposits"]).toBeDefined();
    expect(status["total-rewards"]).toBeDefined();
  });
});
