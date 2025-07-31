/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Database seeder script to populate initial sample data
 * Run with: node scripts/seed.js
 */

const mongoose = require('mongoose');

// Simple Task schema for seeding
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  completed: { type: Boolean, default: false },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  dueDate: { type: Date, default: null },
  category: { type: String, default: 'Other' },
  tags: { type: [String], default: [] },
}, { timestamps: true });

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

const sampleTasks = [
  {
    title: 'Complete project proposal',
    description: 'Finish the quarterly project proposal for the client presentation',
    priority: 'high',
    dueDate: new Date('2025-08-05'),
    category: 'Work',
    tags: ['urgent', 'client', 'proposal'],
  },
  {
    title: 'Team meeting preparation',
    description: 'Prepare agenda and materials for weekly team sync meeting',
    completed: true,
    priority: 'medium',
    dueDate: new Date('2025-08-01'),
    category: 'Work',
    tags: ['meeting', 'team'],
  },
  {
    title: 'Code review',
    description: 'Review pull requests from team members and provide feedback',
    priority: 'medium',
    category: 'Development',
    tags: ['code', 'review', 'feedback'],
  },
  {
    title: 'Update documentation',
    description: 'Update API documentation with recent changes and improvements',
    priority: 'low',
    dueDate: new Date('2025-08-10'),
    category: 'Development',
    tags: ['documentation', 'api'],
  },
  {
    title: 'Gym workout',
    description: 'Upper body strength training session',
    priority: 'low',
    category: 'Health',
    tags: ['fitness', 'health'],
  },
  {
    title: 'Learn Next.js 15',
    description: 'Study the new features in Next.js 15 and update skills',
    priority: 'medium',
    category: 'Learning',
    tags: ['nextjs', 'learning', 'development'],
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskify';
    await mongoose.connect(MONGODB_URI);
    
    console.log('Connected to MongoDB');

    // Clear existing tasks
    await Task.deleteMany({});
    console.log('Cleared existing tasks');

    // Insert sample tasks
    const insertedTasks = await Task.insertMany(sampleTasks);
    console.log(`Inserted ${insertedTasks.length} sample tasks`);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
seedDatabase();
