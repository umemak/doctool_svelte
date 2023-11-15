.PHONY: up
up:
	docker compose up -d --remove-orphans
	# "$(MAKE)" migrate
	# "$(MAKE)" seed
	# "$(MAKE)" app

.PHONY: down
down:
	docker compose down --volumes --remove-orphans

.PHONY: app
app:
	npm run dev

.PHONY: api
api:
	"$(MAKE)" -C ./api dev

.PHONY: restart_app
restart_app:
	docker compose restart app

.PHONY: generate
generate:
	curl http://localhost:8000/openapi.json -o openapi.json
	rm -rf src/lib/openapi
	MSYS_NO_PATHCONV=1 docker run --rm \
	-v "${PWD}:/local" openapitools/openapi-generator-cli generate \
	-i /local/openapi.json \
	-g typescript-fetch \
	-o /local/src/lib/openapi/

.PHONY: migrate
migrate:
	"$(MAKE)" -C ./api migrate
