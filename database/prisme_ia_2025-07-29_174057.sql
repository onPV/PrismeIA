--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: doctrine_migration_versions; Type: TABLE; Schema: public; Owner: prisme_ia
--

CREATE TABLE public.doctrine_migration_versions (
    version character varying(191) NOT NULL,
    executed_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone,
    execution_time integer
);


ALTER TABLE public.doctrine_migration_versions OWNER TO prisme_ia;

--
-- Name: ia_categories; Type: TABLE; Schema: public; Owner: prisme_ia
--

CREATE TABLE public.ia_categories (
    id uuid NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.ia_categories OWNER TO prisme_ia;

--
-- Name: COLUMN ia_categories.id; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.ia_categories.id IS '(DC2Type:uuid)';


--
-- Name: COLUMN ia_categories.created_at; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.ia_categories.created_at IS '(DC2Type:datetime_immutable)';


--
-- Name: COLUMN ia_categories.updated_at; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.ia_categories.updated_at IS '(DC2Type:datetime_immutable)';


--
-- Name: refresh_tokens; Type: TABLE; Schema: public; Owner: prisme_ia
--

CREATE TABLE public.refresh_tokens (
    id integer NOT NULL,
    refresh_token character varying(128) NOT NULL,
    username character varying(255) NOT NULL,
    valid timestamp(0) without time zone NOT NULL
);


ALTER TABLE public.refresh_tokens OWNER TO prisme_ia;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: prisme_ia
--

CREATE SEQUENCE public.refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.refresh_tokens_id_seq OWNER TO prisme_ia;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: prisme_ia
--

ALTER SEQUENCE public.refresh_tokens_id_seq OWNED BY public.refresh_tokens.id;


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: prisme_ia
--

CREATE TABLE public.user_profiles (
    id uuid NOT NULL,
    owner_id uuid NOT NULL,
    first_name character varying(255) DEFAULT NULL::character varying,
    last_name character varying(255) DEFAULT NULL::character varying,
    phone_number character varying(20) DEFAULT NULL::character varying,
    address character varying(255) DEFAULT NULL::character varying,
    city character varying(100) DEFAULT NULL::character varying,
    zip_code character varying(10) DEFAULT NULL::character varying,
    country character varying(100) DEFAULT NULL::character varying,
    created_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(0) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_profiles OWNER TO prisme_ia;

--
-- Name: COLUMN user_profiles.id; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.user_profiles.id IS '(DC2Type:uuid)';


--
-- Name: COLUMN user_profiles.owner_id; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.user_profiles.owner_id IS '(DC2Type:uuid)';


--
-- Name: COLUMN user_profiles.created_at; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.user_profiles.created_at IS '(DC2Type:datetime_immutable)';


--
-- Name: COLUMN user_profiles.updated_at; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.user_profiles.updated_at IS '(DC2Type:datetime_immutable)';


--
-- Name: users; Type: TABLE; Schema: public; Owner: prisme_ia
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying(180) NOT NULL,
    roles json NOT NULL,
    password character varying(255) NOT NULL,
    reset_password_token character varying(255) DEFAULT NULL::character varying,
    reset_password_token_expires_at timestamp(0) without time zone DEFAULT NULL::timestamp without time zone
);


ALTER TABLE public.users OWNER TO prisme_ia;

--
-- Name: COLUMN users.id; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.users.id IS '(DC2Type:uuid)';


--
-- Name: COLUMN users.reset_password_token_expires_at; Type: COMMENT; Schema: public; Owner: prisme_ia
--

COMMENT ON COLUMN public.users.reset_password_token_expires_at IS '(DC2Type:datetime_immutable)';


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: public; Owner: prisme_ia
--

ALTER TABLE ONLY public.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: doctrine_migration_versions; Type: TABLE DATA; Schema: public; Owner: prisme_ia
--

COPY public.doctrine_migration_versions (version, executed_at, execution_time) FROM stdin;
DoctrineMigrations\\Version20250727101201	2025-07-27 11:38:13	58
\.


--
-- Data for Name: ia_categories; Type: TABLE DATA; Schema: public; Owner: prisme_ia
--

COPY public.ia_categories (id, name, description, is_active, created_at, updated_at) FROM stdin;
1f06ade2-ead4-6c2e-801a-31486c96e691	Communication	Catégorie pour la génération de contenu lié à la communication.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-65b6-8d15-31486c96e691	RH	Catégorie pour la génération de contenu lié aux ressources humaines.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-67a0-87b6-31486c96e691	Administration	Catégorie pour la génération de contenu administratif.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-68b8-82e2-31486c96e691	Commerce	Catégorie pour la génération de contenu commercial.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-69bc-b7a6-31486c96e691	Généraliste	Catégorie pour les prompts généraux et divers.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public; Owner: prisme_ia
--

COPY public.refresh_tokens (id, refresh_token, username, valid) FROM stdin;
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: prisme_ia
--

COPY public.user_profiles (id, owner_id, first_name, last_name, phone_number, address, city, zip_code, country, created_at, updated_at) FROM stdin;
1f06ade2-f17c-6c16-8bee-31486c96e691	1f06ade2-f171-6122-a9c6-31486c96e691	Admin	PrismeIA	0123456789	123 Rue de lAdmin	Paris	75001	France	2025-07-27 11:38:15	2025-07-27 11:38:15
1f06ade2-fae1-6cca-9721-31486c96e691	1f06ade2-fae1-6392-874a-31486c96e691	Utilisateur	Deux	0611223344	789 Boulevard des Essais	Marseille	13008	France	2025-07-27 11:38:16	2025-07-27 11:38:16
1f06ade2-ff05-63f6-a42c-31486c96e691	1f06ade2-ff04-6f28-80c3-31486c96e691	Utilisateur	Trois	0755667788	101 Rue de la Démo	Toulouse	31000	France	2025-07-27 11:38:16	2025-07-27 11:38:16
1f06ade3-0377-60ce-8c43-31486c96e691	1f06ade3-0376-68a4-ae88-31486c96e691	Utilisateur	Quatre	0499887766	202 Avenue des Projets	Nice	06000	France	2025-07-27 11:38:17	2025-07-27 11:38:17
1f06ade2-f64d-6ab0-9ab7-31486c96e691	1f06ade2-f64d-657e-b027-31486c96e691	Utilisateur	Un	0987654321	456 Avenue des Tests	Lyon	69002	France	2025-07-27 11:38:15	2025-07-27 11:38:51
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: prisme_ia
--

COPY public.users (id, email, roles, password, reset_password_token, reset_password_token_expires_at) FROM stdin;
1f06ade2-f171-6122-a9c6-31486c96e691	admin@prismeia.com	["ROLE_ADMIN","ROLE_USER"]	$2y$13$83tHv.EgHRYIwDYf8M.CheYKk73cJQFmH7S.mr3.WQKW2Ar.An2sa	\N	\N
1f06ade2-fae1-6392-874a-31486c96e691	user2@prismeia.com	["ROLE_USER"]	$2y$13$9O4XHbi/5LuORuOixk5T2u698uIk8L8orHmUL4blKf1oUQttK2RHK	\N	\N
1f06ade2-ff04-6f28-80c3-31486c96e691	user3@prismeia.com	["ROLE_USER"]	$2y$13$E6ch.nFnaGa8tTka6F/MZONSuAq03yXFI3lSPG4rneutIeoXuEaqC	\N	\N
1f06ade3-0376-68a4-ae88-31486c96e691	user4@prismeia.com	["ROLE_USER"]	$2y$13$Us97FT7uLYGz8X4YPU6zNex5hnRrB3iBaArHyUUedr05y0mzMSb9y	\N	\N
1f06ade2-f64d-657e-b027-31486c96e691	user1@prismeia.com	["ROLE_USER"]	$2y$13$/Kb9DLh6A39uqXJ31iw0huDLaHo3pq6qxryEM/oV9uofpVB8iVDl2	8325862e-a1bd-4a1d-98c0-8dbfaf3abeae	2025-07-27 12:38:50
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: prisme_ia
--

SELECT pg_catalog.setval('public.refresh_tokens_id_seq', 1, false);


--
-- Name: doctrine_migration_versions doctrine_migration_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: prisme_ia
--

ALTER TABLE ONLY public.doctrine_migration_versions
    ADD CONSTRAINT doctrine_migration_versions_pkey PRIMARY KEY (version);


--
-- Name: ia_categories ia_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: prisme_ia
--

ALTER TABLE ONLY public.ia_categories
    ADD CONSTRAINT ia_categories_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: prisme_ia
--

ALTER TABLE ONLY public.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: prisme_ia
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: prisme_ia
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: uniq_6bbd61307e3c61f9; Type: INDEX; Schema: public; Owner: prisme_ia
--

CREATE UNIQUE INDEX uniq_6bbd61307e3c61f9 ON public.user_profiles USING btree (owner_id);


--
-- Name: uniq_7dab1af5e237e06; Type: INDEX; Schema: public; Owner: prisme_ia
--

CREATE UNIQUE INDEX uniq_7dab1af5e237e06 ON public.ia_categories USING btree (name);


--
-- Name: uniq_9bace7e1c74f2195; Type: INDEX; Schema: public; Owner: prisme_ia
--

CREATE UNIQUE INDEX uniq_9bace7e1c74f2195 ON public.refresh_tokens USING btree (refresh_token);


--
-- Name: uniq_identifier_email; Type: INDEX; Schema: public; Owner: prisme_ia
--

CREATE UNIQUE INDEX uniq_identifier_email ON public.users USING btree (email);


--
-- Name: user_profiles fk_6bbd61307e3c61f9; Type: FK CONSTRAINT; Schema: public; Owner: prisme_ia
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT fk_6bbd61307e3c61f9 FOREIGN KEY (owner_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

