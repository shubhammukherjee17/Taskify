# Task Manager Application

A full-featured task management application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This application allows users to create, update, complete, and delete tasks with advanced filtering, sorting, and categorization features.

![Task Manager Screenshot](https://via.placeholder.com/800x400/2563eb/ffffff?text=Task+Manager+Application)

## 🚀 Features

### ✅ Core Task Management
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Completion**: Mark tasks as complete/incomplete with visual feedback
- **Rich Task Details**: Title, description, due date, priority, category, and tags
- **Persistent Storage**: Tasks are saved to localStorage automatically

### 🎯 Advanced Filtering & Sorting
- **Status Filter**: All, Pending, Completed tasks
- **Priority Filter**: High, Medium, Low priority tasks
- **Due Date Filter**: Today, This Week, Overdue tasks
- **Category Filter**: Filter by custom categories
- **Multi-Sort Options**: Sort by creation date, due date, priority, or title
- **Ascending/Descending**: Toggle sort direction with visual indicators

### 📊 Analytics & Insights
- **Task Statistics Dashboard**: Visual overview of task metrics
- **Progress Tracking**: Completion rate with progress bar
- **Priority Breakdown**: Count of pending tasks by priority level
- **Overdue Detection**: Automatic identification of overdue tasks

### 🎨 User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes with persistence
- **Sample Data**: Load sample tasks to explore features quickly
- **Visual Priority Indicators**: Color-coded priority levels
- **Overdue Warnings**: Clear visual indicators for overdue tasks
- **Smooth Animations**: Transition effects for better UX

### 🏷️ Organization Features
- **Categories**: Organize tasks by Work, Personal, Health, etc.
- **Tags System**: Add multiple tags to tasks for flexible organization
- **Tag Filtering**: Filter tasks by specific tags
- **Category Statistics**: See task distribution across categories

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Context + useReducer pattern
- **Storage**: localStorage for data persistence
- **Icons**: Heroicons and custom SVG icons
- **Date Handling**: Native Date API with date-fns utilities

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open the application**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
task-manager/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with TaskProvider
│   └── page.tsx           # Main task management page
├── components/            # Reusable React components
│   ├── TaskForm.tsx       # Add/Edit task modal form
│   ├── TaskItem.tsx       # Individual task display
│   ├── TaskFilters.tsx    # Filtering and sorting controls
│   ├── TaskStats.tsx      # Statistics dashboard
│   ├── DarkModeToggle.tsx # Theme switcher
│   └── SampleDataLoader.tsx # Sample data utilities
├── contexts/              # React Context providers
│   └── TaskContext.tsx    # Task state management
├── types/                 # TypeScript type definitions
│   └── task.ts           # Task and related interfaces
├── utils/                 # Utility functions
│   └── taskUtils.ts      # Task-related helper functions
└── public/               # Static assets
```

## 🎯 Usage Guide

### Creating Tasks
1. Click the "Add Task" button in the header
2. Fill in task details:
   - **Title** (required): Brief task description
   - **Description** (optional): Detailed task information
   - **Priority**: Low, Medium, or High
   - **Due Date** (optional): Task deadline
   - **Category** (optional): Custom category like "Work" or "Personal"
   - **Tags** (optional): Comma-separated tags for organization

### Managing Tasks
- **Complete Task**: Click the checkbox to mark as done
- **Edit Task**: Click the edit icon to modify task details
- **Delete Task**: Click the delete icon to remove the task

### Filtering & Sorting
- Use the filter bar to narrow down tasks by status, priority, due date, or category
- Click sort buttons to order tasks by different criteria
- Click the same sort button again to reverse the order

### Dark Mode
- Click the sun/moon icon in the header to toggle between light and dark themes
- Your preference is automatically saved and restored on future visits

## 🔧 Customization

### Adding New Priority Levels
Edit the `Task` interface in `types/task.ts`:
```typescript
priority: 'low' | 'medium' | 'high' | 'urgent';
```

### Custom Categories
Categories are free-form text fields. Consider adding predefined options in `TaskForm.tsx`.

### Extending Task Properties
Add new fields to the `Task` interface and update the form components accordingly.

## 🎨 Styling

The application uses Tailwind CSS with a custom design system:
- **Color Palette**: Blue primary, with semantic colors for priorities
- **Typography**: System font stack with clear hierarchy
- **Spacing**: Consistent spacing scale using Tailwind's spacing system
- **Responsive**: Mobile-first responsive design

### Dark Mode Implementation
- Uses Tailwind's `dark:` variant system
- Theme preference stored in localStorage
- Smooth transitions between themes

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Other Platforms
```bash
npm run build
npm start
```

## 🔮 Future Enhancements

### Planned Features
- [ ] **User Authentication**: Multi-user support with login/logout
- [ ] **Cloud Sync**: Sync tasks across devices using Firebase or Supabase
- [ ] **Drag & Drop**: Reorder tasks with drag-and-drop interface
- [ ] **Notifications**: Browser notifications for due dates
- [ ] **Calendar Integration**: View tasks in calendar format
- [ ] **Subtasks**: Break down tasks into smaller subtasks
- [ ] **Team Collaboration**: Share tasks with team members
- [ ] **Import/Export**: Backup and restore tasks
- [ ] **Search Functionality**: Full-text search across all task fields
- [ ] **Recurring Tasks**: Set up repeating tasks

### Potential Integrations
- **Calendar Apps**: Google Calendar, Outlook integration
- **Time Tracking**: Pomodoro timer integration
- **Project Management**: Notion, Trello-style boards
- **Voice Input**: Speech-to-text for quick task creation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Inspired by modern task management applications

---

**Made with ❤️ using Next.js and TypeScript**
