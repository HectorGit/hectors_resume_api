e = module.exports;

e.createFriend = `insert into friends (first_name, last_name, age , added) values($1,$2,$3,$4) `;
e.readFriend = `select * from friends where first_name = $1`;
e.readAllFriends = `select * from friends`
e.updateFriend = `update friends set age = $2 where first_name = $1`;
e.deleteFriend = `delete from friends where first_name = $1`;