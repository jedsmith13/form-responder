# form-responder
A simple NodeJS web server that takes the form information and responds with it. This was built for my TVCC CS195 Web Development class.

## Getting started
You can look at `sample.html` to see an example.

The main thing is that you need to set your form action correctly it should point to `http://form195.herokuapp.com/` if you want to use the publically available one or `http://localhost:3000` if you are running it on your own server.

There are several "special" field names which will do more than just return the fields and their values.

They are:

```
name
color
tag
image
border-style
```