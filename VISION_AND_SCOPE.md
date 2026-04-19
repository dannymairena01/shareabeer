# Share a Beer — Vision and Scope

| **Share a Beer**         | **Version: 1.0**    |
| ------------------------ | ------------------- |
| Vision                   | **Date: 17/Apr/26** |
| Document ID: SAB-VIS-001 |                     |

**Personal Project (Danny Mairena)**

**Share a Beer**
**Vision**
**Version 1.0**

## Revision History

| Date      | Version | Description                                         | Author        |
| --------- | ------- | --------------------------------------------------- | ------------- |
| 17/Apr/26 | 1.0     | Initial Vision and Scope document for Share a Beer. | Danny Mairena |

## Table of Contents

1. Introduction
   1. Background
   2. References
2. Business Requirements
   1. Business Opportunity / Problem Statement
   2. Business Objectives
   3. Success Metrics
   4. Vision Statement
   5. Business Risks
   6. Business Assumptions and Dependencies
3. Stakeholder Profiles and User Descriptions
   1. Stakeholder Profiles
   2. User Environment
   3. Alternatives and Competition
4. Scope and Limitations
   1. Product Perspective
   2. Major Features / Scope
   3. Deployment Considerations
5. Other Product Requirements

---

# 1. Introduction

## 1.1 Background

Beer culture has shifted from a commodity experience to an experiential one. Craft beer production has exploded globally, consumers regularly track and share what they drink, and a generation of drinkers has grown up expecting social, photographic, and quantified dimensions layered on top of every hobby they enjoy. Three adjacent markets demonstrate this shift clearly: Untappd has built a large beer-logging community but has stagnated in terms of product innovation and carries a dated UX; Strava has proven that session tracking, stats, leaderboards, and recaps are compelling mechanics that produce strong retention; and Instagram / TikTok have normalized the behavior of posting short-form content around food, drink, and lifestyle experiences.

At the same time, craft breweries — particularly small and mid-sized independents — continue to struggle to reach drinkers directly, understand how their products are being received in the wild, and build verified communities around their brand. The existing options are fragmented: Untappd for rating, Instagram for content, Google Maps for discovery, and no real channel for sessions, recaps, achievements, or brewery-to-drinker engagement.

**Share a Beer** is a social mobile application — available on iOS and Android — that unifies these experiences into a single product designed specifically for beer. It combines a social feed (photo/video posts with rich beer metadata), AI-powered beer recognition via camera, session tracking modeled on Strava, gamification (badges, streaks, leaderboards, weekly/monthly recaps), discovery (Beer Encyclopedia, Map View, Trending), and verified brewery accounts with analytics. The app is positioned to become the category-defining social network for beer.

## 1.2 References

| Reference | Description                                               | Source                           |
| --------- | --------------------------------------------------------- | -------------------------------- |
| Untappd   | Competitive benchmark — beer logging and rating           | https://untappd.com              |
| Vivino    | Competitive benchmark — wine discovery and social logging | https://www.vivino.com           |
| Strava    | Product analog — session tracking, segments, recaps       | https://www.strava.com           |
| Instagram | Social feed and ranking model benchmark                   | https://www.instagram.com        |
| ISO 27001 | Information security management standard                  | https://www.iso.org/isoiec-27001 |
| GDPR      | General Data Protection Regulation (EU)                   | https://gdpr.eu                  |
| CCPA      | California Consumer Privacy Act                           | https://oag.ca.gov/privacy/ccpa  |

---

# 2. Business Requirements

## 2.1 Business Opportunity / Problem Statement

| The problem of                 | fragmented, dated tooling for beer drinkers and breweries — separate apps for logging, posting, discovery, and session recording, with none purpose-built for modern social behavior around beer                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| affects                        | casual beer drinkers, craft beer enthusiasts, and independent breweries and beer brands worldwide                                                                                                                                    |
| the impact of which is         | drinkers have no single product that captures, quantifies, and celebrates their beer experiences the way Strava does for running or Letterboxd does for film; breweries lack a direct, verified, data-rich channel to their audience |
| a successful solution would be | a cross-platform mobile app that unifies social feed, AI beer recognition, session tracking, gamification, discovery, and brewery-side engagement and analytics into one product with a premium modern UX                            |

Share a Beer is intended to become the default place where beer lovers capture the beer they drink, track drinking sessions with friends, earn recognition for milestones, discover new beers, and follow the breweries they love — and the default place where breweries build community, respond to their audience, and understand how their beers are received.

