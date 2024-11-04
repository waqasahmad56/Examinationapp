import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
process.env.JWT_SECRET="hfthftjygjhukhukhukyuk";


export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, email, password: hashedPassword });
    const savedUser=await user.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
     
    // res.status(201).send('User created');
  } catch (err) {
    res.status(400).send(err.message);
  }
};
  
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
  res.status(200).json({ token });
  
} catch (error) {
  console.log("hi");
  res.status(400).json({ message: error.message });
}
};

