.PHONY: up
up:
	docker compose up -d --remove-orphans
	"$(MAKE)" migrate
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