## 2.2 Business Objectives

**BO-1:** Reach **100,000 monthly active users (MAU)** within 12 months of public launch.

- _Scale:_ Unique users opening the app at least once in the trailing 30-day window.
- _Meter:_ Product analytics (Amplitude or equivalent) on the `app_open` event.
- _Past:_ 0 (pre-launch).
- _Goal:_ 100,000 MAU by Month 12.
- _Stretch:_ 250,000 MAU by Month 12.

**BO-2:** Achieve an **average of 8 beers logged per active user per month** by Month 12, demonstrating that the logging + session mechanics are habit-forming.

**BO-3:** Onboard **1,000 verified brewery / brand accounts** within 18 months of public launch, with at least 40% posting at least once per month.

**BO-4:** Achieve a **D30 retention rate of 25% or higher** (measured on new-user cohorts) within 9 months of launch — competitive with leading social consumer apps in this category.

**BO-5:** Generate measurable **B2B revenue from brewery accounts** (premium analytics, sponsored placement) of at least **$500K ARR** within 24 months of launch.

## 2.3 Success Metrics

**SM-1:** At least **60% of newly registered users log at least one beer within their first 7 days**, within 6 months of public launch.

**SM-2:** At least **40% of weekly active users complete at least one drinking session per week** (end-to-end: start → log → end → publish or save private), within 12 months of launch.

**SM-3:** Average App Store and Google Play rating of **≥ 4.5 stars** sustained for 6 consecutive months after the first year.

**SM-4:** AI beer recognition delivers a **correct top-1 beer match for ≥ 85%** of clear label photos in supported regions (NA, EU, UK, AU), within 12 months of launch.

**SM-5:** At least **70% of posts** include a beer detail card populated automatically via the camera recognition flow (as opposed to fully manual entry), within 12 months of launch.

**SM-6:** Of users who engage with the **Beer Encyclopedia**, at least **30%** log a beer that they first discovered in the encyclopedia — within 12 months of launch.

## 2.4 Vision Statement

| For                      | beer drinkers — from casual weekend drinkers to passionate craft enthusiasts — and for the breweries and brands that make the beer they love                                                                                                             |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Who                      | want a single, modern, social, quantified home for the beer they drink, the friends they drink it with, and the brands behind it                                                                                                                         |
| The **Share a Beer** app | is a cross-platform mobile social network for beer                                                                                                                                                                                                       |
| That                     | combines a rich social feed, AI-powered beer recognition via camera, session tracking modeled on Strava, gamification and recaps, a beer / brewery encyclopedia, a live map of where the world is drinking, and verified brewery accounts with analytics |
| Unlike                   | Untappd (aging UX, limited session/recap/video mechanics), Vivino (wine-only), Instagram (not beer-aware, no beer metadata, no brewery tooling), or Strava (wrong vertical)                                                                              |
| Our product              | is purpose-built for beer, from the drink up — every photo, every session, every badge, every brewery account is designed around the beer itself, not bolted on top of a generic social feed                                                             |

## 2.5 Business Risks

**RI-1:** **Regulatory / legal exposure around alcohol promotion and age verification.** Jurisdictions differ significantly on how alcohol content can be advertised, whether influencer-like promotion is permitted, and what constitutes adequate age gating. A serious compliance miss could force an app-store takedown or regional block. (_Probability = 0.5; Impact = 9_)

**RI-2:** **App Store and Google Play policy risk.** Both stores maintain alcohol-related content policies and age-rating requirements. Rejection or delisting would be catastrophic for a mobile-first product. (_Probability = 0.3; Impact = 9_)

**RI-3:** **AI beer recognition accuracy below user expectations.** If camera recognition is unreliable, users fall back to manual entry, the core differentiation weakens, and the product looks like a worse Untappd. (_Probability = 0.5; Impact = 6_)

**RI-4:** **Incumbent competitive response.** Untappd could modernize, or a major consumer platform (Instagram, Strava, Yelp) could add beer-specific features. (_Probability = 0.4; Impact = 6_)

**RI-5:** **Low cold-start supply — not enough beers in the catalogue, or not enough breweries posting** — producing weak discovery and thin social content in the first 6 months. (_Probability = 0.6; Impact = 6_)

**RI-6:** **Public-health / reputational risk around promoting excessive drinking.** Gamification (streaks, leaderboards, session counts) must be tuned carefully to avoid encouraging unhealthy consumption, which would draw media and regulator criticism. (_Probability = 0.4; Impact = 7_)

