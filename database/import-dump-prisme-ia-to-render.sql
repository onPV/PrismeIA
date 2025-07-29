--
-- PostgreSQL data dump
-- Données uniquement pour le projet PrismeIA
--

-- Astuce pour désactiver temporairement les contraintes et triggers
SET session_replication_role = 'replica';

--
-- Data for Name: doctrine_migration_versions; Type: TABLE DATA; Schema: public;
--
COPY public.doctrine_migration_versions (version, executed_at, execution_time) FROM stdin;
DoctrineMigrations\\Version20250727101201	2025-07-27 11:38:13	58
\.


--
-- Data for Name: ia_categories; Type: TABLE DATA; Schema: public;
--
COPY public.ia_categories (id, name, description, is_active, created_at, updated_at) FROM stdin;
1f06ade2-ead4-6c2e-801a-31486c96e691	Communication	Catégorie pour la génération de contenu lié à la communication.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-65b6-8d15-31486c96e691	RH	Catégorie pour la génération de contenu lié aux ressources humaines.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-67a0-87b6-31486c96e691	Administration	Catégorie pour la génération de contenu administratif.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-68b8-82e2-31486c96e691	Commerce	Catégorie pour la génération de contenu commercial.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
1f06ade2-ead5-69bc-b7a6-31486c96e691	Généraliste	Catégorie pour les prompts généraux et divers.	t	2025-07-27 11:38:14	2025-07-27 11:38:14
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: public;
--
COPY public.refresh_tokens (id, refresh_token, username, valid) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public;
--
COPY public.users (id, email, roles, password, reset_password_token, reset_password_token_expires_at) FROM stdin;
1f06ade2-f171-6122-a9c6-31486c96e691	admin@prismeia.com	["ROLE_ADMIN","ROLE_USER"]	$2y$13$83tHv.EgHRYIwDYf8M.CheYKk73cJQFmH7S.mr3.WQKW2Ar.An2sa	\N	\N
1f06ade2-fae1-6392-874a-31486c96e691	user2@prismeia.com	["ROLE_USER"]	$2y$13$9O4XHbi/5LuORuOixk5T2u698uIk8L8orHmUL4blKf1oUQttK2RHK	\N	\N
1f06ade2-ff04-6f28-80c3-31486c96e691	user3@prismeia.com	["ROLE_USER"]	$2y$13$E6ch.nFnaGa8tTka6F/MZONSuAq03yXFI3lSPG4rneutIeoXuEaqC	\N	\N
1f06ade3-0376-68a4-ae88-31486c96e691	user4@prismeia.com	["ROLE_USER"]	$2y$13$Us97FT7uLYGz8X4YPU6zNex5hnRrB3iBaArHyUUedr05y0mzMSb9y	\N	\N
1f06ade2-f64d-657e-b027-31486c96e691	user1@prismeia.com	["ROLE_USER"]	$2y$13$/Kb9DLh6A39uqXJ31iw0huDLaHo3pq6qxryEM/oV9uofpVB8iVDl2	8325862e-a1bd-4a1d-98c0-8dbfaf3abeae	2025-07-27 12:38:50
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public;
--
COPY public.user_profiles (id, owner_id, first_name, last_name, phone_number, address, city, zip_code, country, created_at, updated_at) FROM stdin;
1f06ade2-f17c-6c16-8bee-31486c96e691	1f06ade2-f171-6122-a9c6-31486c96e691	Admin	PrismeIA	0123456789	123 Rue de lAdmin	Paris	75001	France	2025-07-27 11:38:15	2025-07-27 11:38:15
1f06ade2-fae1-6cca-9721-31486c96e691	1f06ade2-fae1-6392-874a-31486c96e691	Utilisateur	Deux	0611223344	789 Boulevard des Essais	Marseille	13008	France	2025-07-27 11:38:16	2025-07-27 11:38:16
1f06ade2-ff05-63f6-a42c-31486c96e691	1f06ade2-ff04-6f28-80c3-31486c96e691	Utilisateur	Trois	0755667788	101 Rue de la Démo	Toulouse	31000	France	2025-07-27 11:38:16	2025-07-27 11:38:16
1f06ade3-0377-60ce-8c43-31486c96e691	1f06ade3-0376-68a4-ae88-31486c96e691	Utilisateur	Quatre	0499887766	202 Avenue des Projets	Nice	06000	France	2025-07-27 11:38:17	2025-07-27 11:38:17
1f06ade2-f64d-6ab0-9ab7-31486c96e691	1f06ade2-f64d-657e-b027-31486c96e691	Utilisateur	Un	0987654321	456 Avenue des Tests	Lyon	69002	France	2025-07-27 11:38:15	2025-07-27 11:38:51
\.


-- Réactive les contraintes et triggers
SET session_replication_role = 'origin';