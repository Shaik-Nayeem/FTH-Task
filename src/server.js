var faker = require("faker");

let masterData = {
  ok: true,
  members: []
};

const generateMember = () => {
  let member = {};
  let dateObj = new Date();
  let year =
    dateObj.getFullYear().toString().length === 1
      ? "0" + dateObj.getFullYear()
      : dateObj.getFullYear();
  let month =
    (dateObj.getMonth() + 1).toString().length === 1
      ? "0" + (dateObj.getMonth() + 1)
      : dateObj.getMonth() + 1;
  let date =
    dateObj.getDate().toString().length === 1
      ? "0" + dateObj.getDate()
      : dateObj.getDate();

  let dateString = `${year}/${month}/${date}`;
  member["id"] = faker.internet.email();
  member["real_name"] = faker.name.findName();
  member["tz"] = faker.address.country() + "/" + faker.address.city();
  member["activity_periods"] = {
    [dateString]: [
      {
        start_time: getRandomTime(),
        end_time: getRandomTime()
      }
    ]
  };
  return member;
};

const getUserActivityHelper = (data, params) => {
  let { userId, date } = params;
  let users = masterData.members;
  let userActivity;
  users.forEach(async user => {
    if (userId === user.id) {
      let { activity_periods } = user;
      if (activity_periods[date]) {
        userActivity = [...activity_periods[date]];
      }
    }
  });
  return userActivity;
};

const getRandomTime = () => {
  let startHour = 0;
  let endHour = 23;
  let startMin = 0;
  let endMin = 59;

  var hour = (startHour + Math.random() * (endHour - startHour)) | 0;

  if (hour.toString().length === 1) {
    hour = "0" + hour;
  }
  var minutes = (startMin + Math.random() * (endMin - startMin)) | 0;
  if (minutes.toString().length === 1) {
    minutes = "0" + minutes;
  }
  return hour.toString() + ":" + minutes.toString();
};

const server = {
  get: (type, payload) => {
    if (type === "users") {
      return new Promise((resolve, reject) => {
        masterData = { ...masterData, members: [] };
        for (let i = 0; i < 20; i++) {
          let { members } = masterData;
          let newMembers = [...members, generateMember()];
          masterData = { ...masterData, members: newMembers };
        }
        console.log("master dat ", masterData);
        setTimeout(() => resolve(masterData.members), 1500);
      });
    } else if (type === "userActivity") {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!payload) {
            reject("Please provide user id and date");
          } else {
            let { userId, date } = payload;
            if (!userId || !date) {
              reject("Insufficient params to get userActivity");
            }
            let userActivity;
            let isUserAvailable = false;
            masterData.members.forEach(member => {
              if (member.id === userId) {
                isUserAvailable = true;
              }
            });
            if (isUserAvailable) {
              console.log("user available");
              let data = getUserActivityHelper(masterData, { userId, date });
              if (data) {
                userActivity = [...data];
              } else {
                //Force adding user activity if the user activity is not found for the date
                let newMasterData = server.post("addUserActivityToMasterData", {
                  ...payload
                });
                userActivity = getUserActivityHelper(newMasterData, {
                  userId,
                  date
                });
              }
            }

            if (!userActivity) {
              reject(`No data found on ${date} for ${userId}`);
            } else {
              resolve(userActivity);
            }
          }
        }, 1500);
      });
    } else {
      return new Promise((resolve, reject) => {
        reject("No route found in the server");
      });
    }
  },

  post: (type, payload) => {
    // Post request add the useractivity for the user on a selected date
    if (type === "addUserActivityToMasterData") {
      console.log("adding");
      alert('Event added!')
      let { userId, date } = payload;
      let { members } = masterData;
      let modifiedMembers = members.map(member => {
        if (member.id === userId) {
          let { activity_periods } = member;
          if (!activity_periods[date]) {
            let temp = {};
            temp[date] = [];
            let randomIntTill5 = Math.floor(Math.random() * Math.floor(5));
            let loginsCount = randomIntTill5 > 0 ? randomIntTill5 : 1;
            for (let i = 0; i < loginsCount; i++) {
              temp[date].push({
                start_time: getRandomTime(),
                end_time: getRandomTime()
              });
            }

            activity_periods = { ...activity_periods, ...temp };
            return { ...member, activity_periods };
          }
          return member;
        } else {
          return member;
        }
      });
      masterData = { ...masterData, members: [...modifiedMembers] };
      return masterData;
    }
  }
};

export { masterData, server };