**RI-7:** **Privacy and location-data sensitivity.** The Map View and session tracking involve location data, which creates GDPR / CCPA exposure and reputational risk if handled poorly. (_Probability = 0.3; Impact = 7_)

**RI-8:** **Brewery monetization may not materialize** at the pace required for BO-5 — breweries are generally lean and may not pay for analytics dashboards early on. (_Probability = 0.5; Impact = 5_)

## 2.6 Business Assumptions and Dependencies

**AS-1:** A third-party beer-data provider (e.g., a commercial beer database API) or a community-built catalogue can seed the initial Beer Encyclopedia with at least 250,000 beers across supported regions.

**AS-2:** A trainable computer-vision pipeline (either a fine-tuned foundation vision model or a purpose-built CV service) can achieve acceptable accuracy on beer-label recognition with a realistic data-collection program.

**AS-3:** Both Apple and Google will continue to allow alcohol-themed social apps under current content policies, provided age gating and community guidelines are enforced.

**AS-4:** A sufficient share of craft breweries (especially in NA, UK, EU, AU) are willing to claim verified accounts and post content on a new platform, on the promise of audience reach and analytics.

**AS-5:** Target users will accept, and often expect, location sharing when it is opt-in and clearly scoped (e.g., per-session, per-post), consistent with norms set by Instagram, Strava, and Untappd.

**DE-1:** Availability and pricing stability of a commercial or open-source **beer metadata API** (beer names, styles, ABV, IBU, brewery, descriptors) as the seed data source for the Beer Encyclopedia.

**DE-2:** Availability of a reliable **computer vision / multimodal inference provider** (e.g., a major foundation model API, a specialized OCR+classification service, or a self-hosted model on a managed GPU provider) for beer-label recognition.

**DE-3:** Availability of **mapping and geocoding services** (e.g., Mapbox, Google Maps Platform) for the Map View and session location features.

**DE-4:** A **cloud backend provider** with global presence, low-latency edge functions, and managed real-time data (Supabase, Firebase, AWS, GCP, or equivalent) for feed, messaging, and session data.

**DE-5:** An **age-verification / KYC-light provider** capable of supporting region-specific legal-drinking-age compliance in at least NA, UK, EU, and AU at launch.

**DE-6:** **App Store Connect** and **Google Play Console** approval and alcohol-rating compliance for distribution.

**DE-7:** A **push-notification infrastructure** (APNs + FCM) for social interactions, session events, and recap delivery.

---

# 3. Stakeholder Profiles and User Descriptions

## 3.1 Stakeholder Profiles

| Stakeholder                                       | Major value or benefit from this product                                                                                                                      | Attitudes                                                                                                                           | Major features of interest                                                                                                                                                | Constraints                                                                                                                             | End user? |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **Casual Beer Drinker**                           | A fun, low-effort way to remember and share the beers they drink with friends, and to see what friends are drinking.                                          | Enthusiastic but low-patience — will abandon the app quickly if logging is slow or the feed is empty.                               | AI camera logging, Following feed, friend tagging, direct messaging, simple session posts, weekly recaps.                                                                 | Must work on mid-tier iOS and Android devices; must be fast with intermittent connectivity; must not feel like a database.              | Yes       |
| **Craft Beer Enthusiast**                         | A rich, stat-driven home for their beer journey — tasting notes, styles tried, breweries explored, countries visited, ratings, recaps, and leaderboards.      | Highly engaged; will be early adopters and will push the product to the limits; vocal about data accuracy in the Beer Encyclopedia. | Beer Encyclopedia depth, session stats, achievements, streaks, stats dashboard, Map View, trending beers, brewery follows.                                                | Cares about correctness of beer metadata and community ratings; will churn to Untappd if the catalogue is weak.                         | Yes       |
| **Social Group / Friends Drinking Together**      | Ability to capture a shared drinking session, tag friends who were there, and post the session as a group memory.                                             | Social, not analytical — they want the session post to feel like a great shared photo album.                                        | Session creation, friend tagging in sessions, session-end post UX, media-rich posts, comments and likes.                                                                  | Needs to work across iOS and Android simultaneously in the same session (most groups are mixed-OS).                                     | Yes       |
| **Brewery / Brand Account**                       | A verified, direct channel to their drinkers with analytics on how their beers are received across regions and over time; a content surface for new releases. | Interested but skeptical — will adopt if audience and analytics are real; will churn if it becomes another unattended channel.      | Verified profile, ability to post, comment, respond to reviews, analytics dashboard (post count, ratings, regions, engagement), brewery detail page in Beer Encyclopedia. | Limited marketing headcount; needs a UX that is near-zero effort to maintain; likely wants scheduling + cross-post features eventually. | Yes       |
| **Platform Admin**                                | Tooling to keep the platform safe, compliant, and on-brand — moderation, account management, age-verification oversight, and escalation.                      | Operationally focused; will judge the product on how quickly flagged content can be triaged.                                        | Moderation queue, flagging tools, post/account takedown, age-verification review, audit logs, appeal handling.                                                            | Must meet SLAs for reported content; must maintain auditability for regulatory scrutiny.                                                | Yes       |
| **Legal / Compliance (internal)**                 | Confidence that the product is compliant with alcohol, age-gating, and data-privacy regulations across launch jurisdictions.                                  | Cautious, risk-averse; final approver of age-verification, location-data handling, and content policies.                            | Age verification flow, data residency, consent flows, takedown policy, terms of service, community guidelines.                                                            | Must sign off before launch in each region; may veto specific features or geographies.                                                  | No        |
| **Danny Mairena (Founder / PM / Technical Lead)** | Personal-project-level ownership of product direction, technical architecture, and launch strategy.                                                           | Fully committed; operates as product, technical, and go-to-market lead in early phase.                                              | All features; prioritization; stack decisions; hiring and vendor selection.                                                                                               | Solo or near-solo in early phase; timeline is constrained by bandwidth.                                                                 | No        |

