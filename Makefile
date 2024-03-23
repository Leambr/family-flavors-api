DOCKER_COMPOSE = docker-compose
NPM = npm

.PHONY: start
start: 
	${DOCKER_COMPOSE} up -d --remove-orphans

.PHONY: stop
stop: 
	${DOCKER_COMPOSE} down

.PHONY: lint
lint:
	$(NPM) run lint

.PHONY: lint-fix
lint-fix:
	$(NPM) run lint --fix