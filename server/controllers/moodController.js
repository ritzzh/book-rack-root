const { Mood, BASIC_MOODS } = require("../models/Mood");

module.exports = (io, socket) => {
  socket.on("joinMoodRoom", async ({ user1, user2 }) => {
    const roomID = [user1, user2].sort().join("_&_");
    socket.join(roomID);
    console.log(`${socket.id} named ${user1} joined mood room: ${roomID}`);

    try { 
      const now = new Date();
      const nowDate = now.toDateString().split(" ");

      const userMood = await Mood.findOne({ username: user1, month: nowDate[1]});
      const partnerMood = await Mood.findOne({ username: user2, month: nowDate[1] });
      
      if (userMood && userMood?.currentMood?.setOn) {
        userMood.currentMood.duration = Math.floor((now - new Date(userMood.currentMood.setOn)) / 60000); // Convert to minutes
        await userMood.save();
      }

      if (partnerMood && partnerMood?.currentMood?.setOn) {
        partnerMood.currentMood.duration = Math.floor((now - new Date(partnerMood.currentMood.setOn)) / 60000); // Convert to minutes
        await partnerMood.save();
      }

      socket.emit("lastMood", {
        room: roomID,
        userMood: userMood ? userMood.moodHistory[0]: null,
        partnerMood: partnerMood ? partnerMood.moodHistory[0]: null,
      });

    } catch (error) {
      console.error("Error fetching moods:", error);
      socket.emit("moodError", { message: "Error joining mood room" });
    }
  });

  // Update Mood
  socket.on("updateMood", async ({ room, username, mood, description}) => {
    try {
      if (!BASIC_MOODS.includes(mood)) {
        return socket.emit("moodError", { message: "Invalid mood category" });
      }
      const now = new Date();
      const nowDate = now.toDateString().split(" ");
  
      let userMood = await Mood.findOne({ username: username, month: nowDate[1], year: nowDate[3]});
  
      if (!userMood) {
          userMood = new Mood({
          username: username,
          month: nowDate[1],
          year: nowDate[3],
          moodHistory: [
            {
              username: username,
              mood: mood,
              description: description || null,
              setOn: new Date(),
              duration: 0,
            },
          ],
        });
      } else {

        const currentMood  = userMood.moodHistory[0];
        if (currentMood.setOn) {
          currentMood.changedOn = now;
          currentMood.duration = Math.floor((now - new Date(currentMood.setOn)) / 60000); // Convert to minutes
        }
  
        userMood.moodHistory.unshift({
          username: username,
          mood: mood,
          description: description,
          setOn: now,
          duration: 0,
        });
      }
  
      await userMood.save();
  
      io.to(room).emit("moodUpdated", {
        username,
        currentMood: userMood.moodHistory[0],
      });
      
    } catch (error) {
      console.error(error);
      socket.emit("moodError", {
        message: "Error updating mood",
        error: error.message,
      });
    }
  });

  socket.on("getMoodHistory", async ({ username, partner }) => {
    try {
      const now = new Date();
      const nowDate = now.toDateString().split(" ");
      const currentMonth = nowDate[1];
      const currentYear = nowDate[3];

      const [userMood, partnerMood] = await Promise.all([
        Mood.findOne({ username: username, month: currentMonth, year: currentYear }),
        Mood.findOne({ username: partner, month: currentMonth, year: currentYear }),
      ]);
  
      if (!userMood && !partnerMood) {
        return socket.emit("moodError", { message: "Neither user nor partner found" });
      }
  
      const userChanges = userMood ? userMood.moodHistory : [];
      const partnerChanges = partnerMood ? partnerMood.moodHistory : [];
      const combinedChanges = [...userChanges, ...partnerChanges];
  
      // Sort changes by date first, then by time
      combinedChanges.sort((a, b) => {
        const dateDiff = new Date(b.date) - new Date(a.date); // Sort by date (descending)
        if (dateDiff === 0) {
          return new Date(b.setOn) - new Date(a.setOn); // If same date, sort by time (descending)
        }
        return dateDiff;
      });
  
      // Emit the sorted mood history
      socket.emit("moodHistory", {
        message: "Mood history fetched successfully",
        combinedHistory: combinedChanges,
      });
    } catch (error) {
      console.error("Error fetching mood history:", error);
      socket.emit("moodError", {
        message: "Error fetching mood history",
        error: error.message,
      });
    }
  });


  // Get Current Mood
  socket.on("getCurrentMood", async ({ username }) => {
    try {
      const now = new Date();
      const nowDate = now.toDateString().split(" ");
      const userMood = await Mood.findOne({ username: username, month: nowDate[1], year: nowDate[3] });

      if (!userMood) {
        return socket.emit("moodError", { message: "User not found" });
      }

      socket.emit("currentMood", { currentMood: userMood.currentMood });
    } catch (error) {
      console.error(error);
      socket.emit("moodError", {
        message: "Error fetching current mood",
        error: error.message,
      });
    }
  });
};
