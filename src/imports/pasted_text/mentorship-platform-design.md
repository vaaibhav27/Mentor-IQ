# ULTIMATE MASTER PROMPT
# Structured Mentorship Accountability & Intelligence Platform

---

## ROLE

You are a senior full-stack engineer, product architect, and system designer with 10+ years of experience building scalable SaaS platforms. You think in systems, not features. You prioritize depth, measurable outcomes, and real-world problem solving over superficial UI or gimmicks.

---

## WHAT YOU ARE BUILDING

Design and build a production-grade full-stack platform called:

**"MentorIQ — Structured Mentorship Accountability & Intelligence Platform"**

This is NOT a basic mentorship chat app.
This is a **lifecycle-driven, behaviour-tracked, accountability-enforced mentorship intelligence system** that solves the real problems every mentorship platform fails at:

| Real Problem | This System Solves It By |
|---|---|
| Mentor ghosting | Ghost rate tracking + reliability penalty |
| Learner drop-offs | Drop-off risk prediction engine |
| No measurable progress | Milestone-based structured progression |
| Mentor overload | Capacity control + overload detection |
| Unclear expectations | Expectation alignment form |
| Random unstructured chat | Session-based structured mentorship |
| Fake/unreliable mentors | Transparency metrics on public profiles |
| No accountability | Weekly structured tasks + mentor approval |

---

## CORE PRODUCT VISION

Transform mentorship from:

```
Random Chat             →    Structured Guided Journey
Untracked Conversations →    Lifecycle-Based State Machine
Subjective Trust        →    Metrics-Based Reliability Scoring
Vague Progress          →    Milestone-Driven Measurable Outcomes
```

---

## SYSTEM ARCHITECTURE — 5 CORE ENGINES

Build the entire system around these 5 engines. Each engine must be fully designed with responsibilities, data models, algorithms, and APIs.

---

### ENGINE 1 — IDENTITY ENGINE

**Responsibilities:**
- User registration and authentication (JWT-based)
- Role assignment: Mentor / Learner / Admin
- Profile management
- Verified badge system

**User Profile Fields:**
```
name, email, password_hash, role, skills[], experience_level,
timezone, availability_schedule, weekly_commitment_hours,
learning_goals, verified_badge, created_at, updated_at
```

**Mentor-Specific Fields:**
```
rating, completion_rate, ghost_rate, avg_response_time,
active_mentee_count, max_mentee_capacity, sla_tier,
reliability_score, total_sessions, completed_sessions,
ghosted_sessions
```

**Learner-Specific Fields:**
```
current_mentor_id, consistency_score, quiz_trend,
risk_score, risk_flag, last_login, goals[]
```

**Rules:**
- Mentor profiles are public and show all transparency metrics
- Verified badge is earned after 5+ completions with rating ≥ 4.0
- Admin can manage users, view platform-wide analytics, and resolve disputes

---

### ENGINE 2 — ADVANCED MATCHING ENGINE

**Core Formula — MentorScore:**

```
MentorScore =
  0.3 × reliability_score
+ 0.3 × response_speed_score
+ 0.2 × stack_match_score
+ 0.2 × rating_score
```

**Metric Definitions:**

**Reliability Score**
```
reliability = completed_sessions / total_accepted_sessions

Example:
Mentor accepted 20, completed 18 → reliability = 0.9
```

**Ghost Rate**
```
ghost_rate = ghosted_sessions / total_accepted_sessions

Example:
5 ghosted out of 20 → ghost_rate = 0.25 (25%)
If ghost_rate > 0.4 → automatic ranking penalty applied
```

**Response Speed Score (Normalized 0–1)**
```
< 3 hrs   → 1.0
< 12 hrs  → 0.8
< 24 hrs  → 0.6
> 24 hrs  → 0.3
```

**Stack Match Score**
```
stack_match = common_skills.length / required_skills.length

Example:
Required: [React, Node, MongoDB]
Mentor has: [React, Node, MongoDB, Python]
Common: 3 → stack_match = 3/3 = 1.0
```

