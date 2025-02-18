// index.js

const express = require("express");
const app = express();
const port = 3000;

// Използваме масив за съхранение на "потребителите"
let users = [
  { id: 1, name: "Иван", age: 25 },
  { id: 2, name: "Мария", age: 30 },
];

app.use(express.json());

// 1. GET /users -> връща списъка с потребители
app.get("/users", (req, res) => {
  res.json(users);
});

// 2. GET /users/:id -> връща конкретен потребител по ID
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: "Потребителят не е намерен" });
  }

  res.json(user);
});

// 3. POST /users -> създава нов потребител
app.post("/users", (req, res) => {
  const { name, age } = req.body;
  const newUser = {
    id: users.length + 1, // прост пример, не е оптимално решение
    name,
    age,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// 4. PUT /users/:id -> обновява потребител
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, age } = req.body;

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "Потребителят не е намерен" });
  }

  users[userIndex] = { ...users[userIndex], name, age };
  res.json(users[userIndex]);
});

// 5. DELETE /users/:id -> изтрива потребител
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: "Потребителят не е намерен" });
  }

  // Изтриваме потребителя от масива
  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser[0]);
});

// Старт на сървъра
app.listen(port, () => {
  console.log(`Сървърът слуша на http://localhost:${port}`);
});
