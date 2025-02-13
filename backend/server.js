const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser')
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { connect } = require('http2');
const { error } = require('console');


//Middle tire
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loan_client"
});

db.connect((err) => {
    if (err){
        console.error('Error connection to the database', err);
        process.exit(1);
    }
    console.log('connected to the Mysql database...')
});

app.post('/register', (req, res) => {
    const sentFullname = req.body.Fullname
    const sentResidential = req.body.Residential
    const sentPostal = req.body.Postal
    const sentEmail = req.body.Email
    const sentPhone = req.body.Phone
    const sentID = req.body.ID
    const sentPassword = req.body.Password

    //create an sql statement to insert the users information to the database
    const SQL = 'INSERT INTO users (Fullname, Residential, Postal, email, phoneNumber, ID_Number, Password) VALUES (?,?,?,?,?,?,?)'
    const Values = [sentFullname, sentResidential, sentPostal, sentEmail, sentPhone, sentID, sentPassword]

    db.query(SQL, Values, (err, result) =>{
        if(err){
            console.error('Error inserting user:', err.message);
            return res.status(500).send({ message: 'Failed to register user', error: err});
        }
        else{
            console.log('User inserted successfuly!')
        }
        
        const userId = result.insertId

        const notificationsSQL = 'INSERT INTO notifications (user_id, message) VALUES (?, ?)';
        const notificationMessage =  `Welcome ${sentFullname}! Your account has been created successfully.`;

        db.query(notificationsSQL, [userId, notificationMessage], (notifErr) => {
            if (notifErr){
                console.error('Error insert notification', notifErr.message);
                return res.status(500).send({message: 'User registered, but failed to add notification', error: notifErr.message})
            }
            else{
            console.log('Notification inserted successfuly!!');
            res.status(200).send({message: 'User registered and notification added'})
            }
        });
        
    });

});

app.post('/login', (req, res) => {
    const sentloginFullname = req.body.LoginFullname
    const sentloginPassword = req.body.LoginPassword

    //create an sql statement to insert the users information to the database
    const SQL = 'SELECT id, Fullname, Password FROM users WHERE Fullname= ? && Password = ? '
    const Values = [sentloginFullname, sentloginPassword]

    db.query(SQL, Values, (err, result) =>{
        if(err){
            res.status(500).send({error:err})
        }
        else if(result.length > 0){
            res.status(200).send({message: 'User exists'})
        }else{
            res.status(401).send({message: 'Credentials do not match!'})
            
        }
    })

})

// Fetch user profile
app.get('/profile/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error('Error fetching profile:', err);
            return res.status(500).json({ message: 'Failed to fetch profile' });
        }
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ message: 'Profile not found' });
        }
    });
});

// Update user profile
app.put('/profile/:userId', (req, res) => {
    const userId = req.params.userId;
    const { fullname, phone, email, postal_address, national_id, Residential, bank_name, bank_account_number } = req.body;

    const query = `
        UPDATE users 
        SET Fullname = ?, phoneNumber= ?, email = ?, Postal = ?, 
            ID_Number = ?,Residential = ?, Bank_name = ?, Bank_account_no = ?
        WHERE id = ?
    `;
    const values = [fullname, phone, email, postal_address, national_id, Residential, bank_name, bank_account_number, userId];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating profile:', err);
            return res.status(500).json({ message: 'Failed to update profile' });
        }
        res.json({ message: 'Profile updated successfully!' });
    });
});



//File upload using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, 'uploads/profile_pictures/') //this will be the directory to save the uploaded files

    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);

    },
})

const upload = multer({storage})

app.post('/profile/upload/:userId', upload.single('profilePhoto'), (req, res) => {
    const userId = req.params.userId;
    const profilePhoto = req.file ? req.file.path : null;

    if (!profilePhoto) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const query = 'UPDATE users SET profile_photo = ? WHERE user_id = ?';
    db.query(query, [profilePhoto, userId], (err, result) => {
        if (err) {
            console.error('Error uploading profile picture:', err);
            return res.status(500).json({ message: 'Failed to upload profile picture' });
        }
        res.json({ message: 'Profile picture uploaded successfully!', profilePhoto });
    });
});

app.post('/loan-application', upload.fields([
    {name: 'bankStatement', maxCount:1},
    {name: 'payslip', maxCount:1},
    {name: 'idCopy', maxCount:1}
]), (req, res) =>{
    const {netSalary, loanAmount, transferMethod, period, description} = req.body;
    const files = req.files;

    const userId = req.headers['user-id']

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized: User not logged in.' });
    }


    if (!netSalary || !loanAmount || !transferMethod || !period || !description ||!files.bankStatement || !files.payslip || !files.idCopy) {
        return res.status(400).json({ message: 'All fields are required.' });
      }


    //this is or the loan amount to not exceed 70% of the netSalary
    const maxLoanAmount = parseFloat(netSalary) * 0.7;
    if(parseFloat(loanAmount) > maxLoanAmount){
        return res.status(400).json({
            message: `Loan amount cannot exceed 70% of your net salary: ${maxLoanAmount.toFixed(2)}`,
        });
    }

    //this is to save the info into the database

    const query =  `INSERT INTO loan_applications (net_salary, loan_amount, transfer_method, Period, Description, bank_statement_path, payslip_path, id_copy_path, status, created_at, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        netSalary, loanAmount, transferMethod, period, description, 
        files.bankStatement[0].path,
        files.payslip[0].path,
        files.idCopy[0].path,
        'pending',
        new Date(),
        userId,
    ];

    db.query(query, values, (err, result) => {
        if(err) {
            console.error('Error saving info into the database', err);
            return res.status(500).json({message: 'Failed to save loan application. please try again later.'});
        }
        console.log('Loan application saved:', result);
        res.status(200).json({ message: 'Loan application submitted successfully!' });
    });
});



//adding routes
app.get('/user', (req,res) => {
    const fullname = req.query.fullname;

    
    const query = 'SELECT  id, Fullname AS name, email  FROM users WHERE Fullname = ?';
    db.query(query, [fullname], (err, result) => {
        if(err){
            console.error('Error Fetching user:', err);
            return res.status(500).json({ message: 'Failed to fetch user details'})
        }
        if(result.length > 0){
            res.json(result[0]);
        }
        else{
            res.status(404).json({ message: 'User not Found'})
        }
    })


});
app.get('/loans', (req,res) => {
    const userId= req.query.userId;
    const query = 'SELECT id, loan_amount as amount, status, created_at as date FROM loan_applications WHERE user_id = ?';
    db.query(query, [userId], (err, result)=>{
        if(err){
            console.error('Error fetching loans, err');
            return res.status(500).json({message: 'Failed to fetch loan applications'});
        }
        res.json(result)
    })
});

app.get('/notifications', (req, res) => {
    const userId = req.query.userId;
    const query = 'SELECT id , message FROM notifications WHERE user_id = ?';
    db.query(query, [userId], (err, result)=> {
        if (err){
            console.error('Error fetching notifications', err);
            return res.status(500).json({message: 'Failed to fetch notifications'})
        }
        res.json(result)
    }) 
});


app.listen(3002, () =>{
    console.log('server is running on port 3002')
})
