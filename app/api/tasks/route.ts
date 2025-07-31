import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Task from '@/models/Task';

// GET /api/tasks - Get all tasks
export async function GET() {
  try {
    await connectToDatabase();
    
    const tasks = await Task.find({})
      .sort({ createdAt: -1 })
      .exec();
    
    return NextResponse.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const body = await request.json();
    const { title, description, priority, dueDate, category, tags } = body;
    
    // Validate required fields
    if (!title || title.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Title is required' },
        { status: 400 }
      );
    }
    
    const task = new Task({
      title: title.trim(),
      description: description?.trim() || '',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : null,
      category: category?.trim() || 'Other',
      tags: Array.isArray(tags) ? tags : [],
    });
    
    const savedTask = await task.save();
    
    return NextResponse.json(
      { success: true, data: savedTask },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
