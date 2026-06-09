# 🤖 UIGen AI Agent Documentation

## Overview

UIGen's AI agent is a sophisticated system built on Anthropic's Claude that can generate, edit, and manage React components through natural language conversation. This document details the agent's capabilities, tools, and architecture.

## 🎯 Mission

The UIGen AI agent's mission is to transform natural language descriptions into production-ready React components with full project management capabilities.

## 🛠️ Available Tools

### 1. File Manager Tool (`file_manager`)

**Purpose**: Handle file and directory operations in the virtual file system.

**Capabilities**:
- `rename`: Move or rename files and directories
- `delete`: Remove files and directories

**Usage Examples**:
```
Rename "component.tsx" to "Button.tsx"
Delete the old "backup" folder
Move "styles.css" to "src/styles/"
```

**Parameters**:
```typescript
{
  command: "rename" | "delete",
  path: string,
  new_path?: string  // Only for rename
}
```

### 2. Str Replace Editor Tool (`str_replace_editor`)

**Purpose**: Advanced text editing and file manipulation.

**Capabilities**:
- `view`: Read file contents with optional line ranges
- `create`: Create new files with content
- `str_replace`: Find and replace text
- `insert`: Insert text at specific lines
- `undo_edit`: Revert changes (placeholder)

**Usage Examples**:
```
View lines 10-20 of "component.tsx"
Create a new file "Button.tsx" with React button code
Replace "className" with "cn(" in all files
Insert "import React" at line 1
```

**Parameters**:
```typescript
{
  command: "view" | "create" | "str_replace" | "insert" | "undo_edit",
  path: string,
  file_text?: string,        // For create
  insert_line?: number,       // For insert
  new_str?: string,          // For str_replace/insert
  old_str?: string,          // For str_replace
  view_range?: [number, number]  // For view
}
```

## 🧠 Agent Capabilities

### Component Generation

The agent can generate various types of React components:

**UI Components**:
- Forms (login, signup, contact)
- Navigation (headers, sidebars, menus)
- Content (cards, lists, modals)
- Interactive (buttons, inputs, toggles)

**Features**:
- TypeScript interfaces
- Tailwind CSS styling
- Accessibility attributes
- Responsive design
- Error handling
- Loading states

### Code Quality Standards

The agent follows these standards:

**TypeScript**:
- Strict typing
- Proper interfaces
- Generic types where appropriate
- Error handling with try-catch

**React Best Practices**:
- Functional components with hooks
- Props interfaces
- Event handlers
- State management
- Component composition

**Styling**:
- Tailwind CSS utility classes
- Responsive design patterns
- Consistent spacing and colors
- Dark/light theme support

### Project Structure

The agent maintains a clean project structure:

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── forms/          # Form components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## 🎨 Design Patterns

### Component Patterns

**Atomic Design**:
- Atoms: Basic elements (buttons, inputs)
- Molecules: Simple combinations (form fields)
- Organisms: Complex components (headers)
- Templates: Layout structures
- Pages: Complete views

**Props Interface**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Styling Strategy**:
- Utility-first with Tailwind
- Consistent spacing (4px grid)
- Color palette with semantic names
- Responsive breakpoints

## 🔧 Technical Implementation

### AI SDK Integration

Built with **AI SDK v6** for optimal performance:

```typescript
import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';

const result = await streamText({
  model: anthropic('claude-3-5-sonnet-20241022'),
  messages,
  tools: {
    str_replace_editor: buildStrReplaceTool(fileSystem),
    file_manager: buildFileManagerTool(fileSystem),
  },
});
```

### Virtual File System

The agent works with a virtual file system that:

- **Persists** data to SQLite database
- **Validates** file paths and names
- **Maintains** file hierarchy
- **Supports** real-time updates

### Error Handling

The agent gracefully handles:

- **File not found** errors
- **Invalid syntax** in generated code
- **Missing dependencies**
- **Type errors** in TypeScript
- **Import path** issues

