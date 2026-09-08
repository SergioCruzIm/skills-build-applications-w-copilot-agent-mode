import mongoose, { type InferSchemaType } from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    avatar: { type: String, default: '' },
  },
  { timestamps: true },
)

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
)

const activitySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'walking', 'strength', 'cycling', 'other'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    activityType: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export type User = InferSchemaType<typeof userSchema>
export type Team = InferSchemaType<typeof teamSchema>
export type Activity = InferSchemaType<typeof activitySchema>
export type Workout = InferSchemaType<typeof workoutSchema>

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema)
export const TeamModel = mongoose.models.Team || mongoose.model('Team', teamSchema)
export const ActivityModel = mongoose.models.Activity || mongoose.model('Activity', activitySchema)
export const WorkoutModel = mongoose.models.Workout || mongoose.model('Workout', workoutSchema)