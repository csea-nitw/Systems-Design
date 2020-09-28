FROM python:3.8.6-slim-buster
LABEL maintainer="marcello.desales@gmail.com"

# http://click.palletsprojects.com/en/5.x/python3/#python-3-surrogate-handling
#ENV LC_ALL=en_US.utf8
ENV LANG=en_US.utf8

# https://github.com/kragniz/python-etcd3/blob/master/Dockerfile#L3-L6
# https://stackoverflow.com/questions/57599354/python-not-able-to-connect-to-grpc-channel-failed-to-connect-to-all-addresse/57868784#57868784
# https://github.com/grpc/grpc/issues/9987
# ARG HTTP_PROXY
# ARG http_proxy
# ARG HTTPS_PROXY
# ARG https_proxy

# Utilities for debugging
#RUN apt-get update && apt-get install -y curl dnsutils iputils-ping

WORKDIR /app

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY leader_election.py .

#ENTRYPOINT ["python", "/app/leader_election.py"]
CMD ["python"]