**Rating Score**
```
rating_score = avg_rating / 5.0
Example: 4.5 rating → 0.9
```

**Full Example Calculation:**
```
Mentor A:
  reliability     = 0.9
  response_speed  = 0.8
  stack_match     = 1.0
  rating          = 0.9

MentorScore = 0.3(0.9) + 0.3(0.8) + 0.2(1.0) + 0.2(0.9)
            = 0.27 + 0.24 + 0.20 + 0.18
            = 0.89  ← Strong Mentor
```

**SLA Tiers:**
```
Basic → 48-hour response commitment
Pro   → 24-hour response commitment
Fast  → 6-hour response commitment
```
SLA violation → reliability_score decreases automatically.

**Mentor Capacity Control:**
- Each mentor has a `max_mentee_capacity` (default: 5)
- New requests auto-blocked when limit reached
- Overload detection: if avg_response_time increases 2x → system warns mentor

**Smart Mentor Suggestions:**
- System recommends top 3 mentors personalized to:
  - Learner's skill gaps
  - Quiz performance history
  - Timezone compatibility
  - Learning goal alignment

---

### ENGINE 3 — LIFECYCLE ENGINE (STATE MACHINE)

**Every mentorship follows a strict state machine:**

```
States:
REQUESTED → ACCEPTED → AWAITING_FIRST_RESPONSE → ACTIVE → INACTIVE → COMPLETED
                                                                    ↓
                                                                  CLOSED
```

**State Definitions:**
```
REQUESTED              → Learner sent request
ACCEPTED               → Mentor accepted
AWAITING_FIRST_RESPONSE→ Accepted but no reply within 24 hrs
ACTIVE                 → Conversation ongoing
INACTIVE               → No activity for 72 hrs
COMPLETED              → Goal achieved, both parties confirmed
CLOSED                 → System auto-closed due to long inactivity
```

**Automatic Time-Based Transitions:**
```
Day 0   → Learner sends request           → REQUESTED
Day 1   → Mentor accepts                  → ACCEPTED
+24 hrs → No first reply from mentor      → AWAITING_FIRST_RESPONSE
+72 hrs → No activity from either party   → INACTIVE
+14 days→ Still no activity               → CLOSED
Any time→ Goal confirmed complete         → COMPLETED
```

**Implementation:**
- Background cron job runs every hour
- Checks all active mentorships for time-based violations
- Updates state and triggers notifications automatically
- Ghost rate updated on CLOSED (if never ACTIVE)

---

### ENGINE 4 — ACCOUNTABILITY ENGINE

**Mentorship is not open chat. It is structured into milestones.**

**Weekly Milestone Structure:**
```
Week 1:
  Topic     → JavaScript Basics
  Tasks     → Read materials + complete quiz
  Threshold → Score ≥ 70%
  Unlock    → Requires mentor approval

Week 2 → LOCKED until Week 1 is approved
```

**Milestone Object:**
```
{
  milestone_id,
  mentorship_id,
  week_number,
  topic,
  tasks[],
  quiz_id,
  required_score,
  mentor_approved,
  completed_at,
  status: LOCKED / ACTIVE / COMPLETED
}
```

**Session-Based Structure:**
```
Session 1 → Goal Setting
Session 2 → Progress Review
Session 3 → Mock Interview / Evaluation

Each session stores:
- agenda
- mentor_notes
- learner_notes
- action_items[]
- outcome_status
- session_date
```

**Expectation Alignment Form (Before Mentorship Starts):**
```
Fields:
- learning_goal: [Job / DSA / Project / Guidance / Interview Prep]
- expected_duration: [2 weeks / 1 month / 3 months]
- weekly_hours_commitment
- mentor_weekly_availability

If mismatch > 40% → System displays warning before confirming
```

**Milestone-Based Feedback:**
```
After each milestone:
  Learner rates mentor helpfulness: 1–5
  Mentor rates learner preparedness: Yes/No
```

