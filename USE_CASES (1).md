# Share a Beer — Use Cases

| **Share a Beer** | **Version: 1.0** |
| --- | --- |
| Use Cases | **Date: 17/Apr/26** |
| Document ID: SAB-UC-001 | |

**Personal Project (Danny Mairena)**

**Share a Beer**
**Use Cases**
**Version 1.0**

## Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 17/Apr/26 | 1.0 | Initial Use Cases document for Share a Beer, covering 26 use cases across User, Brewery/Brand, and Platform Admin actors, plus Business Rules. | Danny Mairena |

## Table of Contents

- Use Case List
- UC-1: Register and complete age verification
- UC-2: Log a beer via camera recognition
- UC-3: Log a beer via manual search or input
- UC-4: Create and publish a beer post
- UC-5: Start a drinking session
- UC-6: Log beers during an active session
- UC-7: End and publish a session
- UC-8: Browse the For You feed
- UC-9: Browse the Following feed
- UC-10: Like and comment on a post
- UC-11: Repost / share a post
- UC-12: Tag friends in a post or session
- UC-13: Send a beer recommendation via direct message
- UC-14: View a beer's detail page in the Beer Encyclopedia
- UC-15: Explore the Map View
- UC-16: View trending beers
- UC-17: View personal stats dashboard
- UC-18: View weekly / monthly recap
- UC-19: Earn a badge or achievement
- UC-20: Follow / unfollow a user
- UC-21: Edit profile information
- UC-22: Create and publish brewery content
- UC-23: Respond to a post or comment about their beer
- UC-24: View brewery analytics dashboard
- UC-25: Moderate flagged content
- UC-26: Manage user accounts
- Business Rules

---

# Use Case List

| **Primary Actor** | **Use Cases** |
| --- | --- |
| **User** (Casual / Enthusiast) | UC-1: Register and complete age verification; UC-2: Log a beer via camera recognition; UC-3: Log a beer via manual search or input; UC-4: Create and publish a beer post; UC-5: Start a drinking session; UC-6: Log beers during an active session; UC-7: End and publish a session; UC-8: Browse the For You feed; UC-9: Browse the Following feed; UC-10: Like and comment on a post; UC-11: Repost / share a post; UC-12: Tag friends in a post or session; UC-13: Send a beer recommendation via direct message; UC-14: View a beer's detail page in the Beer Encyclopedia; UC-15: Explore the Map View; UC-16: View trending beers; UC-17: View personal stats dashboard; UC-18: View weekly / monthly recap; UC-19: Earn a badge or achievement; UC-20: Follow / unfollow a user; UC-21: Edit profile information |
| **Brewery / Brand Account** | UC-22: Create and publish brewery content; UC-23: Respond to a post or comment about their beer; UC-24: View brewery analytics dashboard |
| **Platform Admin** | UC-25: Moderate flagged content; UC-26: Manage user accounts |

---

# Use Case 1: Register and complete age verification

| UC ID and Name: | UC-1: Register and complete age verification |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User (new) | Secondary Actors: | Age Verification Provider, Identity Provider (Apple / Google) |
| Trigger: | A new user installs the app, opens it, and chooses to create an account. |
| Description: | A new user creates an account and completes a mandatory, region-aware age-verification step before gaining access to any Share a Beer content or social features. Until verification succeeds, the account is in a locked state. |
| Preconditions: | PRE-1. The user has installed the app on a supported device (iOS 16+ or Android 11+). PRE-2. The device has working internet connectivity. PRE-3. The user's region is supported for launch. |
| Postconditions: | POST-1. A new user account exists in the System with a status of `active` and `age_verified = true`. POST-2. An audit record of the age-verification decision (timestamp, region, method, provider reference, pass/fail) is stored. POST-3. The user is signed in and lands on the main feed. |
| Main Success Scenario: | 1. The System displays the sign-up screen with three options: email, Apple, Google. 2. The User selects a sign-up method and completes identity creation (email + password, or Apple / Google OAuth). 3. The System creates a provisional account in `pending_age_verification` status. 4. The System detects the user's region from device locale and IP and determines the applicable legal drinking age (see BR-1). 5. The System presents the age-verification flow and explains why it is required. 6. The User submits age-verification information via the Age Verification Provider (method depends on region — e.g., date of birth plus a government-ID check, or a third-party attribute check; see BR-1). 7. The Age Verification Provider returns a pass decision. 8. The System records an audit entry (POST-2), updates the account to `active` and `age_verified = true`. 9. The System walks the User through the profile setup (display name, handle, avatar) and the privacy preferences. 10. The System shows the community guidelines and responsible-drinking notice and requires acknowledgment. 11. The System signs the User in and navigates to the For You feed. Use case ends. |
| Extensions: | **4a. Region is not supported at launch:** 4a1. The System informs the User that Share a Beer is not yet available in their region, captures an email for launch notification, and terminates the use case. **6a. User declines to provide age-verification information:** 6a1. The System explains that access is not possible without verification and offers to retry. 6a2. If the User declines again, the account remains in `pending_age_verification` indefinitely and the use case terminates. **7a. Age Verification Provider returns a fail decision (underage):** 7a1. The System marks the account as `blocked_underage`, prevents sign-in, records the audit entry, and informs the User. (See BR-2.) 7a2. Use case terminates. **7b. Age Verification Provider returns an inconclusive result:** 7b1. The System offers an alternative verification path (e.g., document upload). 7b2. On a second inconclusive result, the System escalates to manual review (see UC-26) and displays a pending-review state; the User may not access content until the review is resolved. **2a. Duplicate email on sign-up:** 2a1. The System informs the User that an account with that email already exists and offers to sign in or reset password. Use case terminates. |
| | **2.0.E1. Network failure during sign-up:** The System retains inputs, displays an offline banner, and retries on reconnect. **6.0.E1. Age Verification Provider outage:** The System queues the provisional account, informs the User, and completes verification when the provider is reachable. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Once per user (lifetime). High volume during launch campaigns. |
| Business Rules: | BR-1, BR-2, BR-4 |
| Associated Information: | **Account details captured at registration:** display name (String, required, 2–30 chars), handle (String, required, unique, 3–20 chars, alphanumeric + underscore), email (String, required, valid email), password (String, required if email sign-up, ≥ 10 chars with strength check) or OAuth token (Apple / Google). **Age-verification audit record:** `user_id`, `region`, `method`, `provider_reference`, `decision`, `timestamp`. **Notifications:** welcome push notification after completion; welcome email. The User shall be able to cancel the registration at any time prior to the final community-guidelines acknowledgment step. |
| Related Use Cases: | UC-21 (Edit profile information); UC-26 (Manage user accounts — manual review path) |
| Assumptions: | The chosen Age Verification Provider supports all launch regions. Device locale is a reasonable proxy for the user's region at onboarding. |
| Open Issues: | Final list of age-verification methods per launch region, pending legal review. |

---

# Use Case 2: Log a beer via camera recognition

| UC ID and Name: | UC-2: Log a beer via camera recognition |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Beer Recognition Service, Beer Encyclopedia |
| Trigger: | The User taps the Log Beer action and selects the Camera tab. |
| Description: | The User captures a photo of a beer label using the in-app camera; the System uses a computer-vision recognition service to identify the beer and auto-populate a beer detail card for review and confirmation. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The User has granted the app camera permission, or the System is able to request it inline. PRE-3. The device has internet connectivity (required for server-side recognition). |
| Postconditions: | POST-1. A confirmed beer detail card is associated with either a draft post (see UC-4) or the active session (see UC-6). POST-2. The captured photo is uploaded and stored in media storage and linked to the draft post or session log. |
| Main Success Scenario: | 1. The User opens the Log Beer screen and selects the Camera tab. 2. The System requests camera permission if not yet granted and opens the viewfinder with guide framing for a beer label. 3. The User aligns the label and captures a photo. 4. The System submits the photo to the Beer Recognition Service. 5. The Beer Recognition Service returns a ranked list of candidate beers with confidence scores. 6. The System displays the top candidate as a pre-filled beer detail card (name, style, ABV, brewery, tasting notes) along with a "Not this one?" action showing the next 3–5 candidates. (See BR-3.) 7. The User reviews and confirms the top candidate, or selects a different candidate from the list. 8. The System confirms the beer selection and presents the beer detail card for final review, with optional fields (serving size, rating 1–5, short tasting note, location on/off). 9. The User confirms. 10. The System attaches the beer detail card and the photo to either a draft post (if triggered from the feed tab) or to the active session (if triggered during a session — see UC-6). Use case ends. |
| Extensions: | **5a. Confidence score for the top candidate is below the acceptance threshold (see BR-3):** 5a1. The System displays a "We weren't sure — is this right?" state with the top candidates and a clear path to UC-3 (manual search). 5a2. The User selects a candidate, or taps "Search manually" and the flow continues in UC-3 with the captured photo carried over. **5b. No candidates are returned (e.g., not a beer label):** 5b1. The System informs the User and offers to retake the photo or switch to manual search (UC-3). **7a. The User rejects all candidates:** 7a1. The System offers manual search (UC-3) with the photo and any partial text read from the label carried over. **8a. The User toggles location off:** 8a1. The System records no location on the beer log. **Anywhere in the flow:** the User may cancel and return to the previous screen; any captured photo is discarded. |
| | **4.0.E1. Beer Recognition Service is unavailable:** The System informs the User of a recognition outage and offers to continue via manual search (UC-3) with the photo attached. **4.0.E2. Network timeout:** The System retries once; on second failure, degrades to manual search. **3.0.E1. Camera permission denied:** The System explains why camera access is needed and offers deep-link into settings and manual search as alternatives. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Very high — target of 5+ per active user per week at steady state. |
| Business Rules: | BR-3, BR-7 |
| Associated Information: | **Beer detail card fields:** beer ID (String, system-assigned), name (String, required), style (Enum, required), ABV (Number, optional, 0.0–25.0), IBU (Number, optional, 0–120), brewery (String, required), tasting notes (String, optional, ≤ 500 chars), community rating (Number, computed). **User log fields:** serving size (Enum: can, bottle, draft, flight, other), user rating (1–5 stars, optional), short tasting note (≤ 280 chars), location (optional, coarse by default, see BR-5), timestamp (system). **Recognition request:** image bytes, device region, top-K = 5. **Recognition response:** candidate list with `beer_id`, `name`, `brewery`, `confidence`. Confidence thresholds are defined in BR-3. |
| Related Use Cases: | UC-3 (manual search fallback); UC-4 (post creation); UC-6 (log during session); UC-14 (view beer detail page) |
| Assumptions: | The Beer Recognition Service is server-side and returns within the performance target (≤ 3s). Offline recognition is out of scope for v1. |
| Open Issues: | None. |

