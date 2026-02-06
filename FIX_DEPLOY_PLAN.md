# GitHub Pages White Screen Fix Plan

## Problem
The deployed site shows a white screen. This is often caused by:
1.  **Legacy React Mounting**: Using `react-dom`'s `render` with React 18.
2.  **Configuration Mismatch**: `package.json` points to an old homepage URL.

## Changes

### 1. Refactor `src/index.tsx`
Update to React 18's `createRoot` API.
```tsx
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.css';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
```

### 2. Update `package.json`
Correct the homepage URL to match the current organization.
- **Old**: `https://andychuks51.github.io/Tiles_N_Fitts_React-App/`
- **New**: `https://digital-tech-scribe.github.io/Tiles_N_Fitts_React-App/`

## Execution
1.  Apply code changes.
2.  Commit and push to `main`.
3.  GitHub Actions will auto-deploy.

## Verification
- User to check the URL after deployment (approx 2-3 mins).
