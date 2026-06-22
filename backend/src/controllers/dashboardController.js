import { asyncHandler } from '../middleware/error.js';
import { learningContent } from '../seed/data.js';

// GET /api/dashboard  (auth) — learner dashboard seed content
export const getDashboard = asyncHandler(async (req, res) => {
  res.json({
    user: req.user.toSafeJSON(),
    enrolled: learningContent.enrolled,
    upcoming: learningContent.upcoming,
    notifs: learningContent.notifs,
    materials: learningContent.materials,
  });
});

// GET /api/progress  (auth)
export const getProgress = asyncHandler(async (req, res) => {
  res.json({
    subjects: learningContent.progSubjects,
    activity: learningContent.progActivity,
    insights: learningContent.progInsights,
    certs: learningContent.progCerts,
    recs: learningContent.progRecs,
  });
});

// GET /api/ai/content  (auth) — suggested questions, summaries, revision cards
export const getAiContent = asyncHandler(async (req, res) => {
  res.json({
    suggested: learningContent.aiSuggested,
    summaries: learningContent.aiSummaries,
    cards: learningContent.aiCards,
  });
});
