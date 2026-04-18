# @sab/admin

Internal moderation and account-administration console (UC-25, UC-26).
Phase 0 ships a landing shell; Phase 6 wires Supabase Auth with mandatory
MFA (TOTP), the moderation queue, account actions, and the append-only
audit log UI.

## Run

```bash
pnpm --filter @sab/admin dev       # http://localhost:3001
```

## Access

Internal users only. Not distributed to breweries or end-users; alcohol
content rules (BR-2, BR-20) still apply to what is displayed within this
console.
