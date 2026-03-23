/**
 * Test helpers for Clarity contract tests.
 * Provides common setup and assertion utilities.
 */

import { Cl } from "@stacks/transactions";

export const CONTRACT = "flow-vault";

export const ERROR_CODES = {
  NOT_AUTHORIZED: 100,
  INSUFFICIENT_BALANCE: 101,
  INVALID_AMOUNT: 102,
  STACKING_ERROR: 103,
  SBTC_TRANSFER_FAILED: 104,
  VAULT_PAUSED: 105,
  COOLDOWN_ACTIVE: 106,
} as const;

export function depositForUser(
  amount: number,
  sender: string
): ReturnType<typeof simnet.callPublicFn> {
  return simnet.callPublicFn(CONTRACT, "deposit", [Cl.uint(amount)], sender);
}

export function withdrawForUser(
  amount: number,
  sender: string
): ReturnType<typeof simnet.callPublicFn> {
  return simnet.callPublicFn(CONTRACT, "withdraw", [Cl.uint(amount)], sender);
}

export function getUserDeposit(
  user: string,
  caller: string
): ReturnType<typeof simnet.callReadOnlyFn> {
  return simnet.callReadOnlyFn(
    CONTRACT,
    "get-user-deposit",
    [Cl.principal(user)],
    caller
  );
}

export function getVaultStatus(
  caller: string
): ReturnType<typeof simnet.callReadOnlyFn> {
  return simnet.callReadOnlyFn(CONTRACT, "get-vault-status", [], caller);
}

export function pauseVault(deployer: string) {
  return simnet.callPublicFn(CONTRACT, "pause-vault", [], deployer);
}

export function unpauseVault(deployer: string) {
  return simnet.callPublicFn(CONTRACT, "unpause-vault", [], deployer);
}

export function waitCooldown(blocks = 7) {
  simnet.mineEmptyBlocks(blocks);
}
