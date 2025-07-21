@echo off
echo Starting CleanVote DAO Governance Assistant...
echo.
npx cross-env NODE_ENV=development tsx server/index.ts
pause