**Resume Outcome Tracker:**
```
Track per learner:
  projects_completed
  mock_interviews_done
  applications_sent
  interviews_received
  offers_received
  conversion_rate = offers / applications
```

---

### ENGINE 5 — INTELLIGENCE & METRICS ENGINE

**The system must analyze behaviour, not just store data.**

#### MENTOR METRICS

**Ghost Rate**
```
ghost_rate = ghosted_sessions / total_accepted_sessions
If ghost_rate > 0.4 → ranking penalty
```

**Average Response Time**
```
avg_response_time = sum(all_reply_latencies) / total_replies
```

**Completion Rate**
```
completion_rate = completed_sessions / total_accepted_sessions
```

**SLA Adherence Rate**
```
sla_adherence = sessions_within_sla / total_sessions
```

---

#### LEARNER METRICS

**Consistency Score**
```
consistency = completed_weeks / total_weeks
```

**Quiz Trend**
```
quiz_trend = current_quiz_score - previous_quiz_score
If 3 consecutive negatives → risk signal triggered
```

**Drop-Off Risk Score (Most Important)**
```
RiskScore =
  0.4 × inactivity_score
+ 0.3 × quiz_decline_score
+ 0.3 × no_response_score

Where:

inactivity_score:
  0 days inactive  → 0.0
  7 days inactive  → 0.5
  14 days inactive → 1.0

quiz_decline_score:
  Score dropped > 20% → 1.0
  Otherwise           → 0.0

no_response_score:
  No message in 7 days → 1.0
  Otherwise            → 0.0
```

**Full Example:**
```
Learner:
  14 days no login       → inactivity_score = 1.0
  Quiz dropped 30%       → quiz_decline     = 1.0
  No messages in 10 days → no_response      = 1.0

RiskScore = 0.4(1.0) + 0.3(1.0) + 0.3(1.0) = 1.0

→ Flagged: ⚠ AT RISK LEARNER
```

**System Actions on At-Risk Flag:**
```
1. Notify mentor immediately
2. Send gentle reminder to learner
3. Suggest lighter task this week
4. Offer mentorship pause option
```

---

## ADDITIONAL HIGH-IMPACT FEATURES

### Commitment Lock System
When mentor accepts a request, they must confirm:
```
☑ I commit to reply within [SLA tier] hours
☑ I can dedicate [X] hours/week to this mentorship
```
Failure to honor commitment → reliability_score decreases.

### Burnout Detection
```
If:
  quiz_performance declining AND
  response_time increasing AND
  inactivity increasing

→ System suggests: "Consider a lighter week"
```

### Escalation & Mediation System
```
If mentorship state = INACTIVE for 7+ days:
  → Auto-notify both parties
  → Option to close and reassign to new mentor
  → Dispute resolution flag for admin
```

### AI Roadmap Generator
```
Input:
  learner_level
  target_goal
  available_weeks

Output:
  Week-by-week structured roadmap

Example:
  Goal: Frontend Job in 3 months
  Month 1: HTML + CSS + JS fundamentals
  Month 2: React + 2 real projects
  Month 3: Mock interviews + applications
```

---

## DATABASE SCHEMA (Normalized)

Design complete normalized schema for:

```
Tables:
  users
  mentor_profiles
  learner_profiles
  mentorships
  mentorship_states (state machine log)
  milestones
  sessions
  session_notes
  quizzes
  quiz_attempts
  feedback
  notifications
  risk_scores
  sla_logs
  expectation_forms
  outcome_tracker
```

Include:
- Primary keys, foreign keys
- Indexes on frequently queried columns
- Timestamps on all tables
- Soft delete where applicable

---

## API DESIGN (REST)

Design complete REST API with:

