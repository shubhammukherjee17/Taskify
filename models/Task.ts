/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date | null;
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot be more than 1000 characters'],
      default: '',
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
      default: null,
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'Category cannot be more than 50 characters'],
      default: 'Other',
    },
    tags: {
      type: [String],
      validate: [arrayLimit, 'Tags cannot exceed 10 items'],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc: ITask, ret: any) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

function arrayLimit(val: string[]) {
  return val.length <= 10;
}

// Add indexes for better performance
TaskSchema.index({ createdAt: -1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ category: 1 });
TaskSchema.index({ completed: 1 });
TaskSchema.index({ dueDate: 1 });

// Prevent re-compilation during development
const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

export default Task;