---

# Use Case 3: Log a beer via manual search or input

| UC ID and Name: | UC-3: Log a beer via manual search or input |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Beer Encyclopedia |
| Trigger: | The User taps Log Beer and selects the Search tab, or is routed here from a failed camera recognition (UC-2). |
| Description: | The User searches the Beer Encyclopedia for a beer and attaches the resulting beer detail card to a draft post or active session. If the beer is not found, the User can submit a new entry, which is placed in a moderation queue. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The Beer Encyclopedia is reachable. |
| Postconditions: | POST-1. A confirmed beer detail card is associated with either a draft post or the active session. POST-2. If a new beer is submitted, a pending entry is created in the Beer Encyclopedia moderation queue. |
| Main Success Scenario: | 1. The System displays the search input with filters (style, brewery, region) and recent searches. 2. The User types a query (beer name, brewery, or style). 3. The System returns ranked matches from the Beer Encyclopedia as the User types (debounced). 4. The User selects a beer. 5. The System displays the beer detail card with optional log fields (serving size, rating, tasting note, location). 6. The User confirms. 7. The System attaches the beer detail card to the draft post or active session. Use case ends. |
| Extensions: | **3a. No matches found:** 3a1. The System offers a "Can't find your beer?" action that opens a new-beer submission form (fields: beer name, brewery, style, ABV, short description, optional photo). 3a2. The User submits; the System validates and creates a pending entry in the moderation queue. 3a3. For the purpose of logging, the System allows the User to proceed with the pending entry attached, clearly labeled as `Unverified` on the beer detail card. **2a. The User clears the query:** 2a1. The System displays suggested beers (recent logs, trending beers, beers from followed breweries). **5a. The User changes the beer after confirmation:** 5a1. The User returns to step 2. |
| | **3.0.E1. Beer Encyclopedia search service is unavailable:** The System displays an error with retry and offers to save the log as a draft (beer name as free text) for completion when connectivity is restored. **7.0.E1. Attachment to session fails (active session no longer exists):** The System offers to save as a draft post or start a new session. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Medium — target of 1–2 per active user per week at steady state (fallback path from UC-2). |
| Business Rules: | BR-7, BR-8 |
| Associated Information: | **Search query parameters:** `query` (String), `style_filter` (Enum, optional), `brewery_filter` (String, optional), `region_filter` (String, optional). **Search result item:** `beer_id`, `name`, `brewery`, `style`, `abv`, `thumbnail`, `is_verified`. **New-beer submission fields:** name (String, required, 2–120), brewery (String, required), style (Enum, required, see BR-8), ABV (Number, optional, 0.0–25.0), description (String, optional, ≤ 500), photo (Image, optional). **Unverified entry behavior:** `Unverified` badge on the beer detail card until moderation approves the entry; the User's log is retained and updated to the canonical beer on approval. |
| Related Use Cases: | UC-2 (camera path, upstream); UC-4, UC-6, UC-7 (destinations); UC-14 (beer detail page); UC-25 (moderation of new beer submissions) |
| Assumptions: | Encyclopedia search supports debounced prefix matching. New-beer submissions are subject to moderation turnaround. |
| Open Issues: | Final moderation SLA for new-beer submissions. |

---

# Use Case 4: Create and publish a beer post

