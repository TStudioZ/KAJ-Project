# KAJ-Project
This is the final project for the Client applications in JavaScript course.
It only implements the front-end part of the app, even though there is a mocking API.

## Goal of the project
The goal of this project is to create a sample activities tracking app.
There is a user profile with some basic biological data.
The user has the ability to add/edit activities and display them in a list. Some basic stats are available as well.

## Technologies
The is implemented using the React JavaScript library.
The mocking API in [SportsTrackerAPI](src/SportsTrackerAPI.js) simulates a delay by returning Promises after some timeout.
These Promises are then used in the React Components for retrieving the mock data. When the data is being loaded/saved, an appropriate message is displayed to the user.

## Implemented functionality

### Canvas
The [AnimatedRunner](src/AnimatedRunner.js) component uses a  `<canvas>` and JavaScript to draw an animated image consisting of several frames.

### Forms, validation
All input fields are being properly validated. If there is a validation error, a message below the field is displayed and the field is highlited. There are several components for different inputs that are used by child components of [ValidatingForm](src/components/ValidatingForm.js). [EditableField](src/components/EditableField.js) consists of an edit button next to a label that changes to an input only after clicking the edit button.

### CSS selectors
The app uses advanced CSS selectors, see [index.css](src/index.css).

### Vendor prefixes
CSS vendor prefixes are automatically handled by the React library.

### CSS transformations

### CSS transitions/animations
There are CSS animations used on the Home section of the app, see [index.css](src/index.css) and [MainContent](src/MainContent.js).
A transition for changing the color of a button is implemented as well.

### Media queries
The [index.css](src/index.css) contains media queries that ensure the app is correctly displayed on narrow screens. The space around some content is removed when the app is being displayed on a screen with a certain max-width.

### OOP, inheritance
React Components are used in the project.

### JavaScript library
The app is implemented using the React library.

### Advanced JavaScript APIs


### History
The user can navigate back and forth in history. The app uses `HashRouter` from the React library to accomplish this.

### Media API


### Offline


### Using SVG in JavaScript


