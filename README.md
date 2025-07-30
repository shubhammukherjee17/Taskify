# 📋 Taskify - Beautiful Task Management App
  
  **Organize your life with beautiful, intelligent task management**
  
## ✨ Features

### 🎯 Core Functionality
- **Task Management**: Create, edit, delete, and complete tasks with ease
- **Priority Levels**: Organize tasks by Low, Medium, and High priority
- **Categories**: Sort tasks into Work, Personal, Health, Learning, Development, and custom categories
- **Due Dates**: Set and track due dates with overdue indicators
- **Tags System**: Add custom tags for better organization
- **Search & Filter**: Powerful search and filtering capabilities
- **Task Statistics**: Visual progress tracking and completion rates

### 🎨 User Experience
- **Beautiful Design**: Modern, responsive interface with smooth animations
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Framer Motion**: Smooth animations and transitions throughout the app
- **Glass Morphism**: Modern glassmorphic design elements

### ⚡ Performance & Technology
- **Progressive Web App (PWA)**: Install as a native app on any device
- **Offline Support**: Service worker for offline functionality
- **Fast Loading**: Optimized with Next.js for lightning-fast performance
- **TypeScript**: Full type safety and better development experience
- **Local Storage**: Persist data locally with automatic synchronization

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shubhammukherjee17/Taskify.git
   cd Taskify
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the app running.

### Build for Production

```bash
npm run build
npm start
```

## 📱 PWA Installation

Taskify can be installed as a Progressive Web App on any device:

1. **Desktop**: Look for the install prompt in your browser's address bar
2. **Mobile**: Use the "Add to Home Screen" option in your browser menu
3. **Automatic Prompt**: The app will suggest installation after a few visits

### PWA Features
- 📱 Native app-like experience
- 🔄 Offline functionality
- 🚀 Fast loading from home screen
- 📲 Push notifications (future feature)
- 💾 Background sync

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15.4.5](https://nextjs.org/)** - React framework with App Router
- **[React 19.1.0](https://reactjs.org/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion 12](https://www.framer.com/motion/)** - Animation library

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[@heroicons/react](https://heroicons.com/)** - Beautiful SVG icons
- **[date-fns](https://date-fns.org/)** - Date utility library
- **[GSAP](https://greensock.com/gsap/)** - Advanced animations

### PWA & Performance
- **Service Worker** - Offline functionality and caching
- **Web App Manifest** - Native app installation
- **Responsive Design** - Mobile-first approach
- **Image Optimization** - Next.js automatic optimization

## 🎯 Usage Guide

### Creating Tasks
1. Click the **"Add Task"** button
2. Fill in the task details:
   - **Title**: Task name (required)
   - **Description**: Additional details
   - **Priority**: Low, Medium, or High
   - **Due Date**: Optional deadline
   - **Category**: Organize by type
   - **Tags**: Custom labels for filtering

### Managing Tasks
- **Complete**: Click the checkbox to mark as done
- **Edit**: Double-click any task or use the edit button
- **Delete**: Use the delete button (appears on hover)
- **Filter**: Use priority, category, and status filters
- **Search**: Type in the search bar for instant results
- **Sort**: Order by date, priority, or title

### Dark Mode
- Click the theme toggle in the header
- Automatically detects system preference
- Preference saved in local storage

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradient
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Slate color scale

### Typography
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable typography
- **Interactive**: Hover and focus states

### Components
- **Glass Morphism**: Translucent backgrounds with backdrop blur
- **Smooth Animations**: Framer Motion for delightful interactions
- **Responsive Grid**: Adapts to all screen sizes

### PWA Configuration
The PWA settings are configured in `public/manifest.json`:
- App name and description
- Icons for different sizes
- Theme colors
- Display mode and orientation

## 📊 Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 95+
- **SEO**: 100
- **PWA**: 100

### Optimizations
- Next.js automatic code splitting
- Image optimization
- Service worker caching
- Minimized bundle size
- Lazy loading components

## 🚧 Future Enhancements

### Planned Features
- 🔐 **User Authentication**: Multi-user support
- ☁️ **Cloud Sync**: Cross-device synchronization
- 📱 **Push Notifications**: Task reminders
- 📈 **Analytics**: Productivity insights
- 🎯 **Goal Setting**: Long-term objectives
- 📊 **Data Export**: Backup and migration tools
- 🤝 **Collaboration**: Shared task lists
- 🔌 **API Integration**: Connect with external services

### Technical Improvements
- Real-time collaboration with WebSockets
- Advanced search with full-text indexing
- Drag-and-drop task reordering
- Bulk operations for multiple tasks
- Keyboard shortcuts for power users

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing code style
- Add tests for new functionality
- Update documentation as needed
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shubham Mukherjee**
- GitHub: [@shubhammukherjee17](https://github.com/shubhammukherjee17)
- Email: [mukherjeeshubham18@gmail.com](mailto:mukherjeeshubham18@gmail.com)

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For beautiful animations
- **Heroicons** - For the beautiful icon set
- **Vercel** - For hosting and deployment platform

## 📱 Screenshots

### Desktop View
![Taskify Desktop](./docs/screenshots/desktop-view.png)

### Mobile View
![Taskify Mobile](./docs/screenshots/mobile-view.png)

### Dark Mode
![Taskify Dark Mode](./docs/screenshots/dark-mode.png)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/shubhammukherjee17">Shubham Mukherjee</a></p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>