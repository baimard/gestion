# docker build . -t juxo/sphinx
# in your Dockerfile
FROM sphinxdoc/sphinx

WORKDIR /docs
ADD requirements.txt /docs
RUN pip3 install -r requirements.txt
RUN apt update ; apt install -y latexmk texlive-latex-extra