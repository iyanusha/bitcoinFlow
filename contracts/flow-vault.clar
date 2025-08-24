;; title: BitcoinFlow Vault
;; version: 1.0.0
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
(define-constant CONTRACT-OWNER tx-sender)
(define-constant STACKING-THRESHOLD u10000000) ;; 10 STX minimum for stacking

;; data vars
(define-data-var total-deposits uint u0)
(define-data-var total-rewards uint u0)
(define-data-var stx-balance uint u0)
(define-data-var delegation-pool (optional principal) none)
(define-data-var last-compound-cycle uint u0)

;; data maps
(define-map user-deposits principal uint)
(define-map user-flow-tokens principal uint)

;; public functions
(define-public (deposit (amount uint))
  (begin
    (asserts! (> amount u0) ERR-INVALID-AMOUNT)
    ;; Transfer sBTC from user to vault (placeholder for sBTC integration)
    (map-set user-deposits tx-sender 
      (+ (default-to u0 (map-get? user-deposits tx-sender)) amount))
    (var-set total-deposits (+ (var-get total-deposits) amount))
    ;; Mint flow tokens 1:1 ratio for now
    (ft-mint? flow-token amount tx-sender)
  )
)

(define-public (withdraw (amount uint))
  (let ((user-balance (default-to u0 (map-get? user-deposits tx-sender))))
    (asserts! (>= user-balance amount) ERR-INSUFFICIENT-BALANCE)
    (map-set user-deposits tx-sender (- user-balance amount))
    (var-set total-deposits (- (var-get total-deposits) amount))
    ;; Burn flow tokens
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
  (let ((current-cycle (get-burn-block-info? header-hash (- burn-block-height u1))))
    (begin
      (asserts! (is-eq tx-sender CONTRACT-OWNER) ERR-NOT-AUTHORIZED)
      ;; Placeholder for reward calculation and compounding
      ;; In real implementation, would calculate stacking rewards and reinvest
      (var-set total-rewards (+ (var-get total-rewards) u1000)) ;; Mock reward
      (var-set last-compound-cycle burn-block-height)
      (ok (var-get total-rewards))
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
    last-compound: (var-get last-compound-cycle)
  }
)

;; private functions
;;

