CREATE TABLE "booking" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "booking_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sitter_id" integer NOT NULL,
	"owner_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"total_price" double precision NOT NULL,
	"special_request" varchar,
	"booking_code" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notification" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "notification_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"type" varchar NOT NULL,
	"content" varchar NOT NULL,
	"send_to_email" boolean DEFAULT true NOT NULL,
	"send_to_phone" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "payment_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"booking_id" integer NOT NULL,
	"amount" double precision NOT NULL,
	"payment_method" varchar NOT NULL,
	"payment_status" varchar DEFAULT 'pending' NOT NULL,
	"transaction_id" varchar NOT NULL,
	"paid_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pet_image" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pet_image_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"owner_id" integer NOT NULL,
	"image_url" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pet_owner" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pet_owner_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"display_name" varchar,
	"display_image" varchar,
	"phone_number" text NOT NULL,
	"bio" varchar,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"is_sitter" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pet_sitter" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "pet_sitter_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"display_name" varchar,
	"display_image" varchar,
	"phone_number" text NOT NULL,
	"headline" varchar NOT NULL,
	"bio" varchar,
	"address" varchar NOT NULL,
	"city" varchar NOT NULL,
	"latitude" double precision NOT NULL,
	"longitude" double precision NOT NULL,
	"experience_years" integer DEFAULT 0 NOT NULL,
	"accepts_large_dogs" boolean DEFAULT false NOT NULL,
	"accepts_small_dogs" boolean DEFAULT false NOT NULL,
	"accepts_cats" boolean DEFAULT false NOT NULL,
	"accepts_fish" boolean DEFAULT false NOT NULL,
	"accepts_birds" boolean DEFAULT false NOT NULL,
	"accepts_other_pets" boolean DEFAULT false NOT NULL,
	"nid_image" varchar NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"average_rating" double precision DEFAULT 0 NOT NULL,
	"total_reviews" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "report_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"reporter_id" text NOT NULL,
	"reportee_id" text NOT NULL,
	"report_type" varchar NOT NULL,
	"description" varchar NOT NULL,
	"status" varchar DEFAULT 'pending' NOT NULL,
	"admin_response" varchar,
	"resolved_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "review_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"booking_id" integer NOT NULL,
	"sitter_id" integer NOT NULL,
	"owner_id" integer NOT NULL,
	"rating" integer NOT NULL,
	"review_text" varchar,
	"sitter_response" varchar,
	"replied_at" timestamp,
	"is_false" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "service_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sitter_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"service_type" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price_per_day" double precision NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sitter_availability" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sitter_availability_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sitter_id" integer NOT NULL,
	"available_from" timestamp NOT NULL,
	"available_to" timestamp NOT NULL,
	"is_blocked" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sitter_photo" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "sitter_photo_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"sitter_id" integer NOT NULL,
	"image_url" varchar NOT NULL,
	"photo_type" varchar NOT NULL,
	"caption" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_sitter_id_pet_sitter_id_fk" FOREIGN KEY ("sitter_id") REFERENCES "public"."pet_sitter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_owner_id_pet_owner_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."pet_owner"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "booking" ADD CONSTRAINT "booking_service_id_service_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet_image" ADD CONSTRAINT "pet_image_owner_id_pet_owner_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."pet_owner"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet_owner" ADD CONSTRAINT "pet_owner_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pet_sitter" ADD CONSTRAINT "pet_sitter_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_reporter_id_user_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "report" ADD CONSTRAINT "report_reportee_id_user_id_fk" FOREIGN KEY ("reportee_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_booking_id_booking_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."booking"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_sitter_id_pet_sitter_id_fk" FOREIGN KEY ("sitter_id") REFERENCES "public"."pet_sitter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_owner_id_pet_owner_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."pet_owner"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service" ADD CONSTRAINT "service_sitter_id_pet_sitter_id_fk" FOREIGN KEY ("sitter_id") REFERENCES "public"."pet_sitter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sitter_availability" ADD CONSTRAINT "sitter_availability_sitter_id_pet_sitter_id_fk" FOREIGN KEY ("sitter_id") REFERENCES "public"."pet_sitter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sitter_photo" ADD CONSTRAINT "sitter_photo_sitter_id_pet_sitter_id_fk" FOREIGN KEY ("sitter_id") REFERENCES "public"."pet_sitter"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "booking_sitterId_idx" ON "booking" USING btree ("sitter_id");--> statement-breakpoint
CREATE INDEX "booking_ownerId_idx" ON "booking" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "pet_owner_userId_idx" ON "pet_owner" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "pet_sitter_userId_idx" ON "pet_sitter" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");