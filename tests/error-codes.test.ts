import { describe, expect, it } from "vitest";
import { Cl } from "@stacks/transactions";
import { ERROR_CODES, CONTRACT } from "./helpers";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("error code mapping", () => {
  it("ERR-NOT-AUTHORIZED maps to u100", () => {
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "pause-vault",
      [],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(ERROR_CODES.NOT_AUTHORIZED));
  });

  it("ERR-INVALID-AMOUNT maps to u102", () => {
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "deposit",
      [Cl.uint(0)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(ERROR_CODES.INVALID_AMOUNT));
  });

  it("ERR-VAULT-PAUSED maps to u105", () => {
    simnet.callPublicFn(CONTRACT, "pause-vault", [], deployer);
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "deposit",
      [Cl.uint(1000000)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(ERROR_CODES.VAULT_PAUSED));
  });

  it("ERR-COOLDOWN-ACTIVE maps to u106", () => {
    simnet.callPublicFn(CONTRACT, "unpause-vault", [], deployer);
    simnet.callPublicFn(CONTRACT, "deposit", [Cl.uint(3000000)], wallet2);

    const { result } = simnet.callPublicFn(
      CONTRACT,
      "withdraw",
      [Cl.uint(1000000)],
      wallet2
    );
    expect(result).toBeErr(Cl.uint(ERROR_CODES.COOLDOWN_ACTIVE));
  });

  it("ERR-INSUFFICIENT-BALANCE maps to u101", () => {
    simnet.mineEmptyBlocks(7);
    const { result } = simnet.callPublicFn(
      CONTRACT,
      "withdraw",
      [Cl.uint(99999999)],
      wallet1
    );
    expect(result).toBeErr(Cl.uint(ERROR_CODES.INSUFFICIENT_BALANCE));
  });
});
