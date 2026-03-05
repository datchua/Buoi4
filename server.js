const express = require("express");
const app = express();

app.use(express.json());

let dataRole = [
  {
    id: "r1",
    name: "Quản trị viên",
    description: "Toàn quyền quản lý hệ thống",
    creationAt: "2026-03-04T08:00:00.000Z",
    updatedAt: "2026-03-04T08:00:00.000Z"
  },
  {
    id: "r2",
    name: "Biên tập viên",
    description: "Quản lý nội dung và dữ liệu",
    creationAt: "2026-03-04T08:00:00.000Z",
    updatedAt: "2026-03-04T08:00:00.000Z"
  }
];

let dataUser = [
  {
    username: "nguyenvana",
    password: "123456",
    email: "vana@gmail.com",
    fullName: "Nguyễn Văn A",
    avatarUrl: "https://i.sstatic.net/l60Hf.png",
    status: true,
    loginCount: 15,
    role: {
      id: "r1",
      name: "Quản trị viên",
      description: "Toàn quyền quản lý hệ thống"
    }
  }
];


// ================= ROLE CRUD =================

// GET all roles
app.get("/roles", (req, res) => {
  res.json(dataRole);
});

// GET role by id
app.get("/roles/:id", (req, res) => {
  const role = dataRole.find(r => r.id === req.params.id);
  res.json(role);
});

// POST create role
app.post("/roles", (req, res) => {

  const newRole = {
    id: "r" + (dataRole.length + 1),
    name: req.body.name,
    description: req.body.description,
    creationAt: new Date(),
    updatedAt: new Date()
  };

  dataRole.push(newRole);

  res.status(201).json(newRole);
});

// PUT update role
app.put("/roles/:id", (req, res) => {

  const role = dataRole.find(r => r.id === req.params.id);

  if (!role) return res.status(404).json("Role not found");

  role.name = req.body.name;
  role.description = req.body.description;
  role.updatedAt = new Date();

  res.json(role);
});

// DELETE role
app.delete("/roles/:id", (req, res) => {

  dataRole = dataRole.filter(r => r.id !== req.params.id);

  res.json({ message: "Deleted" });
});



// ================= USER CRUD =================

// GET all users
app.get("/users", (req, res) => {
  res.json(dataUser);
});

// GET user by username
app.get("/users/:username", (req, res) => {

  const user = dataUser.find(u => u.username === req.params.username);

  res.json(user);
});

// POST create user
app.post("/users", (req, res) => {

  const role = dataRole.find(r => r.id === req.body.roleId);

  const newUser = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    avatarUrl: req.body.avatarUrl,
    status: true,
    loginCount: 0,
    role: role,
    creationAt: new Date(),
    updatedAt: new Date()
  };

  dataUser.push(newUser);

  res.status(201).json(newUser);
});

// PUT update user
app.put("/users/:username", (req, res) => {

  const user = dataUser.find(u => u.username === req.params.username);

  if (!user) return res.status(404).json("User not found");

  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.updatedAt = new Date();

  res.json(user);
});

// DELETE user
app.delete("/users/:username", (req, res) => {

  dataUser = dataUser.filter(u => u.username !== req.params.username);

  res.json({ message: "Deleted" });
});



// ================= EXTRA API =================

// GET users by role
app.get("/roles/:id/users", (req, res) => {

  const users = dataUser.filter(u => u.role.id === req.params.id);

  res.json(users);
});



app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});