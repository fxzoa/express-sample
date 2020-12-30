FROM alpine

RUN apk update && \
    apk add --no-cache bash && \
    apk add --no-cache nodejs && \
    apk add --no-cache npm 


