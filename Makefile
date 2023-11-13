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

.PHONY: migrate
migrate:
	npx prisma db push
	npx prisma generate

.PHONY: restart_app
restart_app:
	docker compose restart app

.PHONY: seed
seed:
	npx prisma db seed -- --reset

.PHONY: studio
studio:
	npx prisma studio

.PHONY: generate
generate:
	MSYS_NO_PATHCONV=1 docker run --rm \
	-v "${PWD}:/local" openapitools/openapi-generator-cli generate \
	-i /local/openapi.json \
	-g typescript-fetch \
	-o /local/src/lib/openapi/
