const signup = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate role
  const allowedRoles = ["Director", "Producer", "Accountant"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role selected" });
  }
  let userExists;

  try {
    // Check if user already exists
    userExists = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
  } catch (error) {
    throw new error();
  }
  if (userExists.rows.length > 0) {
    return res.status(400).json({ error: "Email already in use" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Insert new user
  const newUser = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role",
    [name, email, hashedPassword, role]
  );

  // Generate JWT token
  const token = jwt.sign(
    { userId: newUser.rows[0].id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ success: true, user: newUser.rows[0], token });
};

module.exports = signup;