## 3.2 User Environment

Share a Beer is a **mobile-first, always-in-the-moment** application. The critical usage context is **"I am holding a beer right now, in a bar or at a friend's house or at a brewery, and I want to capture it in under 15 seconds."** That context dominates every design decision:

- **Devices:** iPhone and Android smartphones, including mid-tier devices several years old. No tablet-first design. No mandatory web companion for v1.
- **Operating systems:** iOS 16+ and Android 11+ (API level 30+) at launch.
- **Network conditions:** Frequently poor — bars, basements, breweries, crowded venues, rural taprooms. The app must tolerate intermittent connectivity, queue beer logs and session events locally, and sync when connectivity returns.
- **Lighting:** Often dim. The camera-recognition flow must work in low light and with flash.
- **Concurrency:** Feed reads and session writes happen in parallel. A user may be scrolling the feed while a session is actively tracking.
- **Social context:** The user is usually not alone. Workflows that demand long focused attention (typing long captions, filling multi-screen forms) will be abandoned. Quick-capture is the dominant interaction pattern.
- **Cross-platform:** Friend groups are mixed iOS/Android, so session tagging, direct messaging, and posts must be perfectly symmetric across platforms. A feature that exists on one OS but not the other is effectively broken.
- **Integrations:** Native camera, native photo library, push notifications (APNs/FCM), native location services, native share sheet (for recap cards). No specific enterprise integrations are required at launch.
- **Time zones and locales:** Global from day one — feed content, map view, trending beers, and recaps must be timezone-aware and localized.
- **Session duration:** Users may leave the app open for an active drinking session for 2–6 hours. Background location and background session tracking must be power-efficient.

## 3.3 Alternatives and Competition

### Untappd

- **Strengths:** Largest existing beer-logging community, deep beer catalogue, established brewery relationships, recognizable brand in the space, check-in mechanic is well understood.
- **Weaknesses:** Dated UX; limited video and rich-media support; no session tracking; no AI camera recognition (manual search is the dominant path); no Strava-style recaps; limited social graph mechanics; brewery analytics are basic; weak gamification.

### Vivino

- **Strengths:** Excellent camera recognition for wine labels, strong catalogue, smooth onboarding, recognized product model.
- **Weaknesses:** Wine-only; no beer coverage; no session / drinking-with-friends concept; social layer is secondary to purchase / price lookup.

### Instagram

- **Strengths:** Massive audience, best-in-class feed and stories/reels, strong creator tooling, frictionless cross-posting.
- **Weaknesses:** Not beer-aware — beer posts are just images with captions; no structured beer metadata, no Beer Encyclopedia, no session concept, no brewery-specific analytics, no beer-style discovery, and posts compete with all other content verticals for attention.

### Strava

