# Elastic stack (ELK) + Filebeat for Monitoring Nginx on Docker

This is extended version from [ELK on Docker](https://github.com/deviantony/docker-elk) with Filebeat plugin. Filebeat takes in charge of streaming log file from nginx to Logstash then processing it and visualize to Kibana.

## What 's insides 

```
├── app
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   └── index.js
│   └── yarn.lock
├── elasticsearch
│   ├── config
│   │   └── elasticsearch.yml
│   └── Dockerfile
├── filebeat
│   ├── config
│   │   └── filebeat.yml
│   └── Dockerfile
├── kibana
│   ├── config
│   │   └── kibana.yml
│   └── Dockerfile
├── logstash
│   ├── config
│   │   └── logstash.yml
│   ├── Dockerfile
│   └── pipeline
│       └── nginx.conf
├── nginx
│   ├── config
│   │   └── site.conf
│   ├── Dockerfile
│   └── log
│       ├── access.log
│       └── error.log
├── docker-compose.yml
├── LICENSE
└── README.md
```

- App: minimal simple Express app
- Nginx: web server for app.
- Elasticsearch: containing build image and configure for Elasticsearch
- Filebeat: containing build image and configure for Filebeat to streaming log of Nginx to Logstash
- Logstash: containing build image and configure pipeline for Logstash to process sent log file from Filebeat
- Kibana: containing build image and configure for Kibana to visualize data

## Getting Started

To run this stack, run the following command
```bash
docker-compose up
```
Then go to `http://localhost:5601` to see your data in Kibana

Default Kibana user information
- Username: elastic
- Password: changeme