| UC ID and Name: | UC-4: Create and publish a beer post |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Media Storage, Feed Ranking Service, Follower base |
| Trigger: | The User completes UC-2 or UC-3 from the feed/post entry point, or taps Create Post. |
| Description: | The User composes a post consisting of one or more photos or videos, a beer detail card, an optional caption and hashtags, optional friend tags, and a privacy setting, then publishes it to the feed. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. At least one media asset OR an attached beer detail card is present. |
| Postconditions: | POST-1. A new post exists in the System with `status = published` and the selected privacy setting. POST-2. Media assets are uploaded and available via CDN. POST-3. Tagged friends receive a notification (see UC-12). POST-4. Followers see the post appear in their Following feed; the post is eligible for the For You feed per ranking rules. |
| Main Success Scenario: | 1. The System displays the compose screen with sections for media, beer detail card, caption, tags, and privacy. 2. The User adds or confirms photos / videos (up to 10 media assets, see BR-9). 3. The User confirms the attached beer detail card (from UC-2 or UC-3). 4. The User writes an optional caption (≤ 2,200 chars) and hashtags. 5. The User optionally tags friends (UC-12). 6. The User selects a privacy level (public, followers-only, or private — default follows the account's global default). 7. The User taps Publish. 8. The System validates the post payload against the "Post validation rules" in Associated Information. 9. The System uploads any pending media in the background, creates the post, and returns success. 10. The System distributes the post to feeds (Following immediately; For You after ranking). 11. The System sends notifications to tagged users and, where applicable, the brewery associated with the beer (see BR-10). Use case ends. |
| Extensions: | **2a. The User attaches no media but has a beer detail card:** 2a1. The post is allowed as a text + beer card post. **8a. Validation rule violation (e.g., caption too long, unsupported media format, hate-speech pre-filter flag):** 8a1. The System surfaces the error inline and the User corrects it. **9a. Media upload fails mid-publish:** 9a1. The System saves the post as a local draft and retries upload; the post appears only after upload succeeds. **6a. The User selects "Private":** 6a1. The post is visible only to the User; it does not enter any feed and no notifications are sent. |
| | **9.0.E1. Backend unavailable:** Post is queued locally and published on reconnect; the User sees a "Posting…" indicator on their profile. **4.0.E1. Hashtag banned by moderation:** Banned hashtag is stripped; User is notified. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Very high — multiple posts per active user per week at steady state. |
| Business Rules: | BR-8, BR-9, BR-10, BR-11 |
| Associated Information: | **Post validation rules:** media count 0–10 (at least 1 media asset OR a beer detail card required); photo formats JPEG/PNG/HEIC, ≤ 20 MB; video formats MP4/MOV, ≤ 90s, ≤ 250 MB; caption 0–2,200 chars; hashtags ≤ 30, each 1–50 chars, alphanumeric + underscore; friend tags ≤ 20. **Privacy default:** inherits account setting; override per post. **Notifications:** tagged users (push + in-app); associated brewery (only if beer is from a verified brewery account that has opted in to mentions). **Ranking signals recorded:** author ID, beer ID, brewery ID, region, styles, timestamp, privacy, tagged users. |
| Related Use Cases: | UC-2, UC-3 (logging); UC-7 (session posts take a similar but auto-generated path); UC-8, UC-9 (where the post appears); UC-12 (friend tagging); UC-25 (moderation review if flagged). |
| Assumptions: | Media upload is resumable. Feed ranking is eventually consistent within seconds. |
| Open Issues: | Whether to support multi-beer posts in v1 (currently one beer detail card per post). |

---

# Use Case 5: Start a drinking session

| UC ID and Name: | UC-5: Start a drinking session |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Location Services, Friends (as tagged participants) |
| Trigger: | The User taps the Start Session action. |
| Description: | The User initiates an active drinking session, which begins recording time, enables in-session beer logging, and optionally tags friends and captures a starting location. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The User has no other active session open (see BR-12). |
| Postconditions: | POST-1. A session object exists in the System with `status = active`, `start_time` set, and an empty `logged_beers` list. POST-2. A visible "Session in Progress" bar is shown throughout the app. POST-3. Any tagged friends receive a pending tag notification (they may accept or dismiss; see UC-12 and BR-13). |
| Main Success Scenario: | 1. The System displays the Start Session screen with optional fields: location, venue name, participants (friend tags), privacy default for the session post. 2. The User optionally enables location sharing for the session (coarse by default) and names the venue. 3. The User optionally tags friends as participants. 4. The User taps Start. 5. The System creates the session with `start_time = now`, `status = active`, and stores the optional fields. 6. The System displays a persistent Session in Progress bar with the session timer and a quick-action to log a beer (UC-6). 7. The System sends pending tag notifications to the tagged friends. Use case ends. |
| Extensions: | **2a. Location permission not granted:** 2a1. The System allows the User to continue without location; a friendly explanation is shown. **4a. The User already has an active session (concurrent session prevention):** 4a1. The System prompts the User to either resume or end the existing session (see UC-7) before starting a new one. **3a. The User tags a non-friend / private account:** 3a1. The tag request still sends a notification, but visibility of the session depends on the target user's privacy settings. |
| | **5.0.E1. Backend unavailable:** The System creates the session locally; it syncs on reconnect. **7.0.E1. Notification delivery fails:** The System retries and, on repeated failure, shows the pending tag in-app. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Medium — target of 1–2 sessions per active user per week. |
| Business Rules: | BR-12, BR-13, BR-14 |
| Associated Information: | **Session fields:** `session_id`, `owner_id`, `start_time`, `end_time` (null while active), `status` (`active` / `ended` / `canceled`), `location` (optional, coarse), `venue_name` (optional, ≤ 80 chars), `participants` (list of user IDs; each has a pending/accepted/declined state), `privacy_default` (Enum). **Concurrency:** one active session per user at a time (BR-12). **Background behavior:** the session timer runs locally with an accurate `start_time`; backend sync is continuous when online and batched offline. |
| Related Use Cases: | UC-6 (log beers during session); UC-7 (end and publish); UC-12 (friend tagging). |
| Assumptions: | Background location is not required for v1 — the session tracks time and logged beers, not a GPS trace. |
| Open Issues: | Whether to add opt-in GPS trace visualization in a later phase. |

---

# Use Case 6: Log beers during an active session

| UC ID and Name: | UC-6: Log beers during an active session |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Beer Recognition Service, Beer Encyclopedia |
| Trigger: | The User, with an active session in progress, taps the "Log Beer" quick-action in the Session in Progress bar. |
| Description: | During an active session, the User logs individual beers — via camera recognition (UC-2) or manual search (UC-3) — and each log is appended to the session's `logged_beers` list. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The User has an active session (from UC-5). |
| Postconditions: | POST-1. The logged beer is appended to the session's `logged_beers` list with a timestamp. POST-2. The session beer count is incremented. POST-3. If the User's responsible-drinking setting is enabled, and the threshold is reached (see BR-14), a non-judgmental reminder is shown. |
| Main Success Scenario: | 1. The User taps "Log Beer" from the Session in Progress bar. 2. The System launches the Log Beer flow pre-contextualized with `destination = active_session`. 3. The flow proceeds through UC-2 (camera) or UC-3 (search). 4. On confirmation, the System attaches the beer detail card to the session (not to a draft post). 5. The System records a timestamp for the log entry. 6. The System updates the Session in Progress bar with the new beer count. 7. The System evaluates responsible-drinking rules (see BR-14) and, if triggered, presents a gentle in-app card with hydration / pace suggestions. Use case ends. |
| Extensions: | **3a. The User abandons the log flow:** 3a1. Nothing is added to the session; the session remains active. **7a. Responsible-drinking threshold reached:** 7a1. The System shows a card with options to "Keep going", "Take a break", or "End session now" (UC-7). No consumption is prevented; the reminder is informational. |
| | **4.0.E1. Session has ended concurrently (e.g., on another device or auto-ended after 8h — see BR-12):** The System informs the User, the beer is saved as a standalone log (no session), and the User may start a new session. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | High — 2–6 logs per session on average. |
| Business Rules: | BR-12, BR-14 |
| Associated Information: | **Session log entry:** `log_id`, `session_id`, `beer_id`, `serving_size`, `user_rating` (optional), `tasting_note` (optional), `photo_ref` (optional), `logged_at` (timestamp). **Responsible-drinking reminder:** triggered by per-session count thresholds and per-time-window pace, per BR-14; the reminder is always dismissible and never blocking. |
| Related Use Cases: | UC-2, UC-3 (logging paths); UC-5 (session must exist); UC-7 (ending session). |
| Assumptions: | Logs are retained locally with a monotonic client timestamp; server reconciles on sync. |
| Open Issues: | Exact default thresholds for BR-14 pending UX research. |

---

# Use Case 7: End and publish a session

| UC ID and Name: | UC-7: End and publish a session |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Feed Ranking Service, Participants (tagged friends) |
| Trigger: | The User taps End Session, or the session auto-ends after the maximum duration (see BR-12). |
| Description: | The User ends the active drinking session, reviews the generated Session Stats Card (duration, beer count, beer list, location if enabled, participants), chooses to publish publicly, keep private, or cancel the session post, and finalizes the session state. |
| Preconditions: | PRE-1. The User has an active session (from UC-5). |
| Postconditions: | POST-1. The session's `end_time` is set and `status = ended` (or `canceled` if the User chose to discard). POST-2. If published, a session post is created in the feed with `session_post_id`; POST-3. If kept private, the session is stored in the User's personal history only. POST-4. Tagged participants who accepted the tag may repost the session to their own profile (see UC-11). |
| Main Success Scenario: | 1. The User taps End Session from the Session in Progress bar. 2. The System computes the session totals (duration, beer count, unique beer styles, unique breweries, location summary if enabled). 3. The System displays the Session Stats Card preview. 4. The User chooses one of: Publish publicly, Post to followers only, Keep private, or Cancel (discard session and all logs). 5. The User optionally edits the caption, adjusts participants, and confirms the privacy level. 6. The User taps Confirm. 7. The System finalizes the session with `end_time = now` and `status = ended`. 8. If publishing, the System creates a session post via a path similar to UC-4 and distributes it to feeds. 9. The System notifies tagged participants that the session has been published. 10. The System evaluates badge and achievement rules (see UC-19). Use case ends. |
| Extensions: | **4a. The User selects Cancel (discard):** 4a1. The System asks for confirmation, clearly stating that all logs will be deleted. 4a2. On confirm, `status = canceled`, logs are removed, and no post is created. **4b. The User selects Keep private:** 4b1. The session is stored but no post is created; no notifications are sent to participants beyond the existing session tag. **2a. Session has fewer than 1 logged beer:** 2a1. The System prompts the User to either add a beer, end without publishing, or cancel. **Auto-end case (BR-12):** The System auto-ends the session after 8 hours of inactivity or 12 hours of total duration; the User is prompted on next app open to publish, keep private, or discard. |
| | **8.0.E1. Publish fails (network or backend):** The System saves the session post as a local draft and retries; it becomes visible once the publish succeeds. **9.0.E1. Participant notification fails:** The System retries and surfaces the tag in-app. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Medium — once per session. |
| Business Rules: | BR-12, BR-13, BR-14, BR-9, BR-10 |
| Associated Information: | **Session Stats Card fields:** total duration (formatted), total beers, unique styles, unique breweries, venue or location summary, participants (accepted), top-rated beer of the session. **Session post fields:** `session_post_id`, `owner_id`, `session_id`, `privacy`, caption (≤ 2,200 chars), created_at. **Participant tagging:** only participants with `accepted` state are listed in the published post. **Notifications:** participants (push + in-app); followers (feed delivery). |
| Related Use Cases: | UC-4 (underlying post creation); UC-11 (repost by participant); UC-12 (friend tagging); UC-19 (achievement evaluation). |
| Assumptions: | Session totals are computed on the backend to be canonical; the client shows preview values that may round differently. |
| Open Issues: | Whether participants should be able to decline inclusion after publish. |

---

# Use Case 8: Browse the For You feed

| UC ID and Name: | UC-8: Browse the For You feed |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Feed Ranking Service |
| Trigger: | The User opens the app (cold start) or taps the For You tab. |
| Description: | The User scrolls an algorithmically curated feed of posts from across the platform, ranked by a combination of freshness, affinity, engagement, diversity, and privacy eligibility. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. |
| Postconditions: | POST-1. View-level engagement signals (impressions, dwell time, interactions) are logged for ranking feedback. POST-2. The Feed Ranking Service state is updated with the User's in-session interactions. |
| Main Success Scenario: | 1. The System opens the main feed screen with the For You tab selected by default. 2. The System requests a ranked batch of posts from the Feed Ranking Service (first page). 3. The Feed Ranking Service returns a ranked list respecting privacy eligibility (see BR-11). 4. The System displays the batch with media preloaded. 5. The User scrolls; impressions and dwell time are logged client-side and sent in batched telemetry events. 6. As the User nears the end of a page, the System requests the next ranked batch. 7. The User may interact with posts (see UC-10, UC-11, UC-20) from within the feed. Use case ends when the User leaves the tab or backgrounds the app. |
| Extensions: | **3a. Ranking returns fewer than N posts (cold start / sparse graph):** 3a1. The System augments with trending beers (UC-16), popular posts in the User's region, and brewery follow recommendations. **7a. The User hides a post or reports it (UC-25 trigger):** 7a1. The post is removed from the current feed and down-weighted in ranking. **Pull-to-refresh:** the System requests a fresh top page and merges it with what is already visible, keeping the scroll position stable. |
| | **2.0.E1. Feed service unavailable:** The System shows a cached last-known feed and a persistent retry banner. **4.0.E1. Media fails to load:** Placeholders are shown; the media retries on visibility. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Very high — multiple sessions per active user per day. |
| Business Rules: | BR-11, BR-15 |
| Associated Information: | **Ranking signals:** follow graph, affinity (styles, breweries), freshness, engagement (likes, comments, reposts), diversity (avoid over-serving one author or brewery), regionality, user hides and reports. **Privacy eligibility (BR-11):** public posts are eligible; followers-only posts appear only to followers; private posts never appear. **Pagination:** cursor-based; default page size 20. **Telemetry:** `impression`, `dwell_ms`, `tap_through`, `like`, `comment`, `repost`, `hide`, `report`. **Refresh cadence:** pull-to-refresh and tab-tap-to-top. |
| Related Use Cases: | UC-10, UC-11, UC-12, UC-16, UC-20, UC-25. |
| Assumptions: | Ranking is eventually consistent. Telemetry is reliable-but-best-effort, with local buffering. |
| Open Issues: | Final ranking model beyond v1 baseline. |

---

# Use Case 9: Browse the Following feed

| UC ID and Name: | UC-9: Browse the Following feed |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Follow Graph Service |
| Trigger: | The User taps the Following tab. |
| Description: | The User scrolls a reverse-chronological feed of posts from users and breweries they follow, respecting per-post privacy. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. |
| Postconditions: | POST-1. View-level engagement signals are logged. POST-2. The last-seen cursor is updated so that subsequent opens resume from the correct position. |
| Main Success Scenario: | 1. The User taps the Following tab. 2. The System requests the most recent posts from the set of accounts the User follows. 3. The Follow Graph Service returns a time-ordered list filtered by privacy eligibility (see BR-11). 4. The System displays the list; media is preloaded. 5. The User scrolls; impressions and interactions are logged. 6. On reaching end-of-feed, the System shows a "You're all caught up" end state and offers a deep-link into For You (UC-8). 7. Pull-to-refresh fetches any posts created after the current top. Use case ends. |
| Extensions: | **3a. The User follows zero accounts:** 3a1. The System shows an empty-state encouraging the User to find friends and breweries, with deep-links to discovery (UC-14, UC-16). **3b. All posts in range are older than N days and User has checked in recently:** 3b1. The System shows a "nothing new" card with suggested accounts. |
| | **2.0.E1. Service unavailable:** The System shows a cached last-known feed and a retry banner. **4.0.E1. Post no longer accessible (deleted or privacy changed):** The System removes it from the current view gracefully. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Very high. |
| Business Rules: | BR-11 |
| Associated Information: | **Ordering:** strict reverse chronological. **Pagination:** cursor-based; default page size 20. **Privacy eligibility (BR-11):** follower checks applied per post. **Telemetry:** same as UC-8. |
| Related Use Cases: | UC-8, UC-10, UC-11, UC-12, UC-20. |
| Assumptions: | The follow graph is queryable with sub-100ms p95 latency at launch scale. |
| Open Issues: | None. |

---

# Use Case 10: Like and comment on a post

| UC ID and Name: | UC-10: Like and comment on a post |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Post Owner, Other Commenters |
| Trigger: | The User taps the like button on a post, or focuses the comment input on a post. |
| Description: | The User expresses engagement on a post by liking it (idempotent toggle) and/or posting a comment. Engagement is distributed to relevant actors and aggregated for ranking. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The post exists and the User has visibility per BR-11. |
| Postconditions: | POST-1. The like state is toggled (added or removed) and the like count is updated. POST-2. For a comment, a new comment entity exists on the post with `status = visible`. POST-3. The post owner and mentioned users receive notifications. POST-4. Engagement signals are logged for ranking. |
| Main Success Scenario: | 1. The User taps the like button on a post. 2. The System optimistically toggles the like state and updates the count. 3. The System sends the like event to the backend; on success, the state is confirmed; on failure, it is reverted with a non-blocking toast. 4. The User focuses the comment input and writes a comment (≤ 1,000 chars). 5. The System validates the comment against the comment validation rules. 6. The User taps Send. 7. The System creates the comment, updates the comment count, and sends a push notification to the post owner and to users mentioned with @handle. Use case ends. |
| Extensions: | **4a. The User replies to an existing comment:** 4a1. The comment is created as a reply with `parent_comment_id`; notifications are also sent to the parent-comment author. **5a. Comment flagged by automated filter:** 5a1. The comment is held pending review and the User is informed. **6a. Post has comments disabled by owner:** 6a1. The Send action is disabled and the User is informed. **Rate limit exceeded:** The System throttles the User and displays a message. |
| | **2.0.E1. Like toggle fails persistently:** The System reverts and shows a retry action. **7.0.E1. Notification delivery fails:** The System retries and falls back to in-app notification only. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Very high. |
| Business Rules: | BR-11, BR-15 |
| Associated Information: | **Like entity:** `post_id`, `user_id`, `created_at`. **Comment entity:** `comment_id`, `post_id`, `author_id`, `parent_comment_id` (nullable), `text` (1–1,000 chars), `status` (`visible` / `hidden` / `pending_review`), `created_at`. **Validation:** non-empty trimmed text; profanity / hate filter; link rate-limit. **Notifications:** post owner (push + in-app); mentioned users; parent-comment author on replies. |
| Related Use Cases: | UC-4, UC-7 (sources of posts); UC-25 (moderation path if reported). |
| Assumptions: | Likes are idempotent and eventually consistent. Comments are immediately visible to the author even if pending review. |
| Open Issues: | Whether threaded replies are one-level or deeper in v1 (one-level at launch). |

---

# Use Case 11: Repost / share a post

| UC ID and Name: | UC-11: Repost / share a post |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Original Post Owner |
| Trigger: | The User taps the share / repost action on a post. |
| Description: | The User shares a post either internally (reposting it to their own feed, with optional added caption) or externally (share-sheet out to another app, producing a deep-link back to the post). |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The original post is `public` (followers-only and private posts are non-repostable — see BR-11). |
| Postconditions: | POST-1. For an internal repost, a new repost entity is created with a reference to the original post, and it appears in the User's followers' Following feed. POST-2. The original post's repost count is incremented. POST-3. The original post owner receives a notification. |
| Main Success Scenario: | 1. The User taps the share action on a post. 2. The System shows share options: Repost to my feed, Repost with a note, Send as message (UC-13), Share externally. 3. The User chooses Repost to my feed (or Repost with a note). 4. If Repost with a note, the User enters an optional caption (≤ 500 chars). 5. The System validates the caption (if any) and creates a repost entity referencing the original. 6. The System increments the repost count and updates feeds. 7. The System notifies the original post owner. Use case ends. |
| Extensions: | **2a. The User chooses Share externally:** 2a1. The System opens the native share sheet with a deep-link URL to the post. No in-app repost entity is created. **3a. Post privacy is followers-only:** 3a1. The Repost options are disabled; the User may still Share externally (deep-link will respect privacy and show a "not available" state for non-followers). **3b. The User attempts to repost their own post:** 3b1. The System offers a "Boost to top of your feed" option instead of a standard repost. **4a. Added caption violates validation rules:** 4a1. Error surfaced inline; the User corrects. |
| | **5.0.E1. Repost creation fails:** The System retries; on repeated failure, shows an error with retry. |
| Priority: | Should-have (fast-follow) |
| Frequency of Use: | Medium. |
| Business Rules: | BR-11, BR-15 |
| Associated Information: | **Repost entity:** `repost_id`, `reposter_id`, `original_post_id`, `added_caption` (optional), `created_at`. **Validation:** caption 0–500 chars, hashtag rules same as posts. **Notifications:** original post owner. |
| Related Use Cases: | UC-4, UC-7, UC-13. |
| Assumptions: | External deep-links resolve to the canonical post URL and respect privacy at view time. |
| Open Issues: | None. |

---

# Use Case 12: Tag friends in a post or session

| UC ID and Name: | UC-12: Tag friends in a post or session |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Tagged User |
| Trigger: | The User accesses the tag-friends input while composing a post (UC-4), starting a session (UC-5), or ending a session (UC-7). |
| Description: | The User searches for and selects friends to tag on a post or session. Each tag triggers a notification to the tagged user, who may accept, dismiss, or remove the tag per their privacy preferences. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The User is in a compose or session flow. |
| Postconditions: | POST-1. The tags are attached to the post or session. POST-2. Tagged users receive a notification and a pending tag state. POST-3. On the tagged user's acceptance, their handle is displayed publicly on the post / session. |
| Main Success Scenario: | 1. The User taps the "Tag friends" input. 2. The System displays a search input prefilled with recent tags and top-of-mind friends. 3. The User types a query; the System returns matching handles from the User's follow graph and mutual follows first, then a broader graph. 4. The User selects one or more handles (up to 20 per post). 5. The System validates that each tagged user's privacy allows tagging (see BR-13). 6. The User confirms. 7. On publish (of post or session), the System sends pending tag notifications to each tagged user. 8. Each tagged user accepts or dismisses from their notification center. Use case ends. |
| Extensions: | **5a. Tagged user has disabled tagging or is blocking the tagger:** 5a1. The tag is silently removed from the candidate list with a gentle explanation. **3a. Search returns no matches:** 3a1. The User can invite friends via link (out of scope for v1) or move on. **7a. Tagged user already declined a prior tag in the same session (UC-5):** 7a1. The System prevents re-tagging in that session. |
| | **7.0.E1. Notification delivery fails:** The System retries and falls back to in-app only. |
| Priority: | Should-have (fast-follow) |
| Frequency of Use: | Medium-high. |
| Business Rules: | BR-13, BR-15 |
| Associated Information: | **Tag entity:** `tag_id`, `source` (`post` or `session`), `source_id`, `tagger_id`, `taggee_id`, `state` (`pending` / `accepted` / `declined`), `created_at`. **Privacy (BR-13):** tagged users can disable tagging globally or restrict to mutuals; pending tags do not display the taggee's handle publicly until accepted. **Search behavior:** debounced prefix search over the User's follow graph first, then public handles. |
| Related Use Cases: | UC-4, UC-5, UC-7. |
| Assumptions: | Handle uniqueness is enforced at registration (UC-1). |
| Open Issues: | None. |

---

# Use Case 13: Send a beer recommendation via direct message

| UC ID and Name: | UC-13: Send a beer recommendation via direct message |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Recipient |
| Trigger: | The User taps "Send as message" from a beer detail page, a post, or the share sheet, and chooses a recipient. |
| Description: | The User sends a direct message containing a beer detail card as a recommendation, optionally with a short message, to another user. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The recipient allows direct messages from this user per BR-16. |
| Postconditions: | POST-1. A direct message thread exists (or is created) between the User and recipient. POST-2. A message containing the beer detail card (and optional text) is appended to the thread. POST-3. The recipient receives a push notification per their notification settings. |
| Main Success Scenario: | 1. The User taps "Send as message" from a share surface. 2. The System shows a recipient picker (recent threads and followed users). 3. The User selects one recipient (or opens a new thread). 4. The System shows the compose view with the beer detail card already attached. 5. The User optionally types a short message (≤ 500 chars). 6. The User taps Send. 7. The System validates the message and writes it to the thread; the beer detail card is rendered inline in the chat bubble. 8. The System delivers the message in real time and sends a push notification. Use case ends. |
| Extensions: | **3a. The recipient has DMs restricted to mutual followers and the User is not a mutual follower:** 3a1. The message is sent as a "Message Request" that requires the recipient to accept before full thread access (see BR-16). **5a. The User attaches no text, only the beer card:** 5a1. The message is allowed as a "card-only" message. **6a. The User is rate-limited (spam prevention):** 6a1. The System throttles and informs the User. |
| | **7.0.E1. Message delivery fails:** The message is held as "sending" locally and retried; on final failure it is surfaced with a retry control. |
| Priority: | Should-have (fast-follow) |
| Frequency of Use: | Medium. |
| Business Rules: | BR-15, BR-16 |
| Associated Information: | **Thread entity:** `thread_id`, participants (2), `created_at`, `last_message_at`. **Message entity:** `message_id`, `thread_id`, `author_id`, `text` (optional, ≤ 500 chars), `attachments` (beer detail card reference, other references), `state` (`sending` / `sent` / `delivered` / `read`), `created_at`. **Privacy (BR-16):** DM defaults are `Everyone` or `Mutuals only` or `No one`. Message Requests queue is available for non-mutuals when `Everyone` allows with filtering. **Notifications:** standard DM notification; configurable per thread. |
| Related Use Cases: | UC-11 (external share path); UC-14 (where a beer card lives). |
| Assumptions: | DMs are at-rest encrypted per cloud-provider defaults at v1; E2EE is a later-phase evaluation. |
| Open Issues: | Group DMs are out of scope for v1. |

---

# Use Case 14: View a beer's detail page in the Beer Encyclopedia

| UC ID and Name: | UC-14: View a beer's detail page in the Beer Encyclopedia |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Beer Encyclopedia, Feed Service |
| Trigger: | The User taps a beer detail card, taps a beer from the encyclopedia browser, or opens a deep-link to a beer. |
| Description: | The User views the canonical page for a beer, including characteristics (name, style, ABV, IBU, brewery, tasting notes), community rating, related beers, and a feed of posts featuring this beer. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The beer exists in the Encyclopedia (verified or `Unverified` pending entry — see UC-3). |
| Postconditions: | POST-1. The beer page is displayed. POST-2. A view impression is logged for the beer (for trending — see UC-16). |
| Main Success Scenario: | 1. The User taps a beer reference. 2. The System fetches the beer page data from the Encyclopedia. 3. The System fetches a feed of recent public posts featuring this beer (filtered by BR-11). 4. The System displays the page: hero image, name, brewery (linked), style, ABV, IBU, tasting notes, community rating, "related styles", "related beers from this brewery", and the posts feed. 5. The User may tap the brewery to navigate to the brewery page, tap a related beer, tap Log This Beer (to start UC-2/UC-3 with this beer prefilled), or open a post. Use case ends. |
| Extensions: | **2a. Beer is `Unverified` (pending moderation):** 2a1. The page shows an `Unverified` badge and limited metadata; the posts feed is available but clearly labeled. **3a. No posts exist yet:** 3a1. The posts section shows a "Be the first to log this beer" call to action. **4a. The User chooses Log This Beer:** 4a1. The flow jumps to UC-2 or UC-3 with `beer_id` pre-attached, skipping search. |
| | **2.0.E1. Encyclopedia service unavailable:** The System shows cached data (if any) and a retry banner. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | High. |
| Business Rules: | BR-7, BR-8, BR-11 |
| Associated Information: | **Beer page data:** `beer_id`, `name`, `brewery_id`, `style`, `abv`, `ibu`, `tasting_notes`, `community_rating` (aggregate of user ratings, Bayesian-smoothed), `rating_count`, `hero_image`, `is_verified`. **Posts feed:** cursor-paginated; respects BR-11. **View telemetry:** `beer_view`, `related_tap`, `log_this_beer_tap`. |
| Related Use Cases: | UC-2, UC-3, UC-10, UC-16. |
| Assumptions: | Community rating is computed asynchronously; small latency between log time and rating update is acceptable. |
| Open Issues: | Final related-beer recommendation algorithm. |

---

# Use Case 15: Explore the Map View

| UC ID and Name: | UC-15: Explore the Map View |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Location Services, Map Provider, Feed Service |
| Trigger: | The User taps the Map tab. |
| Description: | The User views a real-time, global map showing where people are drinking right now (coarse-by-default pins derived from public posts and active sessions that have opted in to location sharing). The User can filter by beer style, brewery, or followed users, and tap pins to view clusters of posts. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. |
| Postconditions: | POST-1. The map is rendered with the relevant pins for the User's current view. POST-2. Filter state is remembered per session. |
| Main Success Scenario: | 1. The User taps the Map tab. 2. The System requests location permission (if not granted) to center the map; it is not required — the map can center on a default region. 3. The System loads the Map Provider base map. 4. The System fetches pin data for the current viewport, filtered by privacy (see BR-5 and BR-11) — only pins from public posts / sessions where the author opted in to location sharing. 5. The System renders pins, clustered at zoom-out levels. 6. The User pans and zooms; the System refetches pins for the new viewport (debounced). 7. The User applies filters (style, brewery, followed users only). 8. The User taps a pin or a cluster to open a bottom sheet with the posts at that location. Use case ends. |
| Extensions: | **2a. Location permission denied:** 2a1. The map centers on a default region based on device locale; no change in functionality. **4a. Viewport has no pins:** 4a1. The map shows an empty state with a suggestion to zoom out. **7a. User selects "Followed users only":** 7a1. Pins are filtered to the User's follow graph. |
| | **3.0.E1. Map Provider unavailable:** The System shows an error with retry. **4.0.E1. Pin fetch fails:** The System retries; map remains usable with no pins. |
| Priority: | Should-have (fast-follow) |
| Frequency of Use: | Medium. |
| Business Rules: | BR-5, BR-11 |
| Associated Information: | **Pin entity:** derived from posts/sessions with opt-in location; coarse-geohashed to protect exact location (BR-5); clustered server-side at low zoom. **Filters:** style (Enum), brewery (ID), followed_only (Boolean). **Viewport query:** `bbox` (min_lat, min_lon, max_lat, max_lon), `zoom`, filters. |
| Related Use Cases: | UC-4, UC-7 (location opt-in sources). |
| Assumptions: | Map Provider SDK is available for both iOS and Android. Coarse location is sufficient for the social value of the Map View. |
| Open Issues: | Final coarseness / geohash precision — likely ~500m precision by default. |

---

# Use Case 16: View trending beers

| UC ID and Name: | UC-16: View trending beers |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Beer Encyclopedia, Trending Service |
| Trigger: | The User taps the Trending tab or section. |
| Description: | The User views ranked lists of trending beers — globally and regionally — based on log/post activity over weekly and monthly windows. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. |
| Postconditions: | POST-1. Trending lists are displayed. POST-2. Tap-through to individual beer pages is logged. |
| Main Success Scenario: | 1. The User taps Trending. 2. The System displays the default Trending list (Weekly / Region = User's region). 3. The User may toggle between Weekly / Monthly and Global / Region. 4. For each entry, the System displays beer name, brewery, aggregate rating, and the delta in activity vs prior period. 5. The User taps an entry to open the beer page (UC-14). Use case ends. |
| Extensions: | **3a. Region has fewer than N data points (sparse):** 3a1. The System falls back to Global with a small banner explaining the fallback. **2a. User is in a region where alcohol promotion is restricted:** 2a1. Trending is disabled for that region and the User is shown a neutral "Not available in your region" state (per BR-2 and regional policy). |
| | **2.0.E1. Trending service unavailable:** The System shows cached last-known data and a retry banner. |
| Priority: | Should-have (fast-follow) |
| Frequency of Use: | Medium. |
| Business Rules: | BR-2, BR-8, BR-17 |
| Associated Information: | **Trending list entry:** `beer_id`, `name`, `brewery`, `rating`, `period_count`, `delta_pct`. **Windowing:** rolling 7-day and 30-day. **Ranking:** log count within window, smoothed by Bayesian prior; filtered for age-appropriateness (BR-2) and abuse (BR-17). |
| Related Use Cases: | UC-14. |
| Assumptions: | Trending computations run on a schedule (e.g., every 15 minutes) and are cached. |
| Open Issues: | Final abuse-resistance heuristics for trending gaming (e.g., brigading). |

---

# Use Case 17: View personal stats dashboard

| UC ID and Name: | UC-17: View personal stats dashboard |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Stats Service |
| Trigger: | The User taps the Stats tab from their profile or bottom nav. |
| Description: | The User views their personal beer stats — all-time and time-filtered: total beers logged, favorite styles, breweries tried, countries of origin explored, session history, achievements, and badges. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. |
| Postconditions: | POST-1. The stats dashboard is displayed. POST-2. Filter state is remembered across opens. |
| Main Success Scenario: | 1. The User taps the Stats tab. 2. The System fetches aggregated stats scoped to the User. 3. The System displays: total beers, unique styles, unique breweries, unique countries, sessions completed, longest streak, badges unlocked / total, and a session history list. 4. The User may apply a time filter (last 7 days, last 30 days, this year, all time). 5. The User may tap any card to drill down (e.g., "Styles explored" → list of styles with counts; "Breweries tried" → list of breweries). 6. The User may tap Achievements to view UC-19 state. Use case ends. |
| Extensions: | **2a. User is new and has no data:** 2a1. The System shows a friendly empty state with a call to action to log a first beer (UC-2/UC-3). |
| | **2.0.E1. Stats service unavailable:** The System shows cached last-known stats and a retry. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Medium-high. |
| Business Rules: | BR-14, BR-18 |
| Associated Information: | **Aggregates:** total beers, unique styles, unique breweries, unique countries, sessions completed, average session duration, longest streak, badges unlocked/total, top 5 styles, top 5 breweries. **Filters:** time window as above. **Responsible-drinking context (BR-14):** the dashboard is framed as a "journey" rather than a scoreboard; it never uses language that encourages higher consumption. |
| Related Use Cases: | UC-18, UC-19. |
| Assumptions: | Stats are computed incrementally and served from a read-optimized store. |
| Open Issues: | None. |

---

# Use Case 18: View weekly / monthly recap

| UC ID and Name: | UC-18: View weekly / monthly recap |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Stats Service, Feed Service |
| Trigger: | The User receives a weekly or monthly recap notification and taps it, or navigates to Stats → Recaps. |
| Description: | The User views a visually rich, shareable recap of their beer activity for the preceding week or month, with top styles, top breweries, most active drinking days, new countries explored, and session highlights. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. A recap has been generated for the period. |
| Postconditions: | POST-1. The recap is displayed. POST-2. If shared, either a feed post is created from the recap or the native share sheet is invoked for external sharing. |
| Main Success Scenario: | 1. The User opens the recap (push or in-app). 2. The System renders the recap as a series of story-style cards (style summary, top breweries, most active day, new countries, session highlight, achievements earned in the period). 3. The User taps through cards. 4. The User may tap Share to feed, which opens a UC-4 compose prefilled with the recap card, or Share externally, which opens the native share sheet with an image export. Use case ends. |
| Extensions: | **1a. Recap not available (no activity in period):** 1a1. The System shows a gentle "Not enough activity this period" state rather than an empty recap. **4a. The User edits the recap caption before sharing to feed:** 4a1. The flow joins UC-4. |
| | **2.0.E1. Recap generation failed:** The System shows a retry affordance and informs engineering via telemetry. |
| Priority: | Should-have (fast-follow) |
| Frequency of Use: | Weekly / monthly per user. |
| Business Rules: | BR-14, BR-18 |
| Associated Information: | **Recap entity:** `recap_id`, `user_id`, `period` (week or month), `start`, `end`, `cards` (ordered list of card objects). **Card types:** `style_summary`, `top_breweries`, `most_active_day`, `new_countries`, `session_highlight`, `achievements_earned`. **Responsible-drinking framing (BR-14):** the recap emphasizes variety, discovery, and social moments, not raw consumption volume. |
| Related Use Cases: | UC-4, UC-17, UC-19. |
| Assumptions: | Recaps are generated on a scheduled job at the end of each period. |
| Open Issues: | Whether to offer a year-end "Beer Wrapped" as a separate card class. |

---

# Use Case 19: Earn a badge or achievement

| UC ID and Name: | UC-19: Earn a badge or achievement |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | System (triggered by User activity) | Secondary Actors: | User |
| Trigger: | The User performs an action (logging a beer, ending a session, logging from a new country, completing a streak) that the Achievement Service evaluates against unlock criteria. |
| Description: | The System evaluates achievement rules against the User's activity and, on meeting criteria, unlocks a badge or achievement and notifies the User. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. A relevant activity event was recorded (e.g., a confirmed beer log, a completed session). |
| Postconditions: | POST-1. The unlocked badge is attached to the User's profile. POST-2. A non-blocking celebration notification is shown. POST-3. The User may share the badge to their feed as a post. |
| Main Success Scenario: | 1. The System receives an activity event (e.g., `beer_logged`, `session_ended`, `country_first_logged`). 2. The Achievement Service evaluates the event against the rules catalogue (see Associated Information and BR-18). 3. If one or more achievements are unlocked, the System records them against the User and emits an `achievement_unlocked` event. 4. The System shows a celebration card on next app foreground or immediately if the User is in the app. 5. The User may tap Share to create a feed post (UC-4) or Close. Use case ends. |
| Extensions: | **2a. Event qualifies for multiple achievements simultaneously:** 2a1. All unlocked achievements are recorded and a stacked celebration card is shown. **2b. Rule requires a decayed/streak property (e.g., 4 consecutive Fridays):** 2b1. The Achievement Service reads historical state and evaluates the streak; partial state persists. **5a. The User does not share:** 5a1. The badge is still unlocked on the profile. |
| | **3.0.E1. Achievement write fails:** The System retries with idempotency; duplicate unlocks are prevented by a deterministic key. |
| Priority: | Should-have (fast-follow) |
| Frequency of Use: | Variable; heavy in the first months of a user's journey. |
| Business Rules: | BR-14, BR-18 |
| Associated Information: | **Achievement catalogue (non-exhaustive v1 set):** "First Pour" (1 beer logged), "Style Explorer" (10 unique styles), "World Traveler" (beers from 5+ countries), "Brewery Loyalist" (10 beers from the same brewery), "Session Starter" (first completed session), "Variety Pack" (5 styles in a single session), "Friday Fanatic" (log a beer 4 Fridays in a row), "Century Club" (100 beers logged). **Rule structure:** `achievement_id`, `name`, `description`, `criteria` (logical rule over events), `icon`, `tier` (bronze / silver / gold). **Fairness (BR-18):** no achievement rewards raw consumption-volume escalation beyond the "Century Club" milestone; all other achievements reward variety, discovery, or social participation. |
| Related Use Cases: | UC-2, UC-3, UC-6, UC-7, UC-17, UC-18. |
| Assumptions: | The Achievement Service is idempotent and can replay events safely. |
| Open Issues: | Final catalogue and tiers pending product review. |

---

# Use Case 20: Follow / unfollow a user

| UC ID and Name: | UC-20: Follow / unfollow a user |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Target User, Follow Graph Service |
| Trigger: | The User taps the Follow or Unfollow button on another user's profile, in a post, or in a suggested-accounts list. |
| Description: | The User establishes or removes a follow relationship with another user (or brewery). For private profiles, follow is request-based; for public profiles, it is immediate. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. PRE-2. The target exists and is not blocked or blocking the User. |
| Postconditions: | POST-1. For a public target: the follow edge exists in the follow graph and the target's posts appear in the User's Following feed. POST-2. For a private target: a pending follow request exists until accepted or declined. POST-3. For unfollow: the follow edge is removed. |
| Main Success Scenario: | 1. The User taps Follow on a target profile. 2. If the target is public, the System creates the follow edge immediately, updates the follower count, and notifies the target. 3. If the target is private, the System creates a pending follow request and notifies the target. Use case ends. **Unfollow path:** 1'. The User taps Unfollow. 2'. The System confirms (for breweries or high-follower accounts, no confirmation is shown; for all other accounts, a subtle confirm). 3'. The System removes the follow edge and updates counts. Use case ends. |
| Extensions: | **1a. Target is blocked or blocking:** 1a1. The follow action is disabled with an explanation. **2a. Target is a brewery / verified account:** 2a1. Follow is always immediate (public). **3a. User attempts to re-follow a private account after being declined:** 3a1. The System respects a cooling-off period per BR-19. |
| | **2.0.E1. Follow write fails:** The System retries; the UI reverts on final failure. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | High, especially in the first weeks of a user's journey. |
| Business Rules: | BR-11, BR-15, BR-19 |
| Associated Information: | **Follow edge:** `follower_id`, `followee_id`, `state` (`active` / `pending`), `created_at`. **Counts:** follower and following counts on both profiles, eventually consistent. **Notifications:** immediate follow → "X started following you"; pending request → request notification with Accept / Decline. |
| Related Use Cases: | UC-9, UC-21. |
| Assumptions: | The follow graph service supports sub-100ms edge reads at launch scale. |
| Open Issues: | None. |

---

# Use Case 21: Edit profile information

| UC ID and Name: | UC-21: Edit profile information |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | User | Secondary Actors: | Media Storage (for avatar) |
| Trigger: | The User navigates to Profile → Edit. |
| Description: | The User edits their profile fields (display name, handle, bio, avatar, favorite styles, privacy defaults, notification preferences). Changes are validated and saved. |
| Preconditions: | PRE-1. The User is signed in and `age_verified = true`. |
| Postconditions: | POST-1. Updated profile fields are persisted and visible to others per privacy settings. POST-2. If the handle changed, deep-links to the old handle redirect for a grace period. |
| Main Success Scenario: | 1. The System displays the Edit Profile screen with current values. 2. The User modifies one or more fields. 3. The User taps Save. 4. The System validates each field against the "Profile validation rules" in Associated Information. 5. On success, the System persists changes, updates the avatar in media storage if changed, and returns to the Profile screen. Use case ends. |
| Extensions: | **2a. The User changes their handle:** 2a1. The System validates uniqueness and reserved-handle rules; if taken, the User is prompted to choose another. 2a2. On success, the old handle is reserved for redirect for 30 days. **2b. The User changes their account privacy from public to private:** 2b1. The System informs the User that existing posts' visibility will adjust for new viewers; followers remain. **4a. Validation rule violation (e.g., display name empty, bio too long, invalid URL):** 4a1. Inline error; the User corrects. |
| | **5.0.E1. Avatar upload fails:** The System retains the old avatar and shows a retry affordance. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Low — a few times per user. |
| Business Rules: | BR-15, BR-19 |
| Associated Information: | **Profile validation rules:** display name (required, 2–30 chars); handle (required, unique, 3–20 chars, lowercase alphanumeric + underscore, not in reserved list); bio (optional, ≤ 160 chars); avatar (optional, JPEG/PNG/HEIC, ≤ 5 MB, auto-resized); favorite styles (optional, ≤ 10 from the style enum); website (optional, valid URL); privacy default (Enum: public / followers-only); DM policy (Enum: everyone / mutuals / no one); notification preferences (per-channel toggles). **Notifications:** none to others unless the handle changed and the User opted to notify followers. |
| Related Use Cases: | UC-1 (initial profile setup), UC-20 (privacy affects follow behavior). |
| Assumptions: | Handle changes are rate-limited (BR-19) to prevent squatting. |
| Open Issues: | None. |

---

# Use Case 22: Create and publish brewery content

| UC ID and Name: | UC-22: Create and publish brewery content |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | Brewery / Brand Account (verified) | Secondary Actors: | Followers, Feed Ranking Service |
| Trigger: | An authorized brewery-account operator taps Create Post from the brewery account. |
| Description: | A verified brewery/brand account publishes content — typically a new-release announcement, brewery update, event, or beer spotlight — to the feed. Brewery posts are clearly identifiable as verified-brand content. |
| Preconditions: | PRE-1. The account is a verified brewery account with MFA enabled. PRE-2. The operator is signed in with appropriate role. |
| Postconditions: | POST-1. A brewery post exists with `source_type = brewery` and is visible to followers and eligible for For You ranking. POST-2. The post is labeled as verified brand content in the UI. POST-3. Engagement and analytics signals are recorded for UC-24. |
| Main Success Scenario: | 1. The System displays the brewery Compose screen (similar to UC-4 with additional brewery-specific fields). 2. The operator selects a post type (announcement, event, new-release spotlight). 3. The operator adds media, a caption, and optionally attaches one or more beer detail cards for the brewery's own beers. 4. The operator optionally sets a location and tags collaborating breweries. 5. The operator taps Publish. 6. The System validates the payload against the brewery-post validation rules. 7. The System creates the post with `verified = true`, `source_type = brewery`, and any brewery-specific metadata. 8. The System distributes the post to followers' Following feed and marks it eligible for For You ranking with brewery-appropriate weighting (see BR-20). Use case ends. |
| Extensions: | **3a. Attached beer is not owned by this brewery:** 3a1. The System warns and prevents attaching beers that are not associated with the brewery's verified scope. **4a. Tagged collaborating brewery has not accepted collab linkage:** 4a1. Tag is held as pending until accepted. **6a. Validation violation (banned content, promotional content targeting minors, etc.):** 6a1. Inline error; post is blocked (see BR-20). |
| | **7.0.E1. Backend unavailable:** Post is saved as a local draft and retried. |
| Priority: | Must-have (v1 launch, brewery-tier) |
| Frequency of Use: | Weekly per active brewery account. |
| Business Rules: | BR-15, BR-20 |
| Associated Information: | **Brewery-post fields:** same as user post (UC-4) plus `post_type` (Enum: `announcement` / `event` / `spotlight`), `beer_refs` (list of `beer_id` values restricted to this brewery), `event_details` (optional: start, end, venue, location). **Ranking weighting (BR-20):** brewery posts are eligible for For You but are down-weighted relative to user posts to preserve a user-first feed, and capped at a fraction of a user's ranked surface. **Notifications:** followers (per their preferences). |
| Related Use Cases: | UC-4 (shared compose primitives), UC-14 (beer page integration), UC-24 (analytics). |
| Assumptions: | A brewery's verified scope (beers and branding) is established during onboarding and stored as first-class metadata. |
| Open Issues: | Post-scheduling is out of scope for v1. |

---

# Use Case 23: Respond to a post or comment about their beer

| UC ID and Name: | UC-23: Respond to a post or comment about their beer |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | Brewery / Brand Account (verified) | Secondary Actors: | User (author of the post or comment) |
| Trigger: | A brewery-account operator sees a post or comment about one of their beers — via notification or by browsing the beer's page — and chooses to reply. |
| Description: | A verified brewery account replies publicly to a user post or comment that mentions or features one of their beers. The brewery's reply is badged as verified, and standard comment rules apply. |
| Preconditions: | PRE-1. The account is a verified brewery account with the beer in its verified scope. PRE-2. The post or comment is public or followers-only with the brewery as an eligible viewer. |
| Postconditions: | POST-1. A comment authored by the brewery exists on the target post, with `verified_brewery_badge = true`. POST-2. The original post author (and the target comment's author, if replying to a comment) receives a notification. |
| Main Success Scenario: | 1. The operator opens the target post (from a notification or the beer page — see UC-14). 2. The operator focuses the reply input. 3. The operator writes a reply (≤ 1,000 chars). 4. The System validates the reply against the "Brewery comment validation rules" (see BR-20). 5. The operator taps Send. 6. The System creates the comment with the verified-brewery badge. 7. The System notifies the post author and (if applicable) the parent comment author. Use case ends. |
| Extensions: | **1a. The post's beer is not in the brewery's verified scope:** 1a1. The operator may still comment as any user would (no verified-brewery badge, see BR-20). **4a. Content violates validation (e.g., promotional language targeting minors):** 4a1. Inline error; the comment is blocked. **2a. Comments are disabled on the post:** 2a1. The Send action is disabled; the brewery may still react via a like (UC-10). |
| | **6.0.E1. Comment write fails:** The System retries; the UI reverts on final failure. |
| Priority: | Must-have (v1 launch, brewery-tier) |
| Frequency of Use: | Medium per active brewery. |
| Business Rules: | BR-15, BR-20 |
| Associated Information: | **Brewery comment validation (BR-20):** same as UC-10 for standard rules, plus no targeting of minors, no pricing/purchase links that violate regional alcohol-promotion rules, no impersonation of another brewery. **Display:** reply renders with a verified-brewery badge next to the brewery handle. **Notifications:** post author, parent-comment author. |
| Related Use Cases: | UC-10, UC-14, UC-24, UC-25. |
| Assumptions: | Brewery-scope data is maintained accurately during brewery onboarding. |
| Open Issues: | None. |

---

# Use Case 24: View brewery analytics dashboard

| UC ID and Name: | UC-24: View brewery analytics dashboard |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | Brewery / Brand Account (verified) | Secondary Actors: | Analytics Service |
| Trigger: | A brewery-account operator taps the Analytics tab. |
| Description: | The operator views analytics on how the brewery's beers are being received on the platform — post counts, average rating, top regions, engagement, and trends over time. |
| Preconditions: | PRE-1. The account is a verified brewery account. PRE-2. The brewery has at least one beer in its verified scope. |
| Postconditions: | POST-1. The analytics dashboard is displayed. POST-2. Selected time range and filters are remembered across sessions. |
| Main Success Scenario: | 1. The operator taps Analytics. 2. The System displays the dashboard header with summary KPIs: total posts mentioning brewery beers (in period), unique posters, average community rating, total likes, total comments, follower count delta. 3. The operator selects a time range (7d, 30d, 90d, 1y). 4. The System displays per-beer breakdown, top regions (by posts), engagement trend chart, and recent standout posts. 5. The operator may drill into a single beer to see its page in the Encyclopedia (UC-14) or into a region to see post lists. Use case ends. |
| Extensions: | **2a. Brewery has fewer than the minimum required posts for meaningful aggregates:** 2a1. The System shows a "not enough data yet" state with guidance. **3a. Operator selects a range with no activity:** 3a1. Empty-state graphs are shown with a tip to expand the range. |
| | **2.0.E1. Analytics service unavailable:** The System shows cached last-known KPIs with a staleness indicator. |
| Priority: | Should-have (fast-follow, brewery-tier) |
| Frequency of Use: | Weekly per active brewery. |
| Business Rules: | BR-5, BR-20 |
| Associated Information: | **KPI set:** posts count, unique posters, average rating (Bayesian-smoothed), likes total, comments total, follower delta, engagement rate. **Per-beer metrics:** same KPIs scoped to a single beer. **Regional metrics:** top regions by post count, filtered by coarse region only (BR-5). **Privacy:** all analytics are aggregates; no personally identifying information about individual posters is shown to the brewery. |
| Related Use Cases: | UC-22 (produces some of the data), UC-14. |
| Assumptions: | Analytics aggregations are computed hourly and served from a warehouse-backed read store. |
| Open Issues: | Whether CSV export is included in v1. |

---

# Use Case 25: Moderate flagged content

| UC ID and Name: | UC-25: Moderate flagged content |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | Platform Admin | Secondary Actors: | Reporting User, Content Owner |
| Trigger: | A Platform Admin opens the moderation queue, or content is auto-flagged by filters and requires review. |
| Description: | A Platform Admin reviews flagged posts, comments, and direct-message reports in a prioritized queue and takes action (dismiss, warn, remove content, suspend account, ban account), all with full audit trail. |
| Preconditions: | PRE-1. The admin is signed in with `role = admin` and MFA verified. PRE-2. The moderation queue has one or more items. |
| Postconditions: | POST-1. Each action taken is recorded in the audit log (actor, subject, action, reason, timestamp). POST-2. Content state is updated (`visible` / `hidden` / `removed`). POST-3. Account state is updated where applicable (`active` / `warned` / `suspended` / `banned`). POST-4. The reporter and content owner receive appropriate notifications per BR-21. |
| Main Success Scenario: | 1. The admin opens the moderation queue. 2. The System displays items sorted by severity and report count (see BR-21). 3. The admin selects an item and reviews the content, reporter notes, reporter metadata (count of prior reports this item received), and the content owner's history. 4. The admin chooses an action: Dismiss, Warn owner, Remove content, Suspend account (N days), Ban account. 5. The admin enters a reason (required for all actions except Dismiss) from a constrained reason list. 6. The System applies the action, writes the audit log, and updates content and account state. 7. The System sends notifications to reporter and content owner per BR-21. 8. The System removes the item from the queue (or keeps it as "under appeal" if the owner appeals). Use case ends. |
| Extensions: | **3a. Item is a new-beer submission from UC-3 (moderation of Encyclopedia contribution), not a user-flagged report:** 3a1. The admin reviews fields; approves, rejects, or edits; approved entries become canonical and merge `Unverified` logs; rejected entries are removed. **4a. Admin chooses Escalate (content requires legal or senior admin review):** 4a1. Item is tagged and routed to the escalation queue; no action applied yet. **6a. Account already banned or suspended:** 6a1. The System applies only additive actions (e.g., extend suspension); idempotency is enforced. **8a. Owner appeals:** 8a1. Appeal enters the appeals queue for a second admin to review per BR-21. |
| | **6.0.E1. State write fails:** The System retries; the admin sees a clear retry affordance and no action is partially applied (atomic). |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Continuous. Staffing model depends on volume. |
| Business Rules: | BR-2, BR-21 |
| Associated Information: | **Queue item:** `item_id`, `subject_type` (`post` / `comment` / `dm` / `beer_submission` / `account`), `subject_id`, `flag_count`, `severity`, `first_reported_at`, `reasons` (enum list), `reporter_ids` (hashed). **Reason list:** hate speech, harassment, sexual content, violence, self-harm, alcohol policy violation, targeting of minors, spam, impersonation, IP violation, other. **Action outcomes:** Dismiss, Warn, Remove content, Suspend (7 / 14 / 30 / 90 days), Ban. **Audit log:** `audit_id`, `actor_id`, `subject_id`, `action`, `reason`, `timestamp`, immutable. **Notifications (BR-21):** reporter receives outcome confirmation; content owner receives outcome with appeal instructions. |
| Related Use Cases: | UC-3 (new-beer submissions), UC-4, UC-7, UC-10, UC-13, UC-22, UC-23, UC-26 (account state updates). |
| Assumptions: | The admin console is a web application with SSO and hardened access. Automated filters operate in parallel and enqueue items with a machine-assigned severity. |
| Open Issues: | Final reason list and severity matrix pending Trust & Safety review. |

---

# Use Case 26: Manage user accounts

| UC ID and Name: | UC-26: Manage user accounts |
| --- | --- |
| Created By: | Danny Mairena | Date Created: | 17/Apr/26 |
| Primary Actor: | Platform Admin | Secondary Actors: | User |
| Trigger: | An admin opens the Accounts management screen, either to search for a specific account or to action a referred case. |
| Description: | A Platform Admin searches for an account, reviews its profile, activity history, and moderation record, and takes account-level actions (suspend, ban, restore, merge duplicates, force handle change, re-trigger age verification, reset password) with full audit trail. |
| Preconditions: | PRE-1. The admin is signed in with `role = admin` and MFA verified. |
| Postconditions: | POST-1. Any action taken is recorded in the audit log. POST-2. Account state and metadata are updated per the action taken. POST-3. The user is notified where policy requires notification (e.g., on ban, force handle change). |
| Main Success Scenario: | 1. The admin opens the Accounts management screen. 2. The admin searches by handle, email, or user ID. 3. The System returns matching accounts with last activity and status. 4. The admin opens an account to view profile, activity history, prior moderation actions, age-verification audit, device history, and active sessions (login sessions, not drinking sessions). 5. The admin chooses an action from the permitted set (see Associated Information). 6. The admin enters a reason (required). 7. The System applies the action, writes the audit log, and updates state. 8. The System notifies the user if the action policy requires it. Use case ends. |
| Extensions: | **5a. Admin chooses Re-trigger age verification:** 5a1. Account moves to `pending_age_verification` state; on next sign-in, the user is routed through UC-1 from step 4. **5b. Admin chooses Merge duplicates (e.g., same person has two accounts, one accidental):** 5b1. The System requires both account IDs and a reason; merges posts, sessions, follows (dedup), and points all deep-links to the canonical account. **5c. Admin chooses Restore (un-ban or un-suspend):** 5c1. The System restores the account to `active` and re-admits content that was hidden as a consequence of the ban, where policy allows. **5d. Admin chooses Force handle change (impersonation / trademark):** 5d1. The User's handle is released; on next sign-in, the User must select a new handle before accessing content. |
| | **7.0.E1. State write fails:** The System retries and reports atomically; no partial updates. |
| Priority: | Must-have (v1 launch) |
| Frequency of Use: | Medium; heavier around launch and during incidents. |
| Business Rules: | BR-2, BR-21, BR-22 |
| Associated Information: | **Actions (permitted set):** Suspend (7 / 14 / 30 / 90 days), Ban, Restore, Re-trigger age verification, Reset password, Force handle change, Merge duplicates, Revoke active login sessions, Export user data (GDPR/CCPA request), Delete account (GDPR/CCPA request). **Audit log:** same shape as UC-25. **Notifications:** ban / suspension / force handle change / account deletion acknowledgment → user notified. **Data subject rights (BR-22):** export and delete actions fulfill within the legally required timeframe. |
| Related Use Cases: | UC-1, UC-21, UC-25. |
| Assumptions: | Export and delete flows have been legally reviewed and use the canonical data registry. |
| Open Issues: | Delegated admin roles (e.g., "moderator-only", "legal-only") are out of scope for v1 and tracked for a later phase. |

---

# Business Rules

The following business rules govern the Share a Beer platform. They are referenced by ID throughout the use cases above and are the authoritative source for behavior when a use case references a rule by ID.

**BR-1 (Age verification — mandatory, region-aware).** Every new account must complete age verification during onboarding (UC-1) before any content or social feature becomes accessible. The legal drinking age is determined from the user's region (e.g., 18 in most of the EU, UK, and Australia; 19 in parts of Canada; 21 in the United States). The verification method is chosen per region in accordance with local law and the chosen Age Verification Provider's supported methods. An audit record (user_id, region, method, provider_reference, decision, timestamp) is stored for every verification attempt.

**BR-2 (Underage handling and alcohol content policy).** Accounts that fail age verification are blocked from content access and cannot be un-blocked via the standard flow; an appeal path exists via UC-26. Any detection of minors on the platform post-verification (reported content, self-identification) results in immediate account suspension pending review. The platform does not sell alcohol, does not facilitate alcohol sales, and does not distribute content whose primary purpose is to target minors. In jurisdictions that restrict alcohol promotion or discovery surfaces (e.g., Trending, Map View) to adults only, regional gating is applied; in jurisdictions that disallow consumer alcohol-logging products entirely, the product is not offered.

**BR-3 (Camera recognition fallback behavior).** When camera recognition (UC-2) returns candidates, the top candidate is auto-selected only if its confidence score exceeds the acceptance threshold of 0.80. Between 0.50 and 0.80, candidates are shown as a ranked picker ("Is this right?"). Below 0.50 — or on empty / error results — the User is routed to manual search (UC-3) with the captured photo and any label OCR carried over. Recognition thresholds are tunable per region based on accuracy telemetry.

**BR-4 (Community guidelines acknowledgment).** All new users must acknowledge the community guidelines and responsible-drinking notice at onboarding (UC-1, step 10). Material updates to the community guidelines require re-acknowledgment on next sign-in.

**BR-5 (Location data — privacy and granularity).** Location on posts and sessions is opt-in. When enabled, location is stored at fine precision for the user's own use but is exposed to other users and on the Map View (UC-15) at coarse precision only (geohash at ~500m) to protect exact user location. Brewery analytics (UC-24) receive regional aggregates only and never individual user locations. Users may revoke location on any post or session after the fact, which retracts it from the Map View and from brewery analytics within the next aggregation window.

**BR-6 (Data retention).** Beer logs, posts, comments, sessions, and follow edges are retained for the life of the account. On account deletion (BR-22), user-generated content is removed within the legally required timeframe for the user's region. Age-verification audit records are retained per the provider's policy and applicable law, independently of account deletion, as a compliance obligation.

**BR-7 (Pricing, ABV, and beer characteristics).** The platform does not display beer prices, purchase links, or retailer locations. ABV, IBU, style, and brewery are canonical fields on a beer entity and are read-only to users once verified; they may only be updated through a moderated data-correction path (UC-25) or by the associated brewery account.

**BR-8 (Beer style taxonomy).** The platform maintains a canonical beer style enum (e.g., IPA, Imperial Stout, Pilsner, Saison, Hazy IPA, Lambic, etc.), seeded from an industry-standard taxonomy. New styles are added centrally only; users cannot invent free-text styles. Encyclopedia submissions (UC-3) must map to a style in the enum.

**BR-9 (Media limits).** A single post may include up to 10 media assets. Photos are limited to JPEG, PNG, or HEIC, ≤ 20 MB each. Videos are limited to MP4 or MOV, ≤ 90 seconds in length, ≤ 250 MB. Media failing these limits are rejected during validation.

**BR-10 (Brewery mention notifications).** When a user post features a beer associated with a verified brewery account, the System sends the brewery an in-app mention notification only if the brewery has opted in to mention notifications, to avoid overwhelming brewery operators in high-volume situations. Breweries may still view all mentions in their analytics (UC-24).

**BR-11 (Post privacy and distribution).** A post's privacy setting determines feed and search eligibility:
- `public`: eligible for For You, Following, Trending, Beer page feeds, and external deep-links.
- `followers-only`: eligible for Following only for accepted followers; never appears in For You or Trending; deep-links require the viewer to be a follower.
- `private`: visible only to the author; never in any feed; no deep-link visibility to others.
Reposts (UC-11) are permitted only on public posts. External share (native share-sheet) produces a deep-link whose view-time behavior respects the post's privacy at that moment.

**BR-12 (Session rules).** A user may have at most one active drinking session at a time (UC-5). Active sessions that receive no beer log for 8 consecutive hours are auto-ended; active sessions reaching 12 hours of total duration are auto-ended. On next app open after an auto-end, the user is prompted to publish, keep private, or discard the session (UC-7). Deleted sessions purge all associated logs; published sessions are immutable except for caption and participant visibility.

**BR-13 (Friend tagging consent).** Tagged users (UC-12) receive a pending tag notification; their handle is not publicly displayed on the post or session until they accept. Tagged users may decline without notifying the tagger, may revoke a prior acceptance, and may disable tagging globally or restrict it to mutuals in profile settings (UC-21). Declined tags are not retaggable in the same post or session.

**BR-14 (Responsible drinking — product guardrails).** The product's gamification, recap, and stats mechanics are tuned to avoid rewarding raw consumption-volume escalation. Specifically:
- Leaderboards (UC-21 feature — scheduled for later phase) never rank "most beers" as the single marquee metric; leaderboards emphasize variety (styles, countries, breweries) and social participation.
- Achievements beyond the "Century Club" milestone are weighted toward variety, discovery, and streaks of participation rather than raw counts.
- Non-judgmental pacing reminders are shown during a session (UC-6) when per-session or per-hour thresholds are exceeded; reminders are always dismissible and never blocking.
- Recaps (UC-18) emphasize variety and social moments, not raw volume.
- The platform provides access to responsible-drinking resources in settings and at onboarding (BR-4).

**BR-15 (Rate limits and abuse protection).** All write endpoints — posting, commenting, liking, reposting, following, messaging, session logging — are rate-limited per user to resist abuse. Limits are tunable per endpoint; users exceeding limits receive a non-blocking throttle notice and a short cool-down. Repeated rate-limit violations are surfaced to moderation (UC-25).

**BR-16 (Direct message privacy).** Direct messages (UC-13) respect per-user DM policy: `everyone` (default public profiles), `mutuals only`, or `no one`. Messages from non-mutuals under `everyone` enter a Message Requests queue and require the recipient to accept before becoming a live thread. DMs from blocked users are never delivered. Attachments in DMs are limited to beer detail cards, text, and (in later phases) images; no arbitrary-file attachments are permitted.

**BR-17 (Trending fairness).** The Trending service (UC-16) applies anti-brigading heuristics: per-user rate caps on contribution to any single beer's trending score, decay of bursts, regional normalization, and removal of self-boosting activity (e.g., a brewery account's own posts do not contribute to its beers' trending scores). Trending is additionally suppressed in regions where BR-2 requires restricted alcohol promotion.

**BR-18 (Leaderboards and achievements fairness).** Achievement (UC-19) and (future) leaderboard rules must be computable deterministically from canonical event data, such that appeals can be resolved by replaying events. Achievements that require streaks or cumulative counts must use idempotent deterministic keys to prevent double-unlocks. Leaderboards must not be gameable by spam (BR-15) and must obey BR-14's responsible-drinking framing.

**BR-19 (Handle changes and follow-request cool-off).** A user's handle may be changed at most once every 30 days (UC-21). When a handle changes, the prior handle is reserved as a redirect for 30 days before being released to the reserved-handle pool. Declined follow requests (UC-20) enter a 7-day cool-off during which the same follower may not re-request; blocked users cannot request indefinitely.

**BR-20 (Brewery content policies and ranking).** Brewery posts (UC-22) and brewery comments (UC-23) must not:
- target minors in language, imagery, or placement;
- include direct purchase links or price promotions in regions where alcohol-promotion rules restrict them;
- impersonate other breweries or use unlicensed trademarks.
Verified-brewery posts are eligible for For You but are down-weighted relative to user posts and capped to no more than 20% of a user's ranked For You surface, to preserve a user-first feed. Brewery commenting uses the verified-brewery badge only when the commented-on content features a beer within the brewery's verified scope.

**BR-21 (Post moderation thresholds and notification policy).** Moderation (UC-25) prioritizes queue items by severity first and flag count second. Severity levels — low, medium, high, critical — are assigned by automated filters on submission and revisited by admins. Critical items (e.g., imagery that depicts minors, credible threats) bypass the queue and trigger immediate content takedown pending review. Reporters receive an outcome notification confirming that their report was actioned or dismissed. Content owners receive a notification on Remove, Warn, Suspend, or Ban, with a reason and appeal instructions. Appeals (UC-25 Extension 8a) are reviewed by a second admin; no admin may review their own action's appeal.

**BR-22 (Data privacy and subject rights).** Users may export their data and request account deletion at any time (UC-26). Exports include profile, posts, comments, sessions, logs, achievements, direct messages, and follow graph, in a machine-readable format. Deletion removes user-generated content and personal data within the legally required timeframe for the user's region, retaining only the minimum set required by law (e.g., age-verification audit per BR-1, moderation audit for legal hold). Direct messages are deleted from the deleting user's copy of the thread; the recipient retains their copy, and the deleting user's handle is anonymized for the recipient.

---

**Confidential** — © Personal Project (Danny Mairena), 2026
