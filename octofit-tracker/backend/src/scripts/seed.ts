import mongoose from 'mongoose';
import { ActivityModel, TeamModel, UserModel, WorkoutModel } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      ActivityModel.deleteMany({}),
      TeamModel.deleteMany({}),
      UserModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.create([
      { name: 'Alex Rivera', email: 'alex.rivera@example.com', avatar: 'AR' },
      { name: 'Jamie Chen', email: 'jamie.chen@example.com', avatar: 'JC' },
      { name: 'Morgan Patel', email: 'morgan.patel@example.com', avatar: 'MP' },
      { name: 'Taylor Brooks', email: 'taylor.brooks@example.com', avatar: 'TB' },
    ]);

    await TeamModel.create([
      { name: 'Morning Movers', members: [users[0]._id, users[1]._id] },
      { name: 'Weekend Warriors', members: [users[2]._id, users[3]._id] },
    ]);

    await ActivityModel.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, points: 320, performedAt: new Date('2026-09-07T07:30:00Z') },
      { user: users[0]._id, type: 'strength', durationMinutes: 45, points: 270, performedAt: new Date('2026-09-05T17:00:00Z') },
      { user: users[1]._id, type: 'cycling', durationMinutes: 50, points: 350, performedAt: new Date('2026-09-06T09:00:00Z') },
      { user: users[1]._id, type: 'walking', durationMinutes: 28, points: 140, performedAt: new Date('2026-09-04T18:30:00Z') },
      { user: users[2]._id, type: 'strength', durationMinutes: 40, points: 240, performedAt: new Date('2026-09-07T06:45:00Z') },
      { user: users[3]._id, type: 'running', durationMinutes: 25, points: 250, performedAt: new Date('2026-09-03T07:00:00Z') },
    ]);

    await WorkoutModel.create([
      {
        title: 'Starter Run',
        description: 'A steady run to build an aerobic base.',
        difficulty: 'beginner',
        durationMinutes: 25,
        activityType: 'running',
      },
      {
        title: 'Full Body Circuit',
        description: 'A balanced strength circuit for the whole body.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        activityType: 'strength',
      },
      {
        title: 'Power Intervals',
        description: 'Short, demanding intervals for experienced athletes.',
        difficulty: 'advanced',
        durationMinutes: 30,
        activityType: 'running',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