- **Strengths:** Gold standard for session tracking, kudos, segments, weekly/monthly recaps, and gamified engagement. A proven model for how to turn an activity into a social feed.
- **Weaknesses:** Wrong vertical; no beer metadata, no recognition, no brewery accounts — useful as a product analog, not as a substitute.

### Google Maps / Yelp (discovery alternative)

- **Strengths:** Already has breweries and bars indexed with reviews, hours, and photos.
- **Weaknesses:** Generic; no beer-level metadata, no follow graph, no sessions, no achievements, no brewery owner tooling comparable to a verified brand account with analytics.

### Status quo ("no app" / "just post to a general social feed")

- **Strengths:** Zero onboarding cost.
- **Weaknesses:** Nothing is remembered, nothing is quantified, nothing is discoverable later, and breweries have no structured signal on how their beers are performing.

**Net competitive position:** Share a Beer's differentiation is the **combination** — AI-first capture, session tracking, gamification, encyclopedia, map, and brewery tooling — delivered in a modern, mobile-first UX. No single competitor spans that surface.

---

# 4. Scope and Limitations

## 4.1 Product Perspective

Share a Beer is a **standalone cross-platform mobile application** with a supporting cloud backend. It is not an extension of an existing product. At a high level, the system is composed of:

- A **mobile client** (iOS and Android) that is the sole end-user interface.
- A **backend API** providing authentication, feed, posts, sessions, beers, breweries, messaging, follows, notifications, and admin / moderation services.
- A **beer recognition service** — a computer-vision pipeline that takes a camera frame and returns a ranked list of candidate beers with confidence scores.
- A **beer catalogue / encyclopedia data store**, seeded from a third-party beer-data provider and continuously enriched by community contributions.
- A **media storage and CDN layer** for photos and videos attached to posts.
- A **real-time messaging and notification layer** for direct messages, comments, likes, and session events.
- A **brewery analytics service** that aggregates engagement metrics per beer, per brewery, per region, per time window.
- A **moderation / admin console** (web-based, admin-only) for content review, account management, and audit logs.
- **External dependencies:** App Store / Play Store for distribution; APNs and FCM for push; Apple Sign-In / Google Sign-In for auth; age-verification provider; mapping and geocoding provider; beer metadata provider; CV/ML inference provider.

The consumer mobile app is the _only_ end-user surface at launch. The admin console is internal. A public brewery web portal may be considered in a later phase but is out of scope for v1.

## 4.2 Major Features / Scope

### Onboarding, Identity, and Compliance

**FE-1: Account Creation and Authentication.** Sign up and sign in via email, Apple ID, and Google. Session persistence, password reset, and secure token management.

**FE-2: Age Verification.** A mandatory onboarding step that confirms the user meets the legal drinking age for their region, with region-aware logic and audit-ready records. (See _Other Product Requirements_.)

**FE-3: Profile Management.** User profile with display name, handle, avatar, bio, location (optional, coarse), favorite styles, and drink-preference toggles. Editable post-onboarding.

**FE-4: Privacy Controls.** Per-account and per-post privacy settings (public, followers-only, private), location-sharing granularity, and a dedicated privacy center.

### Social Feed

**FE-5: For You Feed.** Algorithmically curated, personalized feed of posts from across the platform, ranked by a combination of freshness, affinity, engagement, and diversity.

**FE-6: Following Feed.** Reverse-chronological feed of posts from accounts the user follows.

**FE-7: Post Creation — Beer Post.** Compose and publish a post consisting of one or more photos or videos, an attached beer detail card, location (optional), caption, friend tags, and hashtags.

**FE-8: Likes, Comments, and Reposts.** Standard engagement primitives on every post, with real-time counts and notifications.

**FE-9: Friend Tagging.** Tag other users in posts and in sessions, with notification to the tagged user.

**FE-10: Direct Messaging.** One-to-one and small-group text messaging, with the ability to attach a beer detail card as a "recommendation."

### Beer Recognition and Logging

**FE-11: Camera-Based Beer Recognition.** Point-and-shoot label recognition via on-device or server-side CV/ML that returns a confidence-ranked list of candidate beers and auto-populates the beer detail card on the user's confirmation.

**FE-12: Manual Beer Search and Entry.** Full-text search across the Beer Encyclopedia with filters (style, brewery, ABV range, region). If the beer is not found, the user may contribute a new entry, which enters a moderation queue.

