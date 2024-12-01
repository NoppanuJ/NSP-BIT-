const Login = require('../models/login.model');
const Nurse = require('../models/nurse.model');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res) => {
  try {
    const users = await Login.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.signUpUser = async (req, res) => {
  const { email, password, firstName, lastName, gender, dateOfBirth, phoneNumber} = req.body;
  // console.log(req.body);
  // ตรวจสอบข้อมูลที่รับเข้ามา
  if (!email || !password || !firstName || !lastName || !gender || !dateOfBirth || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // ตรวจสอบว่าอีเมลมีอยู่ในระบบแล้วหรือไม่
    const existingUser = await Nurse.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // เข้ารหัสรหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10); // ค่า saltRounds = 10

    const nurse_id = await Nurse.find().sort({ Nurse_ID : -1 }).limit(1);
    const nurse_id_int = parseInt(nurse_id[0].Nurse_ID) + 1;
    console.log(nurse_id_int);

    // สร้างผู้ใช้ใหม่
    const user = await Nurse.create({
      Nurse_ID : nurse_id_int,
      Admin_ID : null,
      User_Email : email,
      User_First_Name : firstName,
      User_Last_Name : lastName,
      Sex : gender,
      Date_of_Birth : dateOfBirth,
      Phone_Number : phoneNumber,
      Profile_Picture : "",
      Role : "user"
    });

    console.log(user);

    const login = await Login.create({ email, password, token: hashedPassword });
    // ส่งผลลัพธ์กลับไป
    res.status(201).json({
      message: 'User created successfully.',
    });
  } catch (err) {
    // จัดการข้อผิดพลาด
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  try {
    const user = await Login.findOne({ email });
    const hashedPassword = user.token;
    const isMatch = await bcrypt.compare(password, hashedPassword);
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


