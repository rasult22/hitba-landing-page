FROM nginx:alpine

RUN apk --no-cache update && apk --no-cache upgrade && apk add --no-cache ca-certificates tzdata curl

COPY nginx.conf /etc/nginx/nginx.conf

COPY --chown=nginx:nginx . /www/site

HEALTHCHECK --start-period=3s --interval=5s --timeout=2s --retries=2 CMD curl -f http://localhost || false
