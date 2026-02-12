# Docker ELK + Nginx + Filebeat

Dockerized ELK stack with an Nginx reverse proxy in front of a small Express app.  
Nginx access/error logs are collected by Filebeat, parsed in Logstash, indexed into Elasticsearch, and visualized in Kibana.

## Architecture

Log flow:

`Nginx (/var/log/nginx/*.log) -> Filebeat -> Logstash (beats input :5044) -> Elasticsearch (index: weblogs-YYYY.MM.dd) -> Kibana`

Main services:

- `app`: Express app exposing `GET /` on port `3000`
- `nginx`: reverse proxy to `app:3000`, writes logs to mounted `./nginx/log`
- `filebeat`: tails `/var/log/nginx/*.log`, sends events to Logstash
- `logstash`: parses Nginx combined logs via `grok`, enriches with `geoip` and `useragent`
- `elasticsearch`: single-node cluster with security enabled
- `kibana`: UI for searching and visualizing indexed logs

## Versions

- ELK images (Elasticsearch, Logstash, Kibana): from `.env` `ELK_VERSION=7.3.1`
- Filebeat image: pinned to `7.3.2` in `filebeat/Dockerfile`

## Repository Layout

```text
.
├── app/
│   ├── Dockerfile
│   ├── package.json
│   └── src/index.js
├── elasticsearch/
│   ├── Dockerfile
│   └── config/elasticsearch.yml
├── filebeat/
│   ├── Dockerfile
│   └── config/filebeat.yml
├── kibana/
│   ├── Dockerfile
│   └── config/kibana.yml
├── logstash/
│   ├── Dockerfile
│   ├── config/logstash.yml
│   └── pipeline/nginx.conf
├── nginx/
│   ├── Dockerfile
│   ├── config/site.conf
│   └── log/
├── docker-compose.yml
└── .env
```

## Exposed Ports

- `80`: Nginx
- `443`: Nginx (mapped, no TLS config included by default)
- `3000`: Express app
- `5601`: Kibana
- `9200`: Elasticsearch HTTP API
- `9300`: Elasticsearch transport
- `5000`: Logstash TCP input (exposed)
- `9600`: Logstash monitoring API

## Quick Start

1. Start the stack:

```bash
docker compose up --build
```

2. Generate some Nginx traffic:

```bash
curl http://localhost/
```

3. Open Kibana:

`http://localhost:5601`

4. Log in with:

- Username: `elastic`
- Password: `changeme`

5. In Kibana, create a data view for:

`weblogs-*`

Use `@timestamp` as the time field.

## Useful Commands

Start in detached mode:

```bash
docker compose up -d --build
```

Check logs:

```bash
docker compose logs -f nginx filebeat logstash
```

Stop and remove containers:

```bash
docker compose down
```

Stop and also remove Elasticsearch volume:

```bash
docker compose down -v
```

## Notes

- Security is enabled with default credentials (`elastic/changeme`) intended for local development only.
- The `nginx/log` directory is bind-mounted and ignored by git (`.gitignore`).
- `document_type` in Logstash output is deprecated in newer Elasticsearch versions; this setup targets the pinned 7.x images.
