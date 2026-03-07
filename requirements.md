Project Instructions
To complete this project, follow the instructions below. If you get stuck, ask a question on Slack or in the Treehouse Community.
 4 steps
•	Create Your JavaScript File
Create a folder named js and inside, create your scripts.js file. Don't forget to link it to your HTML!
•	Get and Display 12 Random Users
With the information provided from The Random User Generator API, send a single request to the API.
1.	Use the response data to display 12 users, along with some basic information for each:
o	Image
o	First and Last Name
o	Email
o	City or location
2.	Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
NOTE: When adding or concatenating to the DOM, avoid doing this: element.innerHTML += 'HTML string'. That technique rewrites the entire DOM. This is problematic because any rewritten elements won't retain any event listeners that were attached to the DOM before the rewrite occurs. Use this method instead: element.insertAdjacentHTML('beforeend', 'HTML string'). That technique will allow you to add strings of HTML to the DOM without disrupting what already exists in the DOM.
•	Create a Modal Window
1.	When any part of an employee item in the directory is clicked, a modal window should pop up with the following details displayed:
o	Image
o	Name
o	Email
o	City or location
o	Cell Number
o	Detailed Address, including street name and number, state or country, and postcode.
o	Birthday
2.	Make sure there’s a way to close the modal window
3.	Refer to the mockups and the comments in the index.html file for an example of what info should be displayed on the page and how it should be styled.
•	Finishing the Project
The final stage of the project is perhaps the most important. This is where your developer skills really shine as you carefully double-check that you've accomplished all requirements and that your project is ready for submission.
1.	Code comments - It’s a best practice for development code to be well commented. Replace provided comments with your own to briefly describe your code.
2.	Code readability - Readability is second only to functionality. Double-check your code to ensure the spacing and indentation are consistent.
3.	Quality Assurance Testing - This is the keystone step in the development process.

o	Open and run your app.
o	Open the Chrome DevTools console.
o	Pretend to be a user and test all aspects of functionality and every possible state of the app, while monitoring the console for bugs and resolving any that arise.
________________________________________
Pro Tip
Before submitting your project it's always a good idea to get an additional pair of eyes on it. This will avoid your project from being returned to you if you missed one of the requirements. You can share a link to your GitHub repository in the #review-my-project channel on Slack and a fellow student or staff member will happily have a look at it.
Extra Credit
To get an "exceeds" rating, complete all of the steps below:
 3 steps
•	Add Search Functionality
Add a way to filter the directory by name.
o	You’ll need to adjust your API request to retrieve a user nationality that will only return data in the English alphabet.
o	Example markup for this feature is included in the HTML comments.
NOTE: Your search feature should filter results that are already on the page. So don't request new info from the API for your search.
•	Add Modal Toggle Functionality
Add a way to toggle back and forth between employees when the modal window is open.
o	There should be no errors once the end or beginning of the list is reached.
o	Example markup for this feature is included in the HTML comments.
•	Make It Your Own
Add some custom styling to personalize it and make it stand out.
1.	Add or change at least one of the following CSS styles:
o	color
o	background color
o	font
o	box or text shadows
2.	Document your style changes in your README.md file and the project submission notes.
o	Do not alter the layout or position of the important elements on the page.
________________________________________
•	NOTE: Getting an "Exceed Expectations" grade.
o	See the rubric in the "How You'll Be Graded" tab above for details on what you need to receive an "Exceed Expectations" grade.
o	Passing grades are final. If you try for the "Exceeds Expectations" grade, but miss an item and receive a “Meets Expectations” grade, you won’t get a second chance. Exceptions can be made for items that have been misgraded in review.
o	Always mention in the comments of your submission or any resubmission, what grade you are going for. Some students want their project to be rejected if they do not meet all Exceeds Expectations Requirements, others will try for all the "exceeds" requirement but do not mind if they pass with a Meets Expectations grade. Leaving a comment in your submission will help the reviewer understand which grade you are specifically going for

