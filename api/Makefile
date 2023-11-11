.PHONY: dev
dev:
	# python3 -m poetry run uvicorn main:app --host 0.0.0.0 --reload
	python3 -m poetry run uvicorn main:app --reload

.PHONY: add
add:
	python3 -m poetry add $(PKG)

.PHONY: migrate
migrate:
	python3 -m poetry run python -m migrate_db

.PHONY: requirements
requirements:
	python3 -m poetry export -f requirements.txt -o requirements.txt

.PHONY: build
build:
	tar -cJh . | docker build -t apps/sample/api:latest -

.PHONY: push
push:
	docker tag apps/sample/api 418440285537.dkr.ecr.ap-northeast-1.amazonaws.com/apps/sample/api
	aws ecr get-login-password --region ap-northeast-1 | docker login --username AWS --password-stdin 418440285537.dkr.ecr.ap-northeast-1.amazonaws.com
	docker push 418440285537.dkr.ecr.ap-northeast-1.amazonaws.com/apps/sample/api

