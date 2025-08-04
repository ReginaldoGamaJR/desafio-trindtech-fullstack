--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
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
-- Name: status_curso; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_curso AS ENUM (
    'em_andamento',
    'concluido',
    'trancado',
    'encerrado'
);


ALTER TYPE public.status_curso OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: aluno_curso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aluno_curso (
    aluno_id integer NOT NULL,
    curso_id integer NOT NULL,
    status public.status_curso DEFAULT 'em_andamento'::public.status_curso NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    data_conclusao date
);


ALTER TABLE public.aluno_curso OWNER TO postgres;

--
-- Name: alunos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alunos (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    cpf character varying(11) NOT NULL,
    data_nascimento date,
    celular character varying(15),
    cep character varying(8),
    logradouro character varying(255),
    numero character varying(20),
    complemento character varying(100),
    bairro character varying(100),
    cidade character varying(100),
    uf character varying(2),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    genero character varying(50),
    pais character varying(100) DEFAULT 'Brasil'::character varying NOT NULL
);


ALTER TABLE public.alunos OWNER TO postgres;

--
-- Name: alunos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.alunos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.alunos_id_seq OWNER TO postgres;

--
-- Name: alunos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.alunos_id_seq OWNED BY public.alunos.id;


--
-- Name: cursos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cursos (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    descricao text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.cursos OWNER TO postgres;

--
-- Name: cursos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cursos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cursos_id_seq OWNER TO postgres;

--
-- Name: cursos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cursos_id_seq OWNED BY public.cursos.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: alunos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos ALTER COLUMN id SET DEFAULT nextval('public.alunos_id_seq'::regclass);


--
-- Name: cursos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos ALTER COLUMN id SET DEFAULT nextval('public.cursos_id_seq'::regclass);


--
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20250717191622-create-usuario.cjs
criando-data.cjs
\.


--
-- Data for Name: aluno_curso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aluno_curso (aluno_id, curso_id, status, created_at, updated_at, data_conclusao) FROM stdin;
17	3	em_andamento	2025-07-23 22:33:50.641-03	2025-07-23 22:33:50.641-03	\N
6	4	em_andamento	2025-07-24 00:46:46.328-03	2025-07-24 00:46:46.328-03	\N
19	6	em_andamento	2025-07-24 01:34:27.745-03	2025-07-24 01:34:27.745-03	\N
19	4	em_andamento	2025-07-24 01:34:27.779-03	2025-07-24 01:34:27.779-03	\N
20	5	em_andamento	2025-07-24 01:36:15.452-03	2025-07-24 01:36:15.452-03	\N
23	3	em_andamento	2025-07-24 01:36:32.059-03	2025-07-24 01:36:32.059-03	\N
6	6	em_andamento	2025-07-23 14:41:08.591-03	2025-07-23 14:41:08.591-03	\N
6	5	em_andamento	2025-07-23 14:41:08.612-03	2025-07-23 14:41:08.612-03	\N
23	6	em_andamento	2025-07-24 01:36:32.075-03	2025-07-24 01:36:32.075-03	\N
7	3	em_andamento	2025-07-23 14:53:39.244-03	2025-07-23 14:53:39.244-03	\N
7	4	em_andamento	2025-07-23 14:53:39.412-03	2025-07-23 14:53:39.412-03	\N
7	6	em_andamento	2025-07-23 14:53:39.507-03	2025-07-23 14:53:39.507-03	\N
7	5	em_andamento	2025-07-23 14:53:39.555-03	2025-07-23 14:53:39.555-03	\N
23	4	em_andamento	2025-07-24 01:36:32.087-03	2025-07-24 01:36:32.087-03	\N
23	5	em_andamento	2025-07-24 01:36:32.101-03	2025-07-24 01:36:32.101-03	\N
28	3	em_andamento	2025-07-24 01:53:34.776-03	2025-07-24 01:53:34.776-03	\N
33	3	em_andamento	2025-07-24 01:53:46.58-03	2025-07-24 01:53:46.58-03	\N
9	3	em_andamento	2025-07-23 15:10:38.222-03	2025-07-23 15:10:38.222-03	\N
9	5	em_andamento	2025-07-23 15:10:38.241-03	2025-07-23 15:10:38.241-03	\N
9	4	em_andamento	2025-07-23 15:10:38.321-03	2025-07-23 15:10:38.321-03	\N
33	5	em_andamento	2025-07-24 01:53:46.598-03	2025-07-24 01:53:46.598-03	\N
35	3	em_andamento	2025-07-24 01:53:59.032-03	2025-07-24 01:53:59.032-03	\N
35	4	em_andamento	2025-07-24 01:53:59.056-03	2025-07-24 01:53:59.056-03	\N
35	6	em_andamento	2025-07-24 01:53:59.08-03	2025-07-24 01:53:59.08-03	\N
11	9	em_andamento	2025-07-24 01:56:04.612-03	2025-07-24 01:56:04.612-03	\N
11	6	em_andamento	2025-07-24 01:56:14.562-03	2025-07-24 01:56:14.562-03	\N
11	8	em_andamento	2025-07-24 01:56:28.617-03	2025-07-24 01:56:28.617-03	\N
7	8	em_andamento	2025-07-24 01:57:05.462-03	2025-07-24 01:57:05.462-03	\N
15	3	em_andamento	2025-07-23 15:13:42.392-03	2025-07-23 15:13:42.392-03	\N
15	6	em_andamento	2025-07-23 15:13:42.474-03	2025-07-23 15:13:42.474-03	\N
15	4	em_andamento	2025-07-23 15:13:42.485-03	2025-07-23 15:13:42.485-03	\N
6	7	em_andamento	2025-07-24 01:57:18.7-03	2025-07-24 01:57:18.7-03	\N
6	8	em_andamento	2025-07-24 01:57:18.747-03	2025-07-24 01:57:18.747-03	\N
15	5	em_andamento	2025-07-24 01:57:29.362-03	2025-07-24 01:57:29.362-03	\N
15	9	em_andamento	2025-07-24 01:57:29.383-03	2025-07-24 01:57:29.383-03	\N
6	3	concluido	2025-07-23 14:41:08.55-03	2025-07-24 10:41:15.649-03	2025-07-24
\.


--
-- Data for Name: alunos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alunos (id, nome, email, cpf, data_nascimento, celular, cep, logradouro, numero, complemento, bairro, cidade, uf, created_at, updated_at, genero, pais) FROM stdin;
9	Lucas Ferreira	lucas.ferreira@email.com	33344455566	1999-11-05	31966665555	30130000	Avenida Afonso Pena	500	Sala 101	Centro	Belo Horizonte	MG	2025-07-22 11:31:15.703-03	2025-07-22 11:31:15.703-03	Masculino	Brasil
15	João Pedro	joao.pedro@email.com	99900011122	2002-08-03	91900009999	66010000	Avenida Presidente Vargas	1000	Fundos	Campina	Belém	PA	2025-07-22 11:33:16.85-03	2025-07-22 11:33:16.85-03	Masculino	Brasil
28	Pedro Santos	pedrosantos@email.com	11122223344	1995-11-21	21977776666	20020010	Avenida Presidente Antônio Carlos	100	Andar 5	Centro	Rio de Janeiro	RJ	2025-07-24 01:48:12.302-03	2025-07-24 01:53:34.7-03	Masculino	Brasil
17	Rodrigo Gama	rodrigoveigagama@gmail.com	15514412514	2025-07-19	21975460204	23040309	Rua Maria Ilda Pinto dos Santos	99	Rua sem fim	Guaratiba	Rio de Janeiro	RJ	2025-07-23 15:42:53.777-03	2025-07-23 22:34:27.193-03	Masculino	Brasil
23	Lanna França Leal	asdasda@gmail.com	19865547854	2025-07-24	21451251225	23040309	Rua Maria Ilda Pinto dos Santos	1		Guaratiba	Rio de Janeiro	RJ	2025-07-24 00:13:59.358-03	2025-07-24 01:16:01.61-03	Feminino	Brasil
7	Pedro Henrique	pedro.henrique@email.com	11122233344	2000-07-22	21999998888	20050090	Rua Uruguaiana	100	até 078 - lado par	Centro	Rio de Janeiro	RJ	2025-07-22 11:26:28.044-03	2025-07-23 19:52:56.959-03	Masculino	Brasil
6	Reginaldo Junior	reginaldojrgama@gmail.com	19453319767	2002-08-26	(21) 97028-0603	23040309	Rua Maria Ilda Pinto dos Santos	10	Casa de muro cinza escuro	Guaratiba	Rio de Janeiro	RJ	2025-07-21 15:22:37.754-03	2025-07-23 12:40:56.447-03	Masculino	Brasil
19	Ryan Veiga	RyanVeiga@gmail.com	19453319762	2002-02-05	21970280603	96050500	Rodovia BR-392			Fragata	Pelotas	RS	2025-07-23 15:53:04.274-03	2025-07-23 15:59:16.445-03	Homem	Brasil
20	Denise Luciana Veiga	Deniselucive@gmail.com	12514598714	2009-01-11	21982827343	23040309	Rua Maria Ilda Pinto dos Santos	21	Casa 1	Guaratiba	Rio de Janeiro	RJ	2025-07-23 18:45:07.724-03	2025-07-23 18:45:07.724-03	Femino	Brasil
11	Gabriel Costa	gabriel.costa@email.com	55566677788	2001-09-12	71944443333	40020000	Rua Chile	30	Edifício X	Comércio	Salvador	BA	2025-07-22 11:31:32.433-03	2025-07-23 21:27:41.375-03	Feminino	Brasil
33	Carlos Pereira	carlos.pereira@email.com	33344255566	2002-07-01	31253554444	30130140	Rua Paraíba	1100	Sala 20	Santa Efigênia	Belo Horizonte	MG	2025-07-24 01:48:54.208-03	2025-07-24 01:53:46.519-03	Masculino	Brasil
37	Lucas Almeida dos santos	lucas.almeidaa@email.com	55561672788	1998-01-19	81933332222	50030280	Rua do Imperador Pedro II	400	Casa	Santo Antônio	Recife	PE	2025-07-24 01:49:54.974-03	2025-07-24 01:49:54.974-03	Masculino	Brasil
38	Fernando Souza	fernando.souza@email.com	66677788899	1990-02-10	61922221111	70070100	Setor Comercial Sul	Quadra 6	Edifício Venâncio 2000 Bloco B	Asa Sul	Brasília	DF	2025-07-24 01:50:43.424-03	2025-07-24 01:50:43.424-03	Masculino	Brasil
39	Guilherme Rocha	guilherme.rocha@email.com	88899900011	1970-06-05	85900009999	60025000	Avenida Dom Manuel	800	Sala 10	Centro	Fortaleza	CE	2025-07-24 01:50:50.633-03	2025-07-24 01:50:50.633-03	Masculino	Brasil
40	Rafael Santos	rafael.santos@email.com	00011122233	1980-10-30	19988887777	13015000	Avenida Francisco Glicério	2000	Edifício Torre Negra	Centro	Campinas	SP	2025-07-24 01:50:56.227-03	2025-07-24 01:50:56.227-03	Masculino	Brasil
35	Lucas Almeida	lucas.almeida@email.com	55561677788	1998-01-19	81933332222	50030280	Praça da Comunidade Luso Brasileira	400	Casa	Recife	Recife	PE	2025-07-24 01:49:07.006-03	2025-07-24 01:53:58.991-03	Masculino	Brasil
41	Thiago Martins	thiago.martins@email.com	20232343454	1987-07-22	27966664444	29010002	Avenida Jerônimo Monteiro	800	Sala 101	Centro	Vitória	ES	2025-07-24 01:51:10.399-03	2025-07-24 01:51:10.399-03	Masculino	Brasil
42	Patrícia Ribeiro	patricia.ribeiro@email.com	10121232343	1993-12-01	91977775555	66055000	Travessa Dom Romualdo de Seixas	1500	Edifício Metropolitan Center	Umarizal	Belém	PA	2025-07-24 01:51:20.141-03	2025-07-24 01:51:20.141-03	Feminino	Brasil
43	Roberto Castro	roberto.castro@email.com	40454565676	1973-09-14	62944442222	74003010	Avenida Goiás	500	Edifício Bandeirantes	Setor Central	Goiânia	GO	2025-07-24 01:51:27.922-03	2025-07-24 01:51:27.922-03	Masculino	Brasil
44	Vinícius Farias	vinicius.farias@email.com	60676787898	1985-11-03	98922220000	65010000	Rua Grande	900	Galeria Central	Centro	São Luís	MA	2025-07-24 01:52:27.094-03	2025-07-24 01:52:27.094-03	Masculino	Brasil
45	Diego Queiroz	diego.queiroz@email.com	80898909010	1978-05-12	79900008888	49010000	Avenida Barão de Maruim	200	Comercial	Centro	Aracaju	SE	2025-07-24 01:52:33.133-03	2025-07-24 01:52:33.133-03	Masculino	Brasil
46	Daniel Mello	daniel.mello@email.com	01010121232	1982-03-19	95988886666	69301000	Avenida Ene Garcez	1300	Shopping Pátio Roraima	Centro	Boa Vista	RR	2025-07-24 01:52:41.841-03	2025-07-24 01:52:41.841-03	Masculino	Brasil
47	Sofia Queiroz	sofia.queiroz@email.com	11121232343	1994-09-04	69977775555	76801000	Avenida Presidente Dutra	2500	Andar 2	Centro	Porto Velho	RO	2025-07-24 01:52:47.028-03	2025-07-24 01:52:47.028-03	Feminino	Brasil
48	Eduardo Ramos	eduardo.ramos@email.com	21232343454	1971-04-26	68966664444	69900000	Avenida Ceará	1000	Ponto de Referência: Próximo ao Palácio do Governo	Centro	Rio Branco	AC	2025-07-24 01:52:51.593-03	2025-07-24 01:52:51.593-03	Masculino	Brasil
49	Manuela Rocha	manuela.rocha@email.com	31343454565	1999-07-11	83955553333	58010000	Praça João Pessoa	50	Edifício Centro Comercial	Centro	João Pessoa	PB	2025-07-24 01:52:56.364-03	2025-07-24 01:52:56.364-03	Feminino	Brasil
50	Felipe Vieira	felipe.vieira@email.com	41454565676	1986-02-09	84944442222	59012000	Avenida Rio Branco	300	Loja 5	Cidade Alta	Natal	RN	2025-07-24 01:53:00.636-03	2025-07-24 01:53:00.636-03	Masculino	Brasil
51	Beatriz Neves	beatriz.neves@email.com	51565676787	1997-10-23	86933331111	64000000	Rua Álvaro Mendes	1200	Apto 801	Centro	Teresina	PI	2025-07-24 01:53:04.983-03	2025-07-24 01:53:04.983-03	Feminino	Brasil
\.


--
-- Data for Name: cursos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cursos (id, nome, descricao, created_at, updated_at) FROM stdin;
3	SQL para Análise de Dados	Aprenda a extrair informações valiosas de bancos de dados com SQL.	2025-07-16 16:46:51.604-03	2025-07-16 16:46:51.604-03
4	Introdução à Lógica de Programação	Curso fundamental para iniciar no mundo do desenvolvimento.	2025-07-16 18:34:36.412-03	2025-07-16 18:34:36.412-03
6	Curso de Teste de Update	Este curso será atualizado.	2025-07-17 15:24:17.403-03	2025-07-17 15:24:17.403-03
5	Curso  de tiro 123	Aprenda os fundamentos de design de interfaces e experiência do usuário.	2025-07-16 18:58:38.752-03	2025-07-17 15:29:24.13-03
7	Design	Curso de design	2025-07-24 01:55:22.741-03	2025-07-24 01:55:22.741-03
8	Marketing	Curso de Marketing	2025-07-24 01:55:35.124-03	2025-07-24 01:55:35.124-03
9	Governância	Curso de Governância	2025-07-24 01:55:51.134-03	2025-07-24 01:55:51.134-03
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nome, email, password_hash, created_at, updated_at) FROM stdin;
2	Carlos Silva	carlos.silva@email.com	$2b$08$Dxj8dMn.zI8NmVsXJ3K.cexfRSxs06j5Sm0q7Dct3AuN0mB1T/5bW	2025-07-18 10:48:27.166-03	2025-07-18 10:48:27.166-03
3	Reginaldo	Reginaldojrgama@gmail.com	$2b$08$p81/KUqtYdMkaKCSACFXfeFwEZf6iICh1qRxiWbVq.w4u5EPWoTP6	2025-07-24 15:33:40.382-03	2025-07-24 15:33:40.382-03
\.


--
-- Name: alunos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.alunos_id_seq', 51, true);


--
-- Name: cursos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cursos_id_seq', 9, true);


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: aluno_curso aluno_curso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno_curso
    ADD CONSTRAINT aluno_curso_pkey PRIMARY KEY (aluno_id, curso_id);


--
-- Name: alunos alunos_cpf_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_cpf_key UNIQUE (cpf);


--
-- Name: alunos alunos_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_email_key UNIQUE (email);


--
-- Name: alunos alunos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alunos
    ADD CONSTRAINT alunos_pkey PRIMARY KEY (id);


--
-- Name: cursos cursos_nome_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT cursos_nome_key UNIQUE (nome);


--
-- Name: cursos cursos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cursos
    ADD CONSTRAINT cursos_pkey PRIMARY KEY (id);


--
-- Name: usuarios usuarios_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_email_key UNIQUE (email);


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: aluno_curso aluno_curso_aluno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno_curso
    ADD CONSTRAINT aluno_curso_aluno_id_fkey FOREIGN KEY (aluno_id) REFERENCES public.alunos(id) ON DELETE CASCADE;


--
-- Name: aluno_curso aluno_curso_curso_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aluno_curso
    ADD CONSTRAINT aluno_curso_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES public.cursos(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

