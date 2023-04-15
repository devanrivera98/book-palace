set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


CREATE TABLE "public"."wishlist" (
	"wishlist_id" serial NOT NULL,
	"title" TEXT NOT NULL UNIQUE,
	"author" TEXT NOT NULL,
	"isbn" TEXT NOT NULL UNIQUE,
	"rating" DECIMAL NOT NULL,
	"image" TEXT NOT NULL UNIQUE,
	"description" TEXT NOT NULL,
	"price" DECIMAL NOT NULL UNIQUE,
	CONSTRAINT "wishlist_pk" PRIMARY KEY ("wishlist_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."cart" (
	"cartId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"author" TEXT NOT NULL,
	"isbn" TEXT NOT NULL UNIQUE,
	"rating" DECIMAL NOT NULL,
	"image" TEXT NOT NULL,
	"price" TEXT NOT NULL,
	CONSTRAINT "cart_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
