const getUsers = (req, res) => {
    res.status(200).json({ message: 'Get all users' });
  };
  
  const createUser = (req, res) => {
    res.status(201).json({ message: 'Create a user' });
  };
  
  module.exports = { getUsers, createUser };
  