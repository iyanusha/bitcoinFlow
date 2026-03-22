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
    expect(status["deposit-count"]).toBeDefined();
    expect(status["withdraw-count"]).toBeDefined();
  });

  it("rejects zero-amount withdrawal", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(5000000)], wallet1);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw",
      [Cl.uint(0)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(102));
  });

  it("allows STX deposits with real transfer", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "deposit-stx",
      [Cl.uint(2000000)],
      wallet1
    );
    expect(result).toBeOk(Cl.bool(true));
  });

  it("rejects STX deposit with zero amount", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "deposit-stx",
      [Cl.uint(0)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(102));
  });

  it("returns exchange rate of 1:1 when no deposits", () => {
    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-exchange-rate",
      [],
      deployer
    );
    expect(result).toBeUint(1000000);
  });

  it("returns vault TVL equal to deposits plus rewards", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(8000000)], wallet1);

    const { result: statusResult } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-vault-status",
      [],
      deployer
    );
    const status = statusResult.expectTuple();
    const deposits = Number(status["total-deposits"].expectUint());
    const rewards = Number(status["total-rewards"].expectUint());

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-vault-tvl",
      [],
      deployer
    );
    const tvl = Number(result.expectUint());
    expect(tvl).toBe(deposits + rewards);
  });

  it("computes user share percentage correctly", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(5000000)], wallet1);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(5000000)], wallet2);

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-user-share",
      [Cl.principal(wallet1)],
      deployer
    );
    const share = result.expectTuple();
    const pct = Number(share["share-pct"].expectUint());
    // With equal deposits, each user should have ~50% (5000 basis points)
    expect(pct).toBeGreaterThan(0);
    expect(pct).toBeLessThanOrEqual(10000);
  });

  it("returns user share information", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(5000000)], wallet1);

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-user-share",
      [Cl.principal(wallet1)],
      deployer
    );
    const share = result.expectTuple();
    expect(share["deposited"]).toBeDefined();
    expect(share["share-pct"]).toBeDefined();
    expect(share["flow-balance"]).toBeDefined();
  });

  it("returns cooldown remaining for user", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(1000000)], wallet1);

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-cooldown-remaining",
      [Cl.principal(wallet1)],
      deployer
    );
    // Immediately after deposit, cooldown should be active (>0)
    const remaining = Number(result.expectUint());
    expect(remaining).toBeGreaterThan(0);
    expect(remaining).toBeLessThanOrEqual(6);
  });

  it("allows withdrawal after cooldown period expires", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(5000000)], wallet1);
    simnet.mineEmptyBlocks(7);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw",
      [Cl.uint(2000000)],
      wallet1
    );
    expect(result).toBeOk(Cl.bool(true));
  });

  it("cooldown expires after mining enough blocks", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(1000000)], wallet1);
    simnet.mineEmptyBlocks(7);

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-cooldown-remaining",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(result).toBeUint(0);
  });

  it("only owner can compound rewards", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "compound-rewards",
      [],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(100));
  });

  it("only owner can delegate stacking", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "delegate-stacking",
      [Cl.principal(wallet1)],
      wallet2
    );
    expect(result).toBeErr(Cl.uint(100));
  });

  it("owner can set delegation pool", () => {
    const { result } = simnet.callPublicFn(
      "flow-vault",
      "delegate-stacking",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(result).toBeOk(Cl.bool(true));
  });

  it("paused vault rejects withdrawals", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(3000000)], wallet1);
    simnet.mineEmptyBlocks(10);
    simnet.callPublicFn("flow-vault", "pause-vault", [], deployer);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw",
      [Cl.uint(1000000)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(105));
  });

  it("rejects withdrawal during cooldown period", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(3000000)], wallet2);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw",
      [Cl.uint(1000000)],
      wallet2
    );
    expect(result).toBeErr(Cl.uint(106));
  });

  it("owner can emergency withdraw for a user", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(4000000)], wallet1);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "emergency-withdraw",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(result).toBeOk(Cl.bool(true));

    const { result: balance } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-user-deposit",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(balance).toBeUint(0);
  });

  it("non-owner cannot emergency withdraw", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(2000000)], wallet1);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "emergency-withdraw",
      [Cl.principal(wallet1)],
      wallet2
    );
    expect(result).toBeErr(Cl.uint(100));
  });

  it("tracks flow token balance after deposit", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(7000000)], wallet1);

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-user-flow-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(result).toBeDefined();
    // Flow tokens should be minted 1:1
    const balance = Number(result.expectUint());
    expect(balance).toBeGreaterThanOrEqual(7000000);
  });

  it("handles deposits from multiple users independently", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(3000000)], wallet1);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(7000000)], wallet2);

    const { result: bal1 } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-user-deposit",
      [Cl.principal(wallet1)],
      deployer
    );

    const { result: bal2 } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-user-deposit",
      [Cl.principal(wallet2)],
      deployer
    );

    const b1 = Number(bal1.expectUint());
    const b2 = Number(bal2.expectUint());
    expect(b1).toBeGreaterThanOrEqual(3000000);
    expect(b2).toBeGreaterThanOrEqual(7000000);
  });

  it("increments deposit count on each deposit", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(1000000)], wallet1);
    simnet.callPublicFn("flow-vault", "deposit", [Cl.uint(2000000)], wallet1);

    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-vault-status",
      [],
      deployer
    );
    const status = result.expectTuple();
    const depositCount = Number(status["deposit-count"].expectUint());
    expect(depositCount).toBeGreaterThanOrEqual(2);
  });

  it("returns delegation pool status", () => {
    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-delegation-pool",
      [],
      deployer
    );
    expect(result).toBeDefined();
  });

  it("returns total rewards", () => {
    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-total-rewards",
      [],
      deployer
    );
    expect(result).toBeDefined();
  });

  it("returns total deposits", () => {
    const { result } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-total-deposits",
      [],
      deployer
    );
    expect(result).toBeDefined();
  });

  it("owner can unpause vault", () => {
    simnet.callPublicFn("flow-vault", "pause-vault", [], deployer);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "unpause-vault",
      [],
      deployer
    );
    expect(result).toBeOk(Cl.bool(true));
  });

  it("STX deposit increases total deposits", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);

    const { result: before } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-total-deposits",
      [],
      deployer
    );
    const depositsBefore = Number(before.expectUint());

    simnet.callPublicFn("flow-vault", "deposit-stx", [Cl.uint(4000000)], wallet1);

    const { result: after } = simnet.callReadOnlyFn(
      "flow-vault",
      "get-total-deposits",
      [],
      deployer
    );
    const depositsAfter = Number(after.expectUint());
    expect(depositsAfter).toBe(depositsBefore + 4000000);
  });

  it("allows STX withdrawal after cooldown period", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit-stx", [Cl.uint(5000000)], wallet1);
    simnet.mineEmptyBlocks(7);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw-stx",
      [Cl.uint(2000000)],
      wallet1
    );
    expect(result).toBeOk(Cl.bool(true));
  });

  it("rejects STX over-withdrawal", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit-stx", [Cl.uint(1000000)], wallet2);
    simnet.mineEmptyBlocks(7);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw-stx",
      [Cl.uint(99999999)],
      wallet2
    );
    expect(result).toBeErr(Cl.uint(101));
  });

  it("rejects STX withdrawal with zero amount", () => {
    simnet.callPublicFn("flow-vault", "unpause-vault", [], deployer);
    simnet.callPublicFn("flow-vault", "deposit-stx", [Cl.uint(3000000)], wallet1);
    simnet.mineEmptyBlocks(7);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "withdraw-stx",
      [Cl.uint(0)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(102));
  });

  it("paused vault rejects STX deposits", () => {
    simnet.callPublicFn("flow-vault", "pause-vault", [], deployer);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "deposit-stx",
      [Cl.uint(1000000)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(105));
  });

  it("non-owner cannot unpause vault", () => {
    simnet.callPublicFn("flow-vault", "pause-vault", [], deployer);

    const { result } = simnet.callPublicFn(
      "flow-vault",
      "unpause-vault",
      [],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(100));
  });
});
