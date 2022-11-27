.PHONY: *

dev:
	docker compose up

pretty:
	npx prettier --write .
