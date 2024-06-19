import express from "express";
const app = express();
import 'dotenv/config';
import mailRoutes from "./routes/mails.js";
import newsletterRoutes from "./routes/newsletter.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import relationshipRoutes from "./routes/relationships.js";
import skillRoutes from "./routes/skills.js";
import followRoutes from "./routes/follows.js";
import messageRoutes from "./routes/messages.js";
import friendRoutes from "./routes/friends.js";
import adminRoutes from "./routes/admin.js";
import searchRoutes from "./routes/search.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);

    next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser()); /*obrada podataka u kolačićima, čuvanje identifikatora sesije*/

/*koristimo multer da uploadujemo fajl na server*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../projekat/public/upload') /*stavljamo u folder na klijentskoj strani*/
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname) /*da ne bi došlo do konflikta ukoliko dva fajla imaju isto ime, ispred dodajemo jedinstveni datum, da do toga ne bi došlo*/
    }
});

const upload = multer({ storage: storage }); //pravimo multer i obezbjeđujemo mu storage

app.post("/api/home-page/upload", upload.single("file"), (req, res) => {
    const file = req.file; /*dobijemo fajl*/
    res.status(200).json(file.filename); /*da bismo smjestili filename u bazu*/
});

//za stranu admina!
app.post("/api/admin/upload", upload.single("file"), (req, res) => {
    const file = req.file; /*dobijemo fajl*/
    res.status(200).json(file.filename); /*da bismo smjestili filename u bazu*/
});

app.use("/api/mails", mailRoutes);
app.use("/api/newsletter", newsletterRoutes);
app.use("/api/auth", authRoutes); /*ostaje ovakav jer ne ide na home-page*/
app.use("/api/home-page/users", userRoutes);
app.use("/api/home-page/posts", postRoutes);
app.use("/api/home-page/comments", commentRoutes);
app.use("/api/home-page/likes", likeRoutes);
app.use("/api/home-page/relationships", relationshipRoutes);
app.use("/api/home-page/skills", skillRoutes);
app.use("/api/home-page/follows", followRoutes);
app.use("/api/home-page/messages", messageRoutes);
app.use("/api/home-page/friends", friendRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/home-page/search", searchRoutes);

app.listen(8800, () => {
    console.log("API radi!")
})