**FE-13: Beer Detail Card.** A reusable, embeddable card shown on posts, sessions, and DMs, displaying beer name, style, ABV, IBU (when available), brewery, tasting notes, and community rating.

### Session Tracking

**FE-14: Start / End a Drinking Session.** Initiate an active session with a start time, optional location, and optional tagged friends. End the session to finalize total duration, beer count, and session beer list.

**FE-15: Log Beers During an Active Session.** Log individual beers (via camera recognition or manual entry) into the currently active session.

**FE-16: Session Post.** At session end, choose to publish the session publicly (appears in feed with session stats card), keep it private (only appears in personal stats), or cancel.

**FE-17: Session Stats Card.** Auto-generated visual summary of a session: total duration, number of beers, beers logged, locations, participants — shareable to the feed or externally.

### Gamification, Achievements, and Stats

**FE-18: Badges and Achievements.** Unlockable badges tied to milestones (beer counts, style diversity, country diversity, session counts, streaks, brewery loyalty).

**FE-19: Streaks.** Recurring-pattern tracking (e.g., "logged a beer every Friday for N weeks").

**FE-20: Weekly and Monthly Recaps.** Auto-generated personal recap cards (like Spotify Wrapped but for beer) showing top styles, top breweries, most active drinking days, new countries and breweries explored. Shareable to the feed and to external platforms.

**FE-21: Leaderboards.** Regional and global leaderboards for most beers logged, most diverse styles, most countries (see _Other Product Requirements_ for fairness / anti-abuse rules).

**FE-22: Personal Stats Dashboard.** All-time and time-filtered stats: total beers, favorite styles, breweries tried, countries explored, session history, achievement and badge collection.

### Discovery

**FE-23: Beer Encyclopedia.** Browse and search beers, styles, and breweries independently of posts. Each beer has a detail page with characteristics, community ratings, and a feed of posts featuring that beer.

**FE-24: Brewery Pages.** Dedicated brewery pages linked from every beer — either a verified brewery account (FE-27) or a public placeholder page until claimed.

**FE-25: Map View.** Real-time, global map showing where people are drinking right now, filterable by beer style, brewery, or followed users only. Coarse-by-default, privacy-aware.

**FE-26: Trending Beers.** Weekly and regional trending beers based on log/post activity, surfaced in a dedicated Trending section.

### Brewery and Brand Accounts

**FE-27: Verified Brewery / Brand Account.** Distinct profile type with verification badge; ability to post content, respond to comments, reply to reviews, and follow community activity around their beers.

**FE-28: Brewery Analytics Dashboard.** Mobile-accessible dashboard with post count on the brewery's beers, average rating, top regions, engagement metrics, and trend lines over time.

**FE-29: Brewery Post Distribution.** Brewery posts appear in user feeds (both For You and Following) based on follow graph and algorithmic relevance; brewery posts are clearly identifiable as verified brand content.

### Moderation and Admin

**FE-30: User Reporting / Flagging.** Any user can flag a post, comment, direct message, or account for review, with a reason category.

**FE-31: Moderation Queue.** An admin-facing moderation queue with flagged content, context, flag count, reporter metadata, and action controls (remove, warn, suspend, ban, dismiss).

**FE-32: Account Management (Admin).** Admin ability to suspend, ban, merge, or restore accounts, with full audit trail.

**FE-33: Community Guidelines Surface.** In-app surfacing of community guidelines, with contextual reminders at high-risk interaction points (reporting, commenting on a brewery post, age verification).

**FE-34: Audit Logs.** Immutable logs of all moderation actions, age-verification decisions, and sensitive account changes, accessible to admins for compliance review.

### Feature Priority Summary

| Priority                                       | Features                                                                                                                                                |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Must-have (v1 launch)**                      | FE-1, FE-2, FE-3, FE-4, FE-5, FE-6, FE-7, FE-8, FE-11, FE-12, FE-13, FE-14, FE-15, FE-16, FE-17, FE-22, FE-23, FE-27, FE-30, FE-31, FE-32, FE-33, FE-34 |
| **Should-have (fast-follow, within 3 months)** | FE-9, FE-10, FE-18, FE-20, FE-25, FE-26, FE-28, FE-29                                                                                                   |
| **Nice-to-have (6+ months)**                   | FE-19, FE-21, FE-24 (enriched brewery pages)                                                                                                            |

## 4.3 Deployment Considerations

### Mobile Stack Recommendation: **React Native (Expo)**