## 📝 Conversation Patterns

### Effective Prompts

**Be Specific**:
```
❌ "Make a button"
✅ "Create a primary button component with hover effects, loading state, and proper TypeScript types"
```

**Include Requirements**:
```
✅ "Create a login form with:
- Email and password fields
- Validation using Zod
- Submit button with loading state
- Forgot password link
- Responsive design for mobile"
```

**Request Features**:
```
✅ "Build a data table component with:
- Sorting capabilities
- Pagination
- Search functionality
- Row selection
- Export to CSV"
```

### Iterative Development

The agent supports iterative refinement:

1. **Initial Generation**: Create basic component
2. **Feature Addition**: Add specific functionality
3. **Styling Refinement**: Adjust appearance and layout
4. **Optimization**: Improve performance and accessibility
5. **Integration**: Connect with other components

## 🎯 Best Practices

### For Users

**Clear Requirements**:
- Specify all features needed
- Mention styling preferences
- Include accessibility requirements
- Describe data structure

**Provide Context**:
- Explain the use case
- Mention related components
- Describe user interactions
- Specify performance needs

**Iterate**:
- Start simple, add complexity gradually
- Review and refine generated code
- Ask for specific changes
- Test functionality

### Agent Behavior

**Code Generation**:
- Follows React best practices
- Uses TypeScript strictly
- Implements proper error handling
- Includes accessibility features

**File Management**:
- Maintains clean directory structure
- Uses descriptive file names
- Avoids file conflicts
- Preserves existing code

**Communication**:
- Explains complex decisions
- Provides implementation details
- Suggests improvements
- Handles errors gracefully

## 🔍 Troubleshooting

### Common Issues

**Generation Problems**:
- Be more specific in requirements
- Break complex components into smaller parts
- Provide examples of desired output
- Mention specific libraries or patterns

**File System Errors**:
- Check file paths are correct
- Ensure parent directories exist
- Verify file names are valid
- Check for file conflicts

**TypeScript Errors**:
- Request proper type definitions
- Ask for interface updates
- Specify generic types
- Request error handling

### Error Messages

The agent provides helpful error messages:

```
❌ "Error: File not found: src/components/Button.tsx"
✅ "The file src/components/Button.tsx doesn't exist. Would you like me to create it or check a different path?"

❌ "Error: Invalid TypeScript syntax"
✅ "There's a TypeScript syntax error in the component. Let me fix the type definitions and add proper error handling."
```

## 🚀 Advanced Features

### Component Libraries

The agent can work with popular libraries:

- **UI Libraries**: Material-UI, Chakra UI, Mantine
- **Form Libraries**: React Hook Form, Formik
- **Data Libraries**: TanStack Query, SWR
- **Animation**: Framer Motion, React Spring

### State Management

Supports various state management patterns:

- **Local State**: useState, useReducer
- **Context API**: Custom contexts
- **External Libraries**: Zustand, Jotai
- **Server State**: TanStack Query

### Testing

Can generate test code:

- **Unit Tests**: Vitest, Testing Library
- **Component Tests**: React Testing Library
- **Integration Tests**: End-to-end scenarios
- **Type Tests**: TypeScript type checking

## 📊 Performance Metrics

The agent is optimized for:

- **Speed**: Fast component generation
- **Quality**: Production-ready code
- **Consistency**: Uniform coding standards
- **Maintainability**: Clean, documented code
- **Scalability**: Efficient file operations

## 🔮 Future Enhancements

Planned capabilities:

- **Component Library Integration**: Pre-built component templates
- **Theme Generation**: Automatic theme creation
- **Performance Optimization**: Code optimization suggestions
- **Accessibility Audit**: Automated accessibility checks
- **Code Review**: Intelligent code analysis
- **Documentation**: Auto-generated component docs

---

*This document is continuously updated as the UIGen AI agent evolves. Check back regularly for new capabilities and improvements.*
