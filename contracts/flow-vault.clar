;; title: BitcoinFlow Vault
;; version: 2.0.0
;; summary: A liquid stacking vault for sBTC auto-compounding
;; description: Users deposit sBTC, vault stakes underlying STX for rewards, auto-compounds and issues liquid tokens

;; traits
;;

;; token definitions
(define-fungible-token flow-token)

;; constants
(define-constant ERR-NOT-AUTHORIZED (err u100))
(define-constant ERR-INSUFFICIENT-BALANCE (err u101))
(define-constant ERR-INVALID-AMOUNT (err u102))
(define-constant ERR-STACKING-ERROR (err u103))
(define-constant ERR-SBTC-TRANSFER-FAILED (err u104))
(define-constant ERR-VAULT-PAUSED (err u105))
(define-constant CONTRACT-OWNER tx-sender)
(define-constant STACKING-THRESHOLD u10000000) ;; 10 STX minimum for stacking
(define-constant WITHDRAWAL-COOLDOWN u6) ;; ~1 hour cooldown between deposit and withdraw
(define-constant ERR-COOLDOWN-ACTIVE (err u106))
;; sBTC token contract (testnet placeholder)
(define-constant SBTC-TOKEN-CONTRACT 'SP000000000000000000002Q6VF78.sbtc-token)

;; data vars
(define-data-var total-deposits uint u0)
(define-data-var total-rewards uint u0)
(define-data-var stx-balance uint u0)
(define-data-var delegation-pool (optional principal) none)
(define-data-var last-compound-cycle uint u0)
(define-data-var vault-paused bool false)
(define-data-var total-deposit-count uint u0)
(define-data-var total-withdraw-count uint u0)

;; data maps
(define-map user-deposits principal uint)
(define-map user-flow-tokens principal uint)
(define-map user-last-deposit principal uint)

;; public functions
(define-public (deposit (amount uint))
  (begin
    (asserts! (not (var-get vault-paused)) ERR-VAULT-PAUSED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    ;; Transfer sBTC from user to vault (placeholder for sBTC integration)
    (map-set user-deposits tx-sender
      (+ (default-to u0 (map-get? user-deposits tx-sender)) amount))
    (var-set total-deposits (+ (var-get total-deposits) amount))
    (map-set user-last-deposit tx-sender block-height)
    (var-set total-deposit-count (+ (var-get total-deposit-count) u1))
    ;; Mint flow tokens 1:1 ratio for now
    (ft-mint? flow-token amount tx-sender)
  )
)

(define-public (withdraw (amount uint))
  (let ((user-balance (default-to u0 (map-get? user-deposits tx-sender))))
    (asserts! (not (var-get vault-paused)) ERR-VAULT-PAUSED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (asserts! (>= user-balance amount) ERR-INSUFFICIENT-BALANCE)
    (asserts! (>= (- block-height (default-to u0 (map-get? user-last-deposit tx-sender)))
                  WITHDRAWAL-COOLDOWN) ERR-COOLDOWN-ACTIVE)
    (map-set user-deposits tx-sender (- user-balance amount))
    (var-set total-deposits (- (var-get total-deposits) amount))
    (var-set total-withdraw-count (+ (var-get total-withdraw-count) u1))
    ;; Burn flow tokens
    (ft-burn? flow-token amount tx-sender)
  )
)

(define-public (deposit-stx (amount uint))
  (begin
    (asserts! (not (var-get vault-paused)) ERR-VAULT-PAUSED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (try! (stx-transfer? amount tx-sender (as-contract tx-sender)))
    (var-set stx-balance (+ (var-get stx-balance) amount))
    (map-set user-deposits tx-sender
      (+ (default-to u0 (map-get? user-deposits tx-sender)) amount))
    (var-set total-deposits (+ (var-get total-deposits) amount))
    (map-set user-last-deposit tx-sender block-height)
    (var-set total-deposit-count (+ (var-get total-deposit-count) u1))
    (ft-mint? flow-token amount tx-sender)
  )
)

(define-public (withdraw-stx (amount uint))
  (let ((user-balance (default-to u0 (map-get? user-deposits tx-sender))))
    (asserts! (not (var-get vault-paused)) ERR-VAULT-PAUSED)
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    (asserts! (>= user-balance amount) ERR-INSUFFICIENT-BALANCE)
    (asserts! (>= (- block-height (default-to u0 (map-get? user-last-deposit tx-sender)))
                  WITHDRAWAL-COOLDOWN) ERR-COOLDOWN-ACTIVE)
    (try! (as-contract (stx-transfer? amount tx-sender tx-sender)))
    (map-set user-deposits tx-sender (- user-balance amount))
    (var-set total-deposits (- (var-get total-deposits) amount))
    (var-set stx-balance (- (var-get stx-balance) amount))
    (var-set total-withdraw-count (+ (var-get total-withdraw-count) u1))
    (ft-burn? flow-token amount tx-sender)
  )
)

(define-public (delegate-stacking (pool-address principal))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set delegation-pool (some pool-address))
    (ok true)
  )
)

(define-public (stack-aggregated-stx (amount uint))
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (>= (var-get stx-balance) STACKING-THRESHOLD) ERR-INSUFFICIENT-BALANCE)
    ;; Placeholder for actual stacking delegation
    ;; In real implementation, would call stacking functions
    (var-set stx-balance (- (var-get stx-balance) amount))
    (ok amount)
  )
)

