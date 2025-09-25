
// import iphoneImage from "../Images/v-a-tao-OxvlDO8RwKg-unsplash.jpg";
// import ring from "../Images/sabrianna-NhrcL_C0sFA-unsplash.jpg"; 
// import blackWallet from "../Images/laura-chouette-CtOA9wbFAdQ-unsplash.jpg";
// import brownWallet from "../Images/kisetsu-co-wT74HUyZT4w-unsplash.jpg";
// import glass from "../Images/giorgio-trovato-K62u25Jk6vo-unsplash.jpg";
// import blueBag from "../Images/gabrielle-henderson-g-9b4W7N67U-unsplash.jpg";
// import watch from "../Images/bruno-van-der-kraan-VRERJ5Mjp4c-unsplash.jpg";
// import carKeys from "../Images/duc-van-z0ObIB-pjPo-unsplash.jpg";

// export const foundItems = [
//   {
//     id: 1,
//     name: "iPhone 14 Pro",
//     location: "Central Park",
//     image:
//       iphoneImage,
//     date: "Aug 14, 2025",
//   },
//   {
//     id: 2,
//     name: "Brown Leather Wallet",
//     location: "Times Square",
//     image:
//       brownWallet,
//     date: "Aug 13, 2025",
//   },
//   {
//     id: 3,
//     name: "Blue Hand Bag",
//     location: "University Campus",
//     image:
//       blueBag,
//     date: "Aug 12, 2025",
//   },
//   {
//     id: 4,
//     name: "Car Keys with BMW Keychain",
//     location: "Shopping Mall",
//     image:
//       carKeys,
//     date: "Aug 11, 2025",
//   },
// ];


//   export const lostItems = [
//     {
//       id: 1,
//       name: "Gold Wedding Ring",
//       location: "Downtown Area",
//       image: ring,
//       date: "Aug 14, 2025"
//     },
//     {
//       id: 2,
//       name: "Ray-Ban Sunglasses",
//       location: "Beach Boulevard",
//       image: glass,
//       date: "Aug 13, 2025"
//     },
//     {
//       id: 3,
//       name: "Black Hand Bag",
//       location: "Coffee Shop",
//       image: blackWallet,
//       date: "Aug 12, 2025"
//     },
//     {
//       id: 4,
//       name: "Tissot Watch",
//       location: "Gym Center",
//       image: watch,
//       date: "Aug 11, 2025"
//     }
//   ];



//   create database LostAndFound;
// use LostAndFound;

// create table Users(
// Id int primary key auto_increment,
// FullName varchar (20),
// EmialId varchar(20) unique,
// Password varchar(100),
// CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// ALTER TABLE Users 
// MODIFY COLUMN Password VARCHAR(255);

// insert into Users(FullName,EmialId,Password) values ("dum","dum@gmail.com","123456");

// CREATE TABLE foundItems (
//     itemId INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each item
//     name VARCHAR(100) NOT NULL,              -- Item name
//     location VARCHAR(150) NOT NULL,          -- Location where item was found
//     imagePath VARCHAR(255) NOT NULL,        -- Store image filename or URL
//     foundDate DATE NOT NULL,                -- Date item was found
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
// );

// CREATE TABLE lostItems (
//     ItemId INT AUTO_INCREMENT PRIMARY KEY,       -- Unique identifier for each item
//     name VARCHAR(100) NOT NULL,              -- Item name
//     location VARCHAR(150) NOT NULL,          -- Location where item was found
//     imagePath VARCHAR(255) NOT NULL,        -- Store image filename or URL
//     lostDate DATE NOT NULL,                -- Date item was found
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation timestamp
// );


// select * from Users;