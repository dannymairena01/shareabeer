CREATE TYPE "public"."account_status" AS ENUM('pending_age_verification', 'blocked_underage', 'active', 'warned', 'suspended', 'banned');--> statement-breakpoint
CREATE TYPE "public"."age_verification_decision" AS ENUM('pass', 'fail', 'inconclusive');--> statement-breakpoint
CREATE TYPE "public"."beer_style" AS ENUM('ipa', 'hazy_ipa', 'imperial_ipa', 'imperial_stout', 'stout', 'porter', 'pilsner', 'lager', 'pale_ale', 'amber_ale', 'brown_ale', 'wheat', 'hefeweizen', 'saison', 'sour', 'lambic', 'gose', 'kolsch', 'barleywine', 'other');--> statement-breakpoint
CREATE TYPE "public"."comment_status" AS ENUM('visible', 'hidden', 'pending_review');--> statement-breakpoint
CREATE TYPE "public"."dm_policy" AS ENUM('everyone', 'mutuals', 'no_one');--> statement-breakpoint
CREATE TYPE "public"."follow_state" AS ENUM('active', 'pending');--> statement-breakpoint
CREATE TYPE "public"."moderation_action" AS ENUM('dismiss', 'warn', 'remove', 'suspend_7', 'suspend_14', 'suspend_30', 'suspend_90', 'ban');--> statement-breakpoint
CREATE TYPE "public"."participant_state" AS ENUM('pending', 'accepted', 'declined');--> statement-breakpoint
CREATE TYPE "public"."post_status" AS ENUM('published', 'draft', 'hidden', 'removed');--> statement-breakpoint
CREATE TYPE "public"."privacy_level" AS ENUM('public', 'followers_only', 'private');--> statement-breakpoint
CREATE TYPE "public"."report_subject_type" AS ENUM('post', 'comment', 'dm', 'beer_submission', 'account');--> statement-breakpoint
CREATE TYPE "public"."serving_size" AS ENUM('can', 'bottle', 'draft', 'flight', 'other');--> statement-breakpoint
CREATE TYPE "public"."session_status" AS ENUM('active', 'ended', 'auto_ended_pending_review', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "achievements" (
	"achievement_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(80) NOT NULL,
	"description" varchar(240) NOT NULL,
	"criteria" jsonb NOT NULL,
	"icon_url" varchar(1024),
	"tier" varchar(8) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "achievements_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_achievements" (
	"user_id" uuid NOT NULL,
	"achievement_id" uuid NOT NULL,
	"unlocked_at" timestamp with time zone NOT NULL,
	"idempotency_key" varchar(128) NOT NULL,
	CONSTRAINT "user_achievements_user_id_achievement_id_pk" PRIMARY KEY("user_id","achievement_id")
);
--> statement-breakpoint
CREATE TABLE "beer_logs" (
	"log_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"beer_id" uuid NOT NULL,
	"session_id" uuid,
	"serving_size" "serving_size" NOT NULL,
	"user_rating" integer,
	"tasting_note" varchar(280),
	"location_lat" numeric(9, 6),
	"location_lng" numeric(9, 6),
	"location_geohash_coarse" varchar(7),
	"logged_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "beer_submissions" (
	"submission_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"submitter_id" uuid NOT NULL,
	"name" varchar(120) NOT NULL,
	"brewery_name" varchar(160) NOT NULL,
	"style" "beer_style" NOT NULL,
	"abv" numeric(4, 2),
	"description" varchar(500),
	"photo_url" varchar(1024),
	"status" "submission_status" DEFAULT 'pending' NOT NULL,
	"reviewed_at" timestamp with time zone,
	"created_beer_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "beers" (
	"beer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"brewery_id" uuid NOT NULL,
	"style" "beer_style" NOT NULL,
	"abv" numeric(4, 2),
	"ibu" integer,
	"tasting_notes" varchar(500),
	"hero_image_url" varchar(1024),
	"is_verified" boolean DEFAULT false NOT NULL,
	"community_rating" numeric(3, 2),
	"community_rating_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "breweries" (
	"brewery_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(160) NOT NULL,
	"region" varchar(8),
	"website" varchar(1024),
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brewery_operators" (
	"operator_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brewery_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" varchar(16) NOT NULL,
	"mfa_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "brewery_settings" (
	"brewery_id" uuid PRIMARY KEY NOT NULL,
	"mention_notifications_enabled" boolean DEFAULT false NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "guidelines_versions" (
	"version_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"version_number" integer NOT NULL,
	"title" varchar(160) NOT NULL,
	"content_markdown" text NOT NULL,
	"content_hash" varchar(64) NOT NULL,
	"effective_date" timestamp with time zone NOT NULL,
	"is_current" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "guidelines_versions_version_number_unique" UNIQUE("version_number")
);
--> statement-breakpoint
CREATE TABLE "region_drinking_ages" (
	"region_code" varchar(8) PRIMARY KEY NOT NULL,
	"min_drinking_age" integer NOT NULL,
	"display_name" varchar(120) NOT NULL,
	"promotion_restricted" boolean DEFAULT false NOT NULL,
	"notes" varchar(240),
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_guidelines_acks" (
	"user_id" uuid NOT NULL,
	"version_id" uuid NOT NULL,
	"acked_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_guidelines_acks_user_id_version_id_pk" PRIMARY KEY("user_id","version_id")
);
--> statement-breakpoint
CREATE TABLE "age_verification_records" (
	"record_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"region" varchar(8) NOT NULL,
	"method" varchar(64) NOT NULL,
	"provider_reference" varchar(128) NOT NULL,
	"decision" "age_verification_decision" NOT NULL,
	"timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"bio" varchar(160),
	"avatar_url" varchar(1024),
	"website_url" varchar(1024),
	"favorite_styles" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"privacy_default" "privacy_level" DEFAULT 'public' NOT NULL,
	"dm_policy" "dm_policy" DEFAULT 'everyone' NOT NULL,
	"notification_prefs" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(320) NOT NULL,
	"display_name" varchar(30) NOT NULL,
	"handle" varchar(20) NOT NULL,
	"status" "account_status" DEFAULT 'pending_age_verification' NOT NULL,
	"age_verified" boolean DEFAULT false NOT NULL,
	"last_handle_change_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_handle_unique" UNIQUE("handle")
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"comment_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"author_id" uuid NOT NULL,
	"parent_comment_id" uuid,
	"text" varchar(1000) NOT NULL,
	"status" "comment_status" DEFAULT 'visible' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "likes" (
	"post_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "likes_post_id_user_id_pk" PRIMARY KEY("post_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "post_media" (
	"media_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"kind" varchar(8) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"mime_type" varchar(40) NOT NULL,
	"file_size_bytes" integer NOT NULL,
	"duration_seconds" integer,
	"transcode_status" varchar(16) DEFAULT 'ready' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "post_tags" (
	"tag_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"post_id" uuid NOT NULL,
	"tagger_id" uuid NOT NULL,
	"taggee_id" uuid NOT NULL,
	"state" "participant_state" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone,
	"declined_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"post_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author_id" uuid NOT NULL,
	"beer_log_id" uuid,
	"session_id" uuid,
	"caption" text,
	"hashtags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"privacy" "privacy_level" NOT NULL,
	"status" "post_status" DEFAULT 'published' NOT NULL,
	"stats_json" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"removed_at" timestamp with time zone,
	"hidden_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "reposts" (
	"repost_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reposter_id" uuid NOT NULL,
	"original_post_id" uuid NOT NULL,
	"added_caption" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_participants" (
	"participant_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"state" "participant_state" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"session_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone,
	"status" "session_status" DEFAULT 'active' NOT NULL,
	"venue_name" varchar(80),
	"location_lat" numeric(9, 6),
	"location_lng" numeric(9, 6),
	"location_geohash_coarse" varchar(7),
	"last_log_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "follow_request_cooloffs" (
	"follower_id" uuid NOT NULL,
	"followee_id" uuid NOT NULL,
	"declined_at" timestamp with time zone NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "follow_request_cooloffs_follower_id_followee_id_pk" PRIMARY KEY("follower_id","followee_id")
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"follow_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"follower_id" uuid NOT NULL,
	"followee_id" uuid NOT NULL,
	"state" "follow_state" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"audit_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid,
	"subject_type" varchar(32) NOT NULL,
	"subject_id" uuid NOT NULL,
	"action" varchar(64) NOT NULL,
	"reason" varchar(500),
	"details" jsonb,
	"timestamp" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "moderation_actions" (
	"action_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid NOT NULL,
	"subject_type" "report_subject_type" NOT NULL,
	"subject_id" uuid NOT NULL,
	"action" "moderation_action" NOT NULL,
	"reason" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reports" (
	"report_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_id" uuid NOT NULL,
	"subject_type" "report_subject_type" NOT NULL,
	"subject_id" uuid NOT NULL,
	"reasons" jsonb NOT NULL,
	"notes" varchar(500),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievements" ADD CONSTRAINT "user_achievements_achievement_id_achievements_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievements"("achievement_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beer_logs" ADD CONSTRAINT "beer_logs_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beer_logs" ADD CONSTRAINT "beer_logs_beer_id_beers_beer_id_fk" FOREIGN KEY ("beer_id") REFERENCES "public"."beers"("beer_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beer_logs" ADD CONSTRAINT "beer_logs_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beer_submissions" ADD CONSTRAINT "beer_submissions_submitter_id_users_user_id_fk" FOREIGN KEY ("submitter_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beer_submissions" ADD CONSTRAINT "beer_submissions_created_beer_id_beers_beer_id_fk" FOREIGN KEY ("created_beer_id") REFERENCES "public"."beers"("beer_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "beers" ADD CONSTRAINT "beers_brewery_id_breweries_brewery_id_fk" FOREIGN KEY ("brewery_id") REFERENCES "public"."breweries"("brewery_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brewery_operators" ADD CONSTRAINT "brewery_operators_brewery_id_breweries_brewery_id_fk" FOREIGN KEY ("brewery_id") REFERENCES "public"."breweries"("brewery_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brewery_operators" ADD CONSTRAINT "brewery_operators_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brewery_settings" ADD CONSTRAINT "brewery_settings_brewery_id_breweries_brewery_id_fk" FOREIGN KEY ("brewery_id") REFERENCES "public"."breweries"("brewery_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_guidelines_acks" ADD CONSTRAINT "user_guidelines_acks_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_guidelines_acks" ADD CONSTRAINT "user_guidelines_acks_version_id_guidelines_versions_version_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."guidelines_versions"("version_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "age_verification_records" ADD CONSTRAINT "age_verification_records_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_author_id_users_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_media" ADD CONSTRAINT "post_media_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_post_id_posts_post_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("post_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_tagger_id_users_user_id_fk" FOREIGN KEY ("tagger_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_tags" ADD CONSTRAINT "post_tags_taggee_id_users_user_id_fk" FOREIGN KEY ("taggee_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_beer_log_id_beer_logs_log_id_fk" FOREIGN KEY ("beer_log_id") REFERENCES "public"."beer_logs"("log_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_reposter_id_users_user_id_fk" FOREIGN KEY ("reposter_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reposts" ADD CONSTRAINT "reposts_original_post_id_posts_post_id_fk" FOREIGN KEY ("original_post_id") REFERENCES "public"."posts"("post_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_session_id_sessions_session_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("session_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_participants" ADD CONSTRAINT "session_participants_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_owner_id_users_user_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow_request_cooloffs" ADD CONSTRAINT "follow_request_cooloffs_follower_id_users_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follow_request_cooloffs" ADD CONSTRAINT "follow_request_cooloffs_followee_id_users_user_id_fk" FOREIGN KEY ("followee_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_follower_id_users_user_id_fk" FOREIGN KEY ("follower_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followee_id_users_user_id_fk" FOREIGN KEY ("followee_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_id_users_user_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "moderation_actions" ADD CONSTRAINT "moderation_actions_actor_id_users_user_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_reporter_id_users_user_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "user_achievements_idemp_uq" ON "user_achievements" USING btree ("idempotency_key");--> statement-breakpoint
CREATE INDEX "beer_logs_user_logged_idx" ON "beer_logs" USING btree ("user_id","logged_at");--> statement-breakpoint
CREATE INDEX "beer_logs_beer_idx" ON "beer_logs" USING btree ("beer_id");--> statement-breakpoint
CREATE INDEX "beer_logs_session_idx" ON "beer_logs" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "beers_brewery_idx" ON "beers" USING btree ("brewery_id");--> statement-breakpoint
CREATE INDEX "beers_style_idx" ON "beers" USING btree ("style");--> statement-breakpoint
CREATE INDEX "beers_name_idx" ON "beers" USING btree ("name");--> statement-breakpoint
CREATE INDEX "breweries_name_idx" ON "breweries" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "brewery_operators_uq" ON "brewery_operators" USING btree ("brewery_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "guidelines_current_uniq" ON "guidelines_versions" USING btree ("is_current") WHERE "guidelines_versions"."is_current" = true;--> statement-breakpoint
CREATE INDEX "age_verification_user_idx" ON "age_verification_records" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_handle_lower_idx" ON "users" USING btree ("handle");--> statement-breakpoint
CREATE UNIQUE INDEX "post_tags_uq" ON "post_tags" USING btree ("post_id","taggee_id");--> statement-breakpoint
CREATE INDEX "posts_author_created_idx" ON "posts" USING btree ("author_id","created_at");--> statement-breakpoint
CREATE INDEX "posts_feed_idx" ON "posts" USING btree ("status","privacy","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "reposts_uq" ON "reposts" USING btree ("reposter_id","original_post_id");--> statement-breakpoint
CREATE UNIQUE INDEX "session_participants_uq" ON "session_participants" USING btree ("session_id","user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_active_per_user_uniq" ON "sessions" USING btree ("owner_id") WHERE status = 'active';--> statement-breakpoint
CREATE INDEX "sessions_owner_status_idx" ON "sessions" USING btree ("owner_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "follows_uq" ON "follows" USING btree ("follower_id","followee_id");--> statement-breakpoint
CREATE INDEX "follows_followee_idx" ON "follows" USING btree ("followee_id");--> statement-breakpoint
CREATE INDEX "audit_logs_subject_idx" ON "audit_logs" USING btree ("subject_type","subject_id","timestamp");--> statement-breakpoint
CREATE INDEX "reports_subject_idx" ON "reports" USING btree ("subject_type","subject_id");