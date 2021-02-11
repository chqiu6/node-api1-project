// BUILD YOUR SERVER HERE
// | POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// | GET    | /api/users     | Returns an array users.                                                                                |
// | GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// | DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// | PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

const express = require("express");
const model = require("./users/model");

const server = express();

//middleware install
server.use(express.json());

//check home
server.get("/", (req, res) => {
    res.json({message : "Are we live? "});
})

//return array users
server.get("/api/users", (req, res) => {
    const users = model.find();
    console.log("get users res :", users);
    res.json(users);
})

//return user object with id 
server.get("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = model.findById(id);
    if(user){
        console.log(user);
        res.json(user);
    }else {
        res.status(404).json({
            message : "get request by id failed",
        });
    };
})

//create user using info sent from req body
server.post("/api/users", (req, res) => {
    const newUser = model.insert({
        name : req.body.name,
        bio : req.body.bio,
    });
    res.status(201).json(newUser);
    console.log(newUser);
})

//updates user with id using data from req body. return updated array
server.put("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = model.findById(id);
    
    model.update(id)
})

//removes user with id n returns deleted user
server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;
    const user = model.findById(id);

    if(user) {
        model.remove(id);
        //204 is status code for successful empty response
        res.status(204).end();
    } else {
        res.status(404).json({
            message : "user not found",
        });
    }
    // model.remove(id)
    // .then(res =>{
    //     console.log("we've successful deleted", res);
    // })
    // .catch(err => {
    //     console.log("mission failed ! we'll get em next time", err);
    // });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
