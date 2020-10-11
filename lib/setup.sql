DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_posts;

CREATE TABLE public.users (
 id UUID NOT NULL,
 firstName CHAR(64),
 lastName CHAR(64),
 email CHAR(128),
 password CHAR(60),
 PRIMARY KEY(id)
);

CREATE TABLE public.user_posts (
 post_id UUID NOT NULL,
 user_id UUID NOT NULL,
 post CHAR(256),
 PRIMARY KEY(post_id),
 CONSTRAINT users_fkey foreign key(user_id) references public.users(id)
);