# Rover Navigation System

This application simulates rover navigation in a grid.

## Description

- A squad of robotic rovers will be traversing through a rectangular grid.
- Position of the rover is combination of X and Y coordinates and a letter representing one of the four cardinal compass points (i.e. N, S, E, W).
  - Ex: 0 0 N - rover is in the bottom left corner and facing North
- Control signals to navigate the rovers are 'L', 'R' and 'M'.
  - 'L' and 'R' makes the rover spin 90 degrees left or right, respectively, without moving from its current spot.
  - 'M' means move forward one grid point and maintain the same heading.
- Input
  - Upper-right coordinates of the grid, assuming that the lower-left coordinates are 0,0.
  - Each rover has two lines of input. The first line gives the rover's position, and the second line is a series of instructions telling the rover how to explore the plateau.
- Output
  - The output for each rover will be its final coordinates and heading.
- Each rover will be finished sequentially, which means that the second rover won't start to move until the first one has finished moving.

## Assumptions

- Only one rover will be in a single coordinate, NASA would avoid any conflicts.
- A rover can't move outside the grid boundaries.
- Each rover will be finished sequentially, no concurrent navigation.

## Code Explanation

MVC architecure has been used and find below explanation for the structure of the project.

- routes - Handle the API endpoints. It simplifies the routing process by connecting incoming requests to appropriate controller methods.
- controllers - Handle incoming HTTP requests and manage the client and application interaction to determine the appropriate response.
- services - Keep the core business logic with validations.
- models - Data structure, which represents how the data is stored.
- errors - Handle errors with custom error classes.
- utils - Store reusable logic and handle custom logging functionality.
- .env - Store Environmental variables.

### REST API

#### Add Grid

Request

    POST /api/grid HTTP/1.1
    Content-Type: application/json
    Accept: application/json

    {
        "xCoordinate": "5",
        "yCoordinate": "5"
    }

Response

    HTTP/1.1 201 Created
    {
        "message": "Successfully Created"
    }

#### Add Rover

Request

    POST /api/rover HTTP/1.1
    Content-Type: application/json
    Accept: application/json

    {
        "xCoordinate": "1",
        "yCoordinate": "2",
        "direction" : "N"
    }

Response

    HTTP/1.1 201 Created

    {
        "roverID": 15,
        "xCoordinate": 1,
        "yCoordinate": 2,
        "direction": "N"
    }

#### Navigate Rover

Request

    PUT /api/rover HTTP/1.1
    Content-Type: application/json
    Accept: application/json

    {
        "command" : "LMLMLMLMM",
        "roverId" : "15"
    }

Response

    HTTP/1.1 200 OK
    {
        "roverID": 15,
        "xCoordinate": 1,
        "yCoordinate": 3,
        "direction": "N"
    }

#### Get Rover Position

Request

    GET /api/rover/15 HTTP/1.1
    Content-Type: application/json
    Accept: application/json

Response

    HTTP/1.1 200 OK

    {
        "roverID": 15,
        "xCoordinate": 1,
        "yCoordinate": 3,
        "direction": "N"
    }

#### Error Responses

    HTTP/1.1 400 BAD_REQUEST

    {"status":"BAD_REQUEST","message":"Invalid X coordinate in the grid."}
    {"status":"BAD_REQUEST","message":"Invalid Y coordinate in the grid."}
    {"status":"BAD_REQUEST","message": "X and Y coordinates must be integers."}
    {"status":"BAD_REQUEST","message": "A valid direction (N,S,E,W) must be provided."}
    {"status":"BAD_REQUEST","message": "Grid is not initialized."}
    {"status":"BAD_REQUEST","message": "The rover X position must be inside the grid borders."}
    {"status":"BAD_REQUEST","message": "The rover Y position must be inside the grid borders."}
    {"status":"BAD_REQUEST","message": "X and Y coordinate must be bigger or equal to 0."}
    {"status":"BAD_REQUEST","message": "Valid navigation commands must be provided."}

    HTTP/1.1 404 NOT_FOUND

    {"status":"NOT_FOUND","message": "No existing rover with ID 15"}

## Run Application

1.  Compile the source code

         npm install

2.  Run all the tests

         npm test

3.  Run the application

        npm start

4.  Use the postman collection in "rover-navigation.postman_collection.json" to invoke the REST API endpoints.