**Recommendation:** Build Share a Beer on **React Native with Expo (bare workflow)**, using **TypeScript**, **Expo Router** for navigation, and native modules for camera, location, and background session tracking.

**Justification:**

- **Feature surface is standard-consumer-social, not bleeding-edge-native.** The Share a Beer feature set — feeds, posts, camera capture, maps, messaging, push notifications — is exactly the surface that React Native handles well and for which a very deep ecosystem of libraries exists (FlashList for feeds, Reanimated for interactions, Expo Camera, Expo Location, Expo Notifications, react-native-maps, etc.). There is no feature in scope that requires dropping to native.
- **Cross-platform parity is a business requirement, not an optimization.** Mixed iOS/Android friend groups mean that a feature shipping first on iOS, or behaving differently on Android, is effectively broken. React Native gives the best shared-code ratio for a small team aiming at genuine parity, while still allowing targeted native modules where needed.
- **Team velocity and hiring.** The JavaScript/TypeScript + React talent pool is the largest in consumer mobile, which matters for an early project being built by a small team. Flutter's Dart ecosystem is smaller, and native (Swift + Kotlin) requires two parallel codebases, which is not economical at this scale.
- **Expo-specific advantages.** EAS Build, Over-the-Air updates via `expo-updates` (bug fixes without App Store review), prebuild for ejecting to native when needed, and first-class TypeScript support materially reduce ops cost early.
- **CV integration is server-side, not on-device (at v1).** Beer recognition will call a server-side CV endpoint; the client just captures the frame and uploads it. This removes the one area where Flutter/native would have had an edge (on-device model performance). On-device CV can be added later via a native module without rewriting the app.
- **Flutter trade-off.** Flutter renders beautifully and performs well, but its ecosystem for social / video / chat primitives is thinner, interop with native SDKs (e.g., some age-verification SDKs, payment SDKs, ad SDKs) is less mature, and the hiring pool is smaller.
- **Native trade-off.** True native (SwiftUI + Jetpack Compose) delivers maximum polish, but doubles engineering cost and doubles the risk of cross-platform drift — unacceptable for this product and team size.

**Complementary technology choices:**

- **Language:** TypeScript end-to-end (mobile and backend where possible).
- **Backend:** A managed backend platform at launch (**Supabase** or **Firebase**) for Postgres/Auth/Storage/Realtime, with dedicated Node.js services for ranked feed generation, recaps, leaderboards, analytics aggregation, and CV orchestration. Move to a purpose-built infrastructure only when scale requires it.
- **Storage / CDN:** Cloudflare R2 or S3 + CloudFront for media; a dedicated image/video transcoding pipeline.
- **Realtime / messaging:** WebSockets or the managed realtime layer of the backend platform; push via APNs and FCM.
- **Maps:** Mapbox for the Map View (competitive pricing, strong styling, good React Native SDK).
- **Beer metadata source:** A commercial beer-data API as the initial seed, with a moderated community-contribution path.
- **CV / beer recognition:** A multimodal foundation-model endpoint for v1 (fastest path to accuracy), with option to move to a fine-tuned purpose-built classifier once volume and label data justify it.
- **Age verification:** A specialized age-verification SDK per region, integrated natively where required.
- **Analytics:** Amplitude or PostHog for product analytics; dedicated warehouse (BigQuery or Snowflake) for brewery analytics aggregation.

### Deployment Workflow

- **Distribution:** App Store (iOS) and Google Play (Android). Rollouts are phased, starting with internal builds via TestFlight and Google Play Internal Testing, followed by closed beta, open beta, and general availability.
- **Release cadence:** Biweekly native releases via EAS Build; out-of-band OTA bug fixes via `expo-updates`.
- **Observability:** Crash reporting (Sentry), app performance monitoring, and backend APM from day one.
- **Geographic rollout:** Launch in North America first, then UK, EU, Australia, New Zealand. Each new region requires legal / age-verification review.
- **Data residency:** Primary region US-East at launch; EU region added before EU launch to satisfy GDPR considerations.
- **Support:** In-app feedback form and support email; admin console for moderators with SLA targets on flagged content.
- **Training and documentation:** Brewery onboarding guide, community guidelines, moderator runbook, and user help center are in scope for launch.

---

# 5. Other Product Requirements

### Performance

