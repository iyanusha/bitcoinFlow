import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";
import { CONTRACT } from "./helpers";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;

describe("read-only functions", () => {
  it("get-exchange-rate returns 1:1 with no deposits", () => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-exchange-rate",
      [],
      deployer
    );
    expect(result).toBeUint(1000000);
  });

  it("get-vault-tvl returns uint", () => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-vault-tvl",
      [],
      deployer
    );
    const tvl = Number(result.expectUint());
    expect(tvl).toBeGreaterThanOrEqual(0);
  });

  it("get-cooldown-remaining returns uint for any user", () => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-cooldown-remaining",
      [Cl.principal(wallet1)],
      deployer
    );
    const remaining = Number(result.expectUint());
    expect(remaining).toBeGreaterThanOrEqual(0);
    expect(remaining).toBeLessThanOrEqual(6);
  });

  it("get-user-deposit returns 0 for new user", () => {
    const wallet8 = accounts.get("wallet_8")!;
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-user-deposit",
      [Cl.principal(wallet8)],
      deployer
    );
    expect(result).toBeUint(0);
  });

  it("get-user-flow-balance returns 0 for new user", () => {
    const wallet8 = accounts.get("wallet_8")!;
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-user-flow-balance",
      [Cl.principal(wallet8)],
      deployer
    );
    expect(result).toBeUint(0);
  });

  it("get-vault-status returns tuple with 8 fields", () => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-vault-status",
      [],
      deployer
    );
    const status = result.expectTuple();
    const keys = Object.keys(status);
    expect(keys).toContain("total-deposits");
    expect(keys).toContain("total-rewards");
    expect(keys).toContain("stx-balance");
    expect(keys).toContain("last-compound");
    expect(keys).toContain("paused");
    expect(keys).toContain("current-block");
    expect(keys).toContain("deposit-count");
    expect(keys).toContain("withdraw-count");
  });

  it("get-user-share returns tuple with 3 fields", () => {
    const { result } = simnet.callReadOnlyFn(
      CONTRACT,
      "get-user-share",
      [Cl.principal(wallet1)],
      deployer
    );
    const share = result.expectTuple();
    const keys = Object.keys(share);
    expect(keys).toContain("deposited");
    expect(keys).toContain("share-pct");
    expect(keys).toContain("flow-balance");
  });
});
