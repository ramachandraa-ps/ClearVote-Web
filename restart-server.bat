@echo off
echo Creating .env file with your Gemini API key...
copy env-config.txt .env
echo .env file created successfully!
echo.
echo Starting CleanVote DAO Governance Assistant...
npx cross-env NODE_ENV=development tsx server/index.ts
pause 