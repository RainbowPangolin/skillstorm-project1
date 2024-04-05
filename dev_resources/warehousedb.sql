--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    itemid integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    quantity integer
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: items_itemid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_itemid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.items_itemid_seq OWNER TO postgres;

--
-- Name: items_itemid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_itemid_seq OWNED BY public.items.itemid;


--
-- Name: warehouses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.warehouses (
    warehouseid bigint NOT NULL,
    name character varying(100) NOT NULL,
    location character varying(100) NOT NULL,
    description text,
    capacity integer NOT NULL
);


ALTER TABLE public.warehouses OWNER TO postgres;

--
-- Name: warehouses_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.warehouses_items (
    warehouseid integer NOT NULL,
    itemid integer NOT NULL,
    quantity integer,
    id bigint NOT NULL
);


ALTER TABLE public.warehouses_items OWNER TO postgres;

--
-- Name: warehouses_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.warehouses_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.warehouses_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: warehouses_warehouseid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.warehouses_warehouseid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.warehouses_warehouseid_seq OWNER TO postgres;

--
-- Name: warehouses_warehouseid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.warehouses_warehouseid_seq OWNED BY public.warehouses.warehouseid;


--
-- Name: items itemid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN itemid SET DEFAULT nextval('public.items_itemid_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (itemid, name, description, quantity) FROM stdin;
\.


--
-- Data for Name: warehouses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.warehouses (warehouseid, name, location, description, capacity) FROM stdin;
\.


--
-- Data for Name: warehouses_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.warehouses_items (warehouseid, itemid, quantity, id) FROM stdin;
\.


--
-- Name: items_itemid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_itemid_seq', 1, true);


--
-- Name: warehouses_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.warehouses_items_id_seq', 537, true);


--
-- Name: warehouses_warehouseid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.warehouses_warehouseid_seq', 8, true);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (itemid);


--
-- Name: warehouses_items warehouses_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouses_items
    ADD CONSTRAINT warehouses_items_pkey PRIMARY KEY (warehouseid, itemid);


--
-- Name: warehouses warehouses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouses
    ADD CONSTRAINT warehouses_pkey PRIMARY KEY (warehouseid);


--
-- Name: warehouses_items warehouses_items_itemid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouses_items
    ADD CONSTRAINT warehouses_items_itemid_fkey FOREIGN KEY (itemid) REFERENCES public.items(itemid);


--
-- Name: warehouses_items warehouses_items_warehouseid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.warehouses_items
    ADD CONSTRAINT warehouses_items_warehouseid_fkey FOREIGN KEY (warehouseid) REFERENCES public.warehouses(warehouseid);


--
-- PostgreSQL database dump complete
--

