# How to Download and Run CleanVote in Visual Studio Code

## Step 1: Download the Project Files

Since you're getting a package.json error, you need to get the complete project files first. Here are your options:

### Option A: Download from Replit (Recommended)
1. In this Replit tab, click the **3 dots menu** (⋯) in the top right
2. Click **"Download as zip"**
3. Extract the zip file to `C:\Users\varsh\Downloads\DaoSummary\`
4. Open that folder in VS Code

### Option B: Manual File Creation
If download doesn't work, I can help you create all the files manually in VS Code.

## Step 2: Open in Visual Studio Code

1. Open VS Code
2. Click **"File > Open Folder"**
3. Navigate to `C:\Users\varsh\Downloads\DaoSummary\`
4. Click **"Select Folder"**

## Step 3: Verify Files

You should see these files in VS Code:
```
DaoSummary/
├── package.json          ← This file was missing!
├── client/
├── server/
├── shared/
├── README.md
└── .env.example
```

## Step 4: Install Dependencies

Open VS Code terminal (`Ctrl + ` ` or View > Terminal):
```bash
npm install
```

## Step 5: Set Up Environment

1. Copy `.env.example` to `.env`
2. Get your API key from https://aistudio.google.com/app/apikey
3. Add it to `.env`:
```
GEMINI_API_KEY=your_api_key_here
```

## Step 6: Run the App

### For Windows Users:
Option 1 - Double-click the batch file:
```
start-windows.bat
```

Option 2 - Use the terminal with cross-env:
```bash
npx cross-env NODE_ENV=development tsx server/index.ts
```

Option 3 - Use the npm script (now Windows-compatible):
```bash
npm run dev
```

### For Mac/Linux Users:
```bash
npm run dev
```

Visit: http://localhost:5000

---

## If Download Doesn't Work

I can create all the project files manually for you. Just let me know and I'll guide you through creating each file step by step in VS Code.

## Need Help?

If you run into any issues:
1. Make sure Node.js is installed (download from nodejs.org)
2. Ensure you're in the correct folder with package.json
3. Check that all files downloaded properly

The error you got means the package.json file wasn't found, which contains all the project information and dependencies.