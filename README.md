---Project Title and Description:
#Event planner app
Where we can create an event, view an event, event listing based on upcoming and past events and filters, delete an event, update an event. Also we can bookmark our favrite event and also the toggle

---Technologies Used:
React.js Library Tailwindcss, @vite, react-dom-router, react-lucide,react-datepicker,typescript,JSON-server api

---Features:
Create event
Update event
delete event
filter Events based on category,text and date
Upcoming and Past event listings
Theme toggling
Bookmark favroite events

---Installation and Setup:
Cloning the repository.(https://github.com/pooved/rsspl-event-planner-app.git)
Installing dependencies (e.g., npm install ).
Running the development server (e.g., npm run dev).
API:
Used: json-server online API.

To RUN: "json-server --watch db.json --port 8000"
----Usage:

How to use the Web APP:

click on "create event" link in header, Then fill the form, upload any image.
P.S On submission Temporary Image URL is getting saved, so when you will refresh the app url or open again after some time image will get disappear.

After form submission, it will take you to the Homepage with the latest and upcoming event listed in grid form.

To view detail about event click on "read more", it will take you to the details page, where you can edit and delete the event. Icon are provided for the same.

To Toggle the theme in header there is sun and moon icon which on click theme color will get changed.

To filter events use filter icon. Also pagination is provided to move to next page. Per page 6 events can be viwed.
