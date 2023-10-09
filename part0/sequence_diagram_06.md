sequenceDiagram
participant browser
participant server

    Note left of browser: user makes new note and click save button

    Note over browser: update DOM with new note

    Note over browser: convert new note to JSON

    browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa

    Note over server: server add new note to the notes page

    server-->browser: HTML status code 201 (Created) & JSON content [{content: "cryofrain",date: "2021-06-01T21:12:02.363Z"}, ...]
