sequenceDiagram
participant browser
participant server

    Note left of browser: user makes new note and click save button

    browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note

    Note over server: server add new note to the notes page

    server-->browser: HTML status code 302 (URL redirect)
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->browser: HTML-code
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->browser: main.css
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->browser: main.js

    Note over browser: browser starts executing js-code that requests JSON data from server

    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->browser: JSON file content: [{content: "cryofrain",date: "2021-06-01T21:12:02.363Z"}, ...]
    browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
    server-->browser: favicon.ico

    Note over browser: browser executes the event handler that renders notes to display
