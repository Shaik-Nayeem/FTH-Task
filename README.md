
### `Data Extrapolation`

For Date Extraploation I have used faker to generate random values.

## MOCK API:
### Service.js
- Uses faker.
- which generates random username,id,location ,time_range activity and can add event of user for particular day if not found. 
- Server method has two methods
      1) GET 
          -  If we hit server method as get it will provides lists of users.
          -  To check user availability send payload with UserId and Date.
      2) POST
          - If user doesn't have events(activity) for selected date. It will add new events for that user        

## Components:
### UserLists.js(Parent)
  1)This component makes async ajax call with lifecycle method to fetch all users and passes to  child components.

### UserInfo.js(Child):
  1) It will collect users data from parent component by props
  2) Visualization of all users in list-view with onclick event binding to show modal with user activity events.

### Modal.js(Child):

 1) This component shows user activity like login and logout for the date.
 2) Calender is imported to show the user activuty for selected date. If user activity is found for the selected date, It will creates
    new events for that user.