- **Cold start to interactive feed:** ≤ 2.5 seconds on a mid-tier 2022 device.
- **Warm feed refresh:** ≤ 1 second to first new post.
- **Camera-to-recognition-result:** ≤ 3 seconds end-to-end on a good network connection for server-side recognition; graceful degradation on poor connectivity.
- **Post publish (beer post with one photo):** ≤ 2 seconds to acknowledged send; media finishes uploading in the background.
- **Session event logging:** local-first — a beer logged during an active session is persisted locally immediately and synced when online; no user-visible latency.
- **Map view initial render:** ≤ 2 seconds to display the first 50 pins after location permission is granted.

### Reliability and Offline Behavior

- **Crash-free session rate:** ≥ 99.5% at steady state.
- **Offline behavior:** Reads from the Following feed are cached for the last session; beer logs and session events queue locally and sync automatically on reconnect; post drafts survive app restarts.
- **Uptime target:** 99.9% monthly for the backend API at steady state.

### Usability and Accessibility

- Must meet **WCAG 2.1 AA** color contrast and hit-target guidance on critical flows (onboarding, beer logging, posting, messaging).
- Full support for **Dynamic Type** on iOS and equivalent font scaling on Android.
- Full support for **VoiceOver** and **TalkBack** on all core flows.
- Localized for English at launch; architected for additional locales (French, Spanish, German, Dutch) in Phase 2.

### Privacy and Data Protection

- Compliant with **GDPR** (EU), **UK GDPR**, **CCPA / CPRA** (California), **PIPEDA** (Canada), and **Australian Privacy Principles** at launch markets.
- **Explicit consent** for location sharing, session location, and Map View participation; location granularity is configurable per post and per session.
- **Data subject rights:** In-app export and delete flows, processed within 30 days.
- **Data minimization:** The app collects only what is needed for the feature being used; sensitive attributes are never required.
- **Direct messages** are encrypted in transit; encryption at rest follows cloud-provider defaults at launch, with E2EE evaluated in a later phase.

### Legal and Regulatory (Alcohol)

- **Age verification is mandatory** at onboarding, before any content is visible. Users who cannot verify are kept in a locked state.
- **Region-aware legal drinking age:** 18, 19, or 21 depending on jurisdiction; determined from device locale and verified during onboarding.
- The app **does not sell alcohol** and does not facilitate alcohol sales; it is a social and informational product only.
- **Brewery content policies** prohibit targeting of minors, and explicitly prohibit language, imagery, or promotions that target minors.
- **Responsible-drinking messaging:** Surfaced during onboarding, periodically in recaps, and in the settings center. Gamification (streaks, leaderboards) is tuned to avoid rewarding excessive consumption (see business rules in `USE_CASES.md`).
- **Compliance with App Store alcohol content policy** and **Google Play alcohol content policy**, including age rating and regional availability restrictions.

### Security

- Authentication via **OAuth 2.0 / OIDC** (Apple, Google) and email + password with **bcrypt / argon2** hashing.
- **MFA** available on all user accounts and **required** on all brewery accounts and admin accounts.
- **TLS 1.3** for all client-server traffic.
- **Role-based access control** for admin and brewery tooling.
- **Rate limiting and bot protection** on authentication, posting, and messaging endpoints.
- **Secrets management:** Per-environment vaulted secrets; no secrets in client binaries.
- **Pen-test cadence:** Third-party penetration test before public launch and annually thereafter.

### Age-Verification Compliance

- Age verification must produce an **audit-ready record** with timestamp, method, region, and verification-provider reference.
- A **failed age-verification attempt** locks the account from content access until re-verified or appealed; repeated failed attempts trigger review.
- Age-verification records are retained per the retention policy of the chosen provider and applicable law; personally identifying information from the age-verification provider is not persisted in the application database beyond the pass/fail decision and metadata.

### Documentation and Support

- **User-facing:** In-app help center, community guidelines, FAQs, responsible-drinking resources.
- **Brewery-facing:** Brewery onboarding guide, analytics dashboard documentation, posting best practices.
- **Admin-facing:** Moderator runbook, escalation procedures, audit-log usage guide.
- **Developer-facing:** Internal architecture documentation, API reference, incident runbooks.

### Compliance and Audit Readiness

- **ISO 27001-aligned** information-security controls from launch; formal certification planned by Month 18.
- **SOC 2 Type II** readiness targeted by Month 24 to support B2B brewery-tier sales.
- **Regulatory takedown process** operable within 24 hours in all launch regions.

---

**Confidential** — © Personal Project (Danny Mairena), 2026
