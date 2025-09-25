const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mySql = require('mysql2');
const multer = require('multer');
const path = require ("path");
const { error } = require('console');


const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });
 

const JWT_SECRET = "super_secret_key";


const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Msrujan@1102',
    database: 'LostAndFound'
});

  db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
    }   
    else {
        console.log('Connected to MySQL database');
    }       
  });


//login - route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    db.query('SELECT * FROM Users WHERE EmailId = ?', [email], async (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      // Compare password
      const isMatch = await bcrypt.compare(password, user.Password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // ✅ Add name and email to JWT payload
      const jwtToken = jwt.sign(
        { email: user.EmailId, name: user.FullName },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // console.log(`User ${user.FullName} logged in successfully.`);
      return res.status(200).json({ message: "Login successful", token: jwtToken });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// register-route
app.post('/register',async (req,res) => {
    const {name, email, password , confirmPassword} = req.body;
    try{
        const hashedPassword =await bcrypt.hash(password, 10);
        const sql = "INSERT INTO Users (FullName, EmailId, Password) VALUES (?, ?, ?)";
        const values = [name, email, hashedPassword];

        db.query(sql, values, (err, result) => {
            if(err){
                console.error('Error inserting user into database:', err);
                return res.status(500).json({message: "Database error"});
            }
            console.log('User inserted into database:', result);
            res.status(200).json({message: "User registered successfully"});
        });

        // db.query(`insert into Users(FullName,EmialId,Password,ConfirmPassword) values (${name}, ${email}, ${hashedPassword}, ${confirmPassword})`,(err, result) => {
        //     if(err){
        //         console.error('Error inserting user into database:', err);
        //         return res.status(500).json({message: "Database error"});
        //     }
        //     console.log('User inserted into database:', result);
        // });
        // console.log(`Registration attempt with name: ${name}, email: ${email}, password: ${hashedPassword} , and confirmPassword: ${confirmPassword}`);
        // users.push({name, email, password: hashedPassword});
        // console.log(users[0].password);
    }catch(error){
        console.error("Error during registration:", error);
        res.status(500).json({message: "Internal server error"});
    }
})


//User - Profile
app.get("/profile", (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "No token" });

  const token = authHeader.split(" ")[1]; 
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    res.json({ name: decoded.name, email: decoded.email });
  });
});

// ✅ Middleware to verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ msg: "Invalid or expired token" });
    req.user = decoded; // store decoded user info for later use
    next();
  });
}

//  Add Found Item route
app.post("/addFoundItem", verifyToken, upload.single("image"), (req, res) => {
  const { name, location, date } = req.body;
  const imagePath = req.file ? req.file.filename : null;

  const sql =
    "INSERT INTO foundItems (name, location, imagePath, foundDate) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, location, imagePath, date], (err) => {
    if (err) {
      console.error("Error inserting found item:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Item added successfully" });
  });
});

//addlost-item 
app.post('/addLostItem',verifyToken, upload.single("image"),(req, res) => {
    const { name, location, date } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    const sql = "INSERT INTO lostItems (name, location, imagePath, lostDate) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, location, imagePath, date], (err, result) => {
      if (err) {
        console.error("Error inserting lost item:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "Lost item added successfully" });
    });
})


app.get('/foundItems', (req, res) => {
  const sql = "SELECT * FROM foundItems";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching found items:", err);
      return res.status(500).json({ error: "Database error" });
    }


    // Map DB rows to include image URL
    const items = results.map(item => ({
      ...item,
      imageUrl: item.imagePath 
        ? `http://localhost:5000/uploads/${item.imagePath}` 
        : null
    }));
    // console.log("Fetched found items:", items);
    res.json(items);
  });
});


app.get('/lostItems', (req, res) => {
    const sql = "SELECT * FROM lostItems";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching lost items:", err);
        return res.status(500).json({ error: "Database error" });
      }
      const items = results.map(item => ({
        ...item,
        imageUrl: item.imagePath 
          ? `http://localhost:5000/uploads/${item.imagePath}`
          : null
      }));
      // console.log("Fetched lost items:", items);
      res.json(items);
    });
});
   

app.get("/foundItems/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM foundItems WHERE itemId = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(result[0]); // send only that one item
  });
});


app.get('/lostItems/:id',(req,res) =>{
  const {id} = req.params;
  const sql = "SELECT * FROM lostItems WHERE ItemId = ?";

  db.query(sql, [id], (err,result)=>{
    if(err){
      return res.status(500).json({error: "Database error"})
    }
    if(result.length === 0){
      return res.status(404).json({error: "Item not found"});
    }
    res.json(result[0]);
  })
})


// Get all lost & found items with count
app.get("/allItems", (req, res) => {
  const lostQuery = "SELECT * FROM lostItems";
  const foundQuery = "SELECT * FROM foundItems";

  db.query(lostQuery, (err, lostResults) => {
    if (err) return res.status(500).json({ msg: "Error fetching lost items" });

    db.query(foundQuery, (err, foundResults) => {
      if (err) return res.status(500).json({ msg: "Error fetching found items" });

      res.json({
        lostItems: lostResults,
        foundItems: foundResults,
        lostCount: lostResults.length,
        foundCount: foundResults.length
      });
    });
  });
});



app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
