# 🎮 Persona Chat Playground

[![React](https://img.shields.io/badge/React-18.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC.svg)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991.svg)](https://openai.com/)

An interactive retro gaming-themed chat platform where users can engage with AI-powered personas of their favorite content creators. Built with React, Vite, and OpenAI API, featuring a pixel-perfect retro aesthetic and fully responsive design.

## 🚀 Live Demo

[**Try it live →**](your-deployment-url)

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Personas**: Chat with content creators using their unique speaking styles
- **Real-time Conversations**: Instant responses powered by OpenAI GPT-4
- **Persona Switching**: Seamlessly switch between different personalities
- **Chat History**: Persistent conversations using localStorage
- **Message Counter**: Track conversation length in real-time

### 🎨 User Experience
- **Retro Gaming Theme**: Pixel-perfect 8-bit aesthetic with custom shadows
- **Sound Effects**: Audio feedback for enhanced user interaction
- **Responsive Design**: Optimized for all devices (mobile-first approach)
- **Smooth Animations**: Auto-scroll, loading indicators, and transitions
- **Upcoming Personas**: Preview of future additions with blur effects

### 🛠️ Technical Features
- **Modern React**: Built with React 18+ and functional components
- **Vite Build Tool**: Lightning-fast development and optimized builds
- **Tailwind CSS**: Utility-first styling with custom retro theme
- **Component Architecture**: Modular, reusable components
- **Error Handling**: Graceful error management and user feedback

## 🎭 Available Personas

### ✅ Active Personas
- **🎮 Snax Gaming**: Hyderabadi gamer with casual Hinglish vibe
- **👨‍💻 Hitesh Sir**: Coding mentor and YouTube educator

### 🚀 Coming Soon
- **🎮 Goldy Gaming**: Gaming content creator
- **🏠 Joker ki Haveli**: Entertainment persona

*More 8bit Creatives members will be added soon!*

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivek-650/persona-project.git
   cd persona-project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Add your OpenAI API key:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ChatBottom.jsx   # Chat input area with sound effects
│   ├── ChatHeader.jsx   # Chat header with persona info & message count
│   ├── Footer.jsx       # Retro-themed footer with social links
│   ├── PersonaSelector.jsx # Persona selection cards
│   └── retroui/         # Custom UI component library
├── pages/               # Main application pages
│   ├── LandingPage.jsx  # Homepage with persona selection
│   └── ChatPage.jsx     # Chat interface
├── personas/            # Persona definitions
│   └── personas.js      # Persona data and system prompts
├── lib/                 # Utility functions
├── App.jsx              # Main app component & routing
└── main.jsx            # Application entry point

public/
├── sounds/              # Audio files
│   └── note_3_sent_chat.mp3
└── [persona-images]     # Avatar images
```

## 🎨 Component Documentation

### 📄 Pages

#### `LandingPage.jsx`
**Purpose**: Homepage where users select personas to chat with

**Features**:
- Hero section with project description
- Responsive persona cards with avatars
- "Upcoming" badges for personas under development
- Footer with social links

**Props**:
- `selectedPersonaId`: Currently selected persona ID
- `onPersonaSelect`: Callback function for persona selection

**Responsive Design**:
- Mobile: Single column layout, touch-friendly cards
- Desktop: Two-column grid with hover effects

---

#### `ChatPage.jsx`
**Purpose**: Main chat interface for conversations with selected persona

**Features**:
- Chat header with persona info and message counter
- Scrollable message area with auto-scroll
- Message bubbles with different styles for user/AI
- Loading indicators with animated dots
- Chat input area with sound effects

**Props**:
- `selectedPersonaId`: Active persona ID
- `messages`: Array of conversation messages
- `onSendMessage`: Function to handle new messages
- `loading`: Loading state for AI responses

**Message Flow**:
1. User types message in input field
2. Sound effect plays on send
3. Message appears in chat with user styling
4. Loading indicator shows while AI responds
5. AI response appears with persona styling
6. Auto-scroll to bottom of conversation

---

### 🧩 Components

#### `PersonaSelector.jsx`
**Purpose**: Interactive cards for selecting chat personas

**Features**:
- Avatar images with emoji fallback
- Persona descriptions and names
- "Upcoming" state for unreleased personas
- Blur effects and badges for upcoming content
- Responsive grid layout

**States**:
- **Active**: Full color, clickable, navigates to chat
- **Upcoming**: Blurred, disabled, shows "🚀 Upcoming" badge

**Props**:
- `selectedPersonaId`: Currently active persona
- `onSelect`: Callback for persona selection

---

#### `ChatHeader.jsx`
**Purpose**: Top section of chat interface with persona information

**Features**:
- Message counter with proper pluralization
- Persona avatar with online status indicator
- Persona name with truncation for mobile
- Responsive sizing for different screen sizes

**Props**:
- `persona`: Persona object with name, avatar, etc.
- `messages`: Array for calculating message count

**Message Counting**:
- Counts only user and assistant messages
- Excludes system messages from count
- Updates in real-time as conversation progresses

---

#### `ChatBottom.jsx`
**Purpose**: Chat input area with send functionality

**Features**:
- Text input with character limit (1000 characters)
- Send button with loading states
- Sound effects on message send
- Keyboard shortcuts (Enter to send)
- Character counter display
- Loading indicator during AI responses

**Props**:
- `onSend`: Callback function for sending messages
- `loading`: Disables input during AI response
- `disabled`: Optional prop to disable entire input

**Sound Effects**:
- Plays `note_3_sent_chat.mp3` on message send
- Volume set to 50% to avoid being intrusive
- Error handling for unsupported browsers

---

#### `Footer.jsx`
**Purpose**: Site footer with branding and social links

**Features**:
- Retro gaming-themed design with pixel shadows
- Social media icons (GitHub, LinkedIn)
- "Made with ❤️ for 8bit Creatives" message
- Copyright information
- Responsive layout

**Social Links**:
- GitHub: Links to developer profile
- LinkedIn: Professional profile link
- Opens in new tabs with security attributes

---

## 🎭 Persona System

### Persona Structure
```javascript
{
  id: "unique-identifier",
  name: "Display Name",
  avatar: "🎮", // Emoji fallback
  avatarImage: "/path/to/image.jpg",
  description: "Brief description",
  systemPrompt: "Detailed AI personality prompt"
}
```

### Adding New Personas

1. **Add persona data** to `src/personas/personas.js`
2. **Add avatar image** to `public/` folder
3. **Create system prompt** with personality traits
4. **Test conversation** to ensure proper character voice

### System Prompt Guidelines
- Define speaking style and vocabulary
- Include personality traits and mannerisms
- Specify response tone and energy level
- Add relevant background information
- Include example interactions

## 🎨 Styling & Theming

### Color Palette
```css
Primary: #ffdb33 (Retro Yellow)
Secondary: #000000 (Black)
Background: #1a1a1a (Dark Gray)
Text: #f5f5f5 (Light Gray)
Accent: #fae583 (Light Yellow)
```

### Typography
- **Headers**: Archivo Black (retro gaming feel)
- **Body**: Space Grotesk (modern readability)
- **Buttons**: Mixed fonts for hierarchy

### Responsive Breakpoints
- `sm`: 640px+ (tablets)
- `md`: 768px+ (small laptops)
- `lg`: 1024px+ (desktops)
- `xl`: 1280px+ (large screens)

## 🔧 Configuration

### Environment Variables
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

### Tailwind Configuration
Custom theme extends default Tailwind with:
- Retro color palette
- Custom shadow utilities
- Gaming-inspired fonts
- Responsive spacing

### Vite Configuration
Optimized for:
- Fast development builds
- Modern browser targets
- Asset optimization
- Path aliases (@/ for src/)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel --prod
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Environment Variables for Production
Don't forget to set `VITE_OPENAI_API_KEY` in your hosting platform!

## 🤝 Contributing

### Getting Started
1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes with proper commit messages
4. Test thoroughly on mobile and desktop
5. Submit pull request with description

### Adding New Personas
1. Create persona data in `personas.js`
2. Add high-quality avatar image
3. Write comprehensive system prompt
4. Test conversation quality
5. Update README with new persona

### Code Style
- Use functional components with hooks
- Follow existing naming conventions
- Add proper TypeScript-style prop documentation
- Ensure mobile responsiveness
- Test sound effects and animations

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎵 Audio Features

### Sound Effects
- **Send Message**: Retro notification sound
- **Volume**: 50% for comfortable experience
- **Format**: MP3 for broad compatibility
- **Fallback**: Silent failure if audio unsupported

## 🔮 Future Roadmap

### Planned Features
- [ ] Voice messages with persona voices
- [ ] Custom persona creation tool
- [ ] Group chat functionality
- [ ] Message reactions and emojis
- [ ] Dark/light theme toggle
- [ ] Export chat conversations
- [ ] Persona analytics dashboard

### 8bit Creatives Integration
- [ ] All 8bit Creatives members as personas
- [ ] Official branding integration
- [ ] Community features
- [ ] Creator collaboration tools

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 👨‍💻 Author

**Vivek**
- GitHub: [@vivek-650](https://github.com/vivek-650)
- LinkedIn: [@vivek-650](https://linkedin.com/in/vivek-650)

## 🙏 Acknowledgments

- 8bit Creatives community for inspiration
- OpenAI for powerful AI capabilities
- Lucide React for beautiful icons
- Tailwind CSS for rapid styling
- Vite team for amazing build tool

---

**Built with ❤️ for the gaming community**

*Ready to chat with your favorite personas? [Get started now!](your-deployment-url)*
