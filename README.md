


### `Data Extrapolation`

For Date Extraploation I have used faker to populate essential data

###Service.js
Uses faker. which generates random username,id,location ,time_range activity and can add event of user for particular day if not found. 

###UserLists.js

1)Parent component where all child components arewrapped.
2)Component to fetch all the users with related info by making async ajax call.

###UserInfo.js
1)Visualiztion of user's with events using antd library

###Modal.js

1) Particular user-list data with user activity during thar period
2)Calender event for checking user activity on various dates{ if event not found for particular day it will be added to userlists with respectice dates}



