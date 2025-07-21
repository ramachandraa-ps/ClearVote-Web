# Clear Vote - DAO Governance Assistant

A modern web application that helps users analyze DAO proposals using AI-powered insights and voting recommendations.

## Deployment

### Netlify Configuration

When deploying to Netlify, use the following settings:

- **Build command:** `npm run build`
- **Publish directory:** `dist/public`

The repository includes a `_redirects` file in the `client/public` directory that handles SPA routing, ensuring that your application's routes work correctly on Netlify.

## Features

- 🤖 **AI-Powered Analysis** - Smart proposal evaluation with Google Gemini AI
- 📱 **Mobile-First Design** - Responsive interface optimized for all devices
- 🌙 **Dark/Light Themes** - Toggle between modern dark and light modes
- 📊 **Voting Recommendations** - Clear YES/NO guidance with detailed reasoning
- 📈 **Key Insights** - Budget impact, risk level, duration, and category analysis
- 📋 **History Tracking** - Save and review past proposal analyses
- 🔐 **Firebase Ready** - Authentication system ready for deployment

## Prerequisites

- Node.js 18+ installed
- Google Gemini API key
- Firebase project (optional, for authentication)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd dao-governance-assistant
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Required for AI analysis
GEMINI_API_KEY=your_gemini_api_key_here

# Optional - for Firebase authentication
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 3. Get Your API Keys

#### Google Gemini API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Copy it to your `.env` file

#### Firebase Setup (Optional):
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Enable Google Authentication
5. Copy the config values to your `.env` file

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## Visual Studio Code Setup

### 1. Install Recommended Extensions

- **TypeScript and JavaScript Language Features** (built-in)
- **Tailwind CSS IntelliSense** - For better CSS autocomplete
- **ES7+ React/Redux/React-Native snippets** - For React snippets
- **Auto Rename Tag** - For HTML/JSX tag editing
- **Prettier** - For code formatting

### 2. VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### 3. Launch Configuration

Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Dev Server",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/tsx",
      "args": ["server/index.ts"],
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "restart": true,
      "runtimeExecutable": "node"
    }
  ]
}
```

### 4. Terminal Commands in VS Code

Open the integrated terminal (`Ctrl+\``) and run:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express server
│   ├── services/          # External service integrations
│   └── routes.ts          # API route definitions
├── shared/                # Shared types and schemas
└── README.md
```

## Usage

1. **Paste Proposal**: Copy your DAO proposal text into the input area
2. **Analyze**: Click "Summarize Proposal" to get AI analysis
3. **Review Results**: See voting recommendation, summary, and key details
4. **Save/Share**: Use the action buttons to save or share analysis

## Troubleshooting

### API Key Issues
- Ensure your `GEMINI_API_KEY` is correctly set in the `.env` file
- Check that the API key has proper permissions in Google AI Studio

### Port Conflicts
- The app runs on port 5000 by default
- If the port is busy, kill other processes or change the port in `server/index.ts`

### TypeScript Errors
- Run `npm run build` to check for type errors
- Ensure all dependencies are installed with `npm install`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m "Add feature description"`
5. Push and create a pull request

## License

MIT License - see LICENSE file for details