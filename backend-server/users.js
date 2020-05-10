const users = [];

const addUser = async ({ id, name, room }) => {
  console.log(id, name, room, '>>>>>>>>>>>>>>>>>>>>>')
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  // if(!name || !room) return { error: 'Username and room are required.' };
  if(!name) return { error: 'Username required.' };

  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = async (room) => users.filter((user) => user.room === room);

const getAllRoom = async () => [...new Set(users.map((user) => user.room))]

const getFreeRoom = async () => {
          let AllRoom = await getAllRoom();
          if(AllRoom.length===0){
            return [];
          } else {
            let newFilter = [];
            let lengths =AllRoom.length;
            for(let i = 0;i< lengths ; i++) {
              let data = await getUsersInRoom(AllRoom[i]);
              if(data.length < 2) {
                newFilter.push(AllRoom[i])
              }
            }
            return newFilter;
            
          }

}

const createNewRoom = async () => {
  return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getAllRoom, getFreeRoom, createNewRoom };