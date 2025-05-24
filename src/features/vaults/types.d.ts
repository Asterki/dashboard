export type Vault = {
  id?: number

  // Core
  name: string
  description: string
  image: string // Could be a local file path or base64

  // Metadata
  createdAt: Date
  updatedAt: Date
  archived?: boolean
  color?: string
  icon?: string
  tags?: Array<string>

  // Linked features (foreign keys or local document IDs)
  notesId?: number
  tasksId?: number
  calendarId?: number
  pomodoroId?: number
  habitId?: number
  journalId?: number
  goalsId?: number
  projectsId?: number
  remindersId?: number
  bookmarksId?: number
  financesId?: number
  dailyLogId?: number
  moodTrackerId?: number
  routinesId?: number
  filesId?: number
  metricsId?: number
  visionBoardId?: number
  bookLogId?: number // Reading tracker
  instrumentLearningId?: number // Music practice logs, skills
  languageLearningId?: number // Grammar, vocab, progress, spaced repetition
  universityId?: number // Courses, grades, assignments, schedules
  travelId?: number // Trips, itineraries, packing lists
  fitnessId?: number // Workouts, health logs, goals
  nutritionId?: number // Meal plans, macros, shopping
  careerId?: number // Resume, job apps, interview prep
  ideasId?: number // Idea vault, brain dumps
  archiveId?: number // Raw data, inactive items
  creativeId?: number // Art, writing, content creation logs
  spiritualityId?: number // Prayer, reflections, meditations
  relationshipsId?: number // Contacts, interactions, reminders
  mindmapId?: number
  zettelkastenId?: number
  readingQueueId?: number
  movieLogId?: number
  dreamLogId?: number
  skillsId?: number
  learningPlansId?: number
  affirmationsId?: number
  gratitudeLogId?: number
  valuesId?: number
  lifeAreasId?: number
  therapyNotesId?: number
  coachingId?: number
  collectionsId?: number
  challengesId?: number
  yearCompassId?: number
  logbookId?: number
  wishlistId?: number
  declutteringId?: number
  systemsId?: number

  // Optional Custom User Extensions
  extensions?: Record<string, string | number | boolean>
}

