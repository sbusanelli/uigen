# Repository Setup Instructions

## Git Configuration

### 1. Global Git Ignore Setup
To ensure all your future repositories ignore common IDE and system files, set up a global gitignore:

```bash
# Create global gitignore file
git config --global core.excludesfile ~/.gitignore_global

# Add common patterns to ~/.gitignore_global
echo ".vscode/
.DS_Store
*.pem
.env*.local
node_modules/
coverage/
.next/
out/
build/
*.tsbuildinfo
" > ~/.gitignore_global
```

### 2. Repository Initialization Script
Create this script to initialize new repositories with proper gitignore:

```bash
#!/bin/bash
# setup-repo.sh

# Create .gitignore with essential patterns
cat > .gitignore << 'EOF'
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem
.vscode

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prisma
/prisma/dev.db
/prisma/dev.db-journal
EOF

# Initialize git repository
git init
git add .
git commit -m "Initial commit with proper .gitignore"

echo "Repository initialized with .gitignore"
```

### 3. Usage
For new repositories, run:
```bash
# Make the script executable
chmod +x setup-repo.sh

# Run it in your new project directory
./setup-repo.sh
```

### 4. Alternative: Copy Template
Copy the `.gitignore-template` from this repo to new projects:
```bash
cp /path/to/uigen/.gitignore-template .gitignore
```

## Why Include .vscode?
- Prevents personal VS Code settings from being shared
- Avoids workspace-specific extensions conflicts
- Keeps repository clean of IDE-specific files
- Maintains consistency across different development environments

## Additional Recommendations
1. Use global gitignore for personal/system files
2. Use project-specific gitignore for build artifacts and dependencies
3. Consider adding `.idea/` for JetBrains IDE users
4. Add `*.log` for general log files
