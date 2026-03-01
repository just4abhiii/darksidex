

# App ID Fix

## Problem
Current App ID `app.lovable.90dc76345d6f4890a9339e7a569eb7d1` invalid hai kyunki:
- Dashes allowed nahi hain
- Sirf alphanumeric aur underscore allowed hain
- Java package format chahiye (e.g., `com.example.app`)

## Solution
`capacitor.config.ts` mein App ID ko valid format mein change karunga:

**Old:** `app.lovable.90dc76345d6f4890a9339e7a569eb7d1`
**New:** `com.lovable.ggghg`

## Technical Details
- File: `capacitor.config.ts`
- Line 4 mein `appId` value update hogi
- Baaki sab same rahega

## User ke liye
Fix ke baad dobara yeh commands chalao:
1. `git pull`
2. `npx cap add android`
3. `npm run build`
4. `npx cap sync`
5. `npx cap open android`