```
Auth:
  POST /api/auth/register
  POST /api/auth/login
  POST /api/auth/refresh

Users:
  GET    /api/users/:id
  PUT    /api/users/:id
  DELETE /api/users/:id

Matching:
  GET /api/mentors/recommended?goal=&skills=&timezone=
  GET /api/mentors/:id/score

Mentorships:
  POST   /api/mentorships/request
  PUT    /api/mentorships/:id/accept
  PUT    /api/mentorships/:id/state
  GET    /api/mentorships/:id
  GET    /api/mentorships/:id/timeline

Milestones:
  GET    /api/milestones/:mentorship_id
  PUT    /api/milestones/:id/complete
  PUT    /api/milestones/:id/approve

Sessions:
  POST   /api/sessions
  GET    /api/sessions/:id
  PUT    /api/sessions/:id/notes

Analytics:
  GET /api/analytics/mentor/:id
  GET /api/analytics/learner/:id
  GET /api/analytics/platform (admin only)

Risk:
  GET /api/risk/learner/:id
  POST /api/risk/recalculate
```

---

## DASHBOARDS

### Mentor Dashboard
```
- Current active mentees (with status)
- Response time graph (last 30 days)
- Ghost rate trend
- Completion rate
- Reliability score badge
- SLA adherence %
- At-risk mentees alert panel
```

### Learner Dashboard
```
- Current milestone progress
- Quiz score trend chart
- Risk indicator (if flagged)
- Mentor response time display
- Goal completion % tracker
- Session history
- Resume outcome tracker
```

### Admin Dashboard
```
- Platform-wide ghost rate
- Drop-off rate this month
- Top mentor leaderboard
- SLA violations log
- At-risk learner count
- Mentorship state distribution chart
```

---

## TECHNICAL REQUIREMENTS

**Backend:**
- Node.js + Express (or NestJS for structured approach)
- PostgreSQL (relational data) + Redis (caching, sessions)
- Background job scheduler (Bull / node-cron) for lifecycle transitions
- JWT authentication with refresh tokens
- Role-based access control middleware

**Frontend:**
- React.js with context/state management
- Chart.js or Recharts for analytics dashboards
- Responsive design

**Scoring & Analytics:**
- Recalculate MentorScore on every completed/ghosted session
- Recalculate RiskScore daily via background job
- Cache computed scores in Redis with TTL

**Scalability:**
- Indexes on: user_id, mentorship_id, state, created_at
- Pagination on all list endpoints
- Event-driven notifications (webhook or socket)

**Security:**
- Password hashing (bcrypt)
- Input validation and sanitization
- Rate limiting on auth endpoints
- CORS configuration

---

## WHAT TO AVOID (STRICTLY)

```
❌ Random gamification badges without meaning
❌ Blockchain or NFT gimmicks
❌ AI features without logic behind them
❌ Fancy animations over actual functionality
❌ 50 features with no depth
❌ Generic chat app structure

✅ Depth over quantity
✅ Every feature solves a real documented problem
✅ Measurable outcomes
✅ System design thinking
```

---

## DELIVERABLES REQUIRED

Provide all of the following:

1. **Complete system architecture diagram explanation**
2. **Full database schema** with all tables, fields, and relationships
3. **All API endpoints** with request/response formats
4. **All scoring algorithms** with worked examples
5. **State machine diagram** for lifecycle engine
6. **Dashboard layouts** for mentor, learner, and admin
7. **Background job logic** for lifecycle transitions and risk recalculation
8. **Implementation roadmap** (what to build first → what to build last)
9. **Interview explanation** — how to present this project confidently
10. **Resume bullet points** — how to describe this project on a resume
11. **Elevator pitch** — 60-second explanation for recruiters
12. **Problem statement** — why this platform needs to exist

---

## INTERVIEW EXPLANATION (GENERATE THIS)

Generate a clear, confident answer to:

*"Tell me about a project you built."*

That includes:
- Problem it solves
- System design decisions made
- Algorithms implemented
- Technical depth demonstrated
- Real-world impact

---

## FINAL OBJECTIVE

Build a system that proves:

> "This developer thinks like a product engineer, designs like a system architect, and solves real-world problems with measurable outcomes."

**Not a chat app. A mentorship intelligence platform.**