(define-public (compound-rewards)
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (asserts! (not (var-get vault-paused)) ERR-VAULT-PAUSED)
    (asserts! (> (var-get total-deposits) u0) ERR-INSUFFICIENT-BALANCE)
    ;; Calculate rewards proportional to total deposits and elapsed blocks
    (let ((blocks-since-last (- block-height (var-get last-compound-cycle)))
          (reward-amount (/ (* (var-get total-deposits) blocks-since-last) u100000)))
      (var-set total-rewards (+ (var-get total-rewards) reward-amount))
      (var-set last-compound-cycle block-height)
      (ok reward-amount)
    )
  )
)

;; read only functions
(define-read-only (get-user-deposit (user principal))
  (default-to u0 (map-get? user-deposits user))
)

(define-read-only (get-total-deposits)
  (var-get total-deposits)
)

(define-read-only (get-user-flow-balance (user principal))
  (ft-get-balance flow-token user)
)

(define-read-only (get-delegation-pool)
  (var-get delegation-pool)
)

(define-read-only (get-total-rewards)
  (var-get total-rewards)
)

(define-read-only (get-vault-status)
  {
    total-deposits: (var-get total-deposits),
    total-rewards: (var-get total-rewards),
    stx-balance: (var-get stx-balance),
    last-compound: (var-get last-compound-cycle),
    paused: (var-get vault-paused),
    current-block: block-height
  }
)

(define-read-only (get-user-share (user principal))
  (let ((user-deposit (default-to u0 (map-get? user-deposits user)))
        (deposits (var-get total-deposits)))
    {
      deposited: user-deposit,
      share-pct: (if (is-eq deposits u0) u0 (/ (* user-deposit u10000) deposits)),
      flow-balance: (ft-get-balance flow-token user)
    }
  )
)

(define-read-only (get-vault-tvl)
  (+ (var-get total-deposits) (var-get total-rewards))
)

(define-read-only (get-exchange-rate)
  (let ((deposits (var-get total-deposits))
        (rewards (var-get total-rewards)))
    (if (is-eq deposits u0)
      u1000000 ;; 1:1 ratio when no deposits (6 decimal precision)
      (/ (* (+ deposits rewards) u1000000) deposits)
    )
  )
)

;; Pause vault operations
(define-public (pause-vault)
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set vault-paused true)
    (ok true)
  )
)

;; Unpause vault operations
(define-public (unpause-vault)
  (begin
    (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
    (var-set vault-paused false)
    (ok true)
  )
)

;; Emergency withdraw all for a user (admin only)
(define-public (emergency-withdraw (user principal))
  (let ((user-balance (default-to u0 (map-get? user-deposits user))))
    (begin
      (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
      (asserts! (> user-balance u0) ERR-INSUFFICIENT-BALANCE)
      (map-set user-deposits user u0)
      (var-set total-deposits (- (var-get total-deposits) user-balance))
      (ft-burn? flow-token user-balance user)
    )
  )
)

;; private functions
;;

