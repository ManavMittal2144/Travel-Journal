const express = require('express')
const router = express.Router();
const Vlog = require('../Models/Vlog');
const multer = require('multer');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = 'vikas';
router.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
router.use(cookieParser());


const storage = multer.diskStorage(
    {
        destination: function (req, file, cb) {
            return cb(null, "../frontend/Images");
        },
        filename: function (req, file, cb) {
            return cb(null, `${Date.now()}_${file.originalname}`)
        }
    }
)
const upload = multer({ storage });

router.get('/allvlogs', async (req, res) => {
    try {
        let allVlogs = await Vlog.find({}).populate('author');
        res.status(200).json(allVlogs);
    }
    catch (e) {
        res.status(400).json({ msg: 'something galat' })
    }
})

router.post('/post', upload.array('file'),async (req, res) => {
    try {
       
        let obj = req.files;
        let images = [];
        for (let i = 0; i < obj.length; i++) {
            images.push(obj[i]['filename']);
        }

        const { token } = req.cookies;
        
        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) throw err;
            let { name, desc, location } = req.body;
            const doc = await Vlog.create({ name, desc, location, file: images, author: info.id });
            res.json(doc);
        });
        // res.status(200).json({ msg: 'created successfully' });
    }
    catch (e) {
        res.status(400).json({ msg: "something galat" });
    }
})

router.get('/:id', async (req, res) => {
    try{
        let { id } = req.params;
        const vlog = await Vlog.findById(id);
        
        res.status(200).json(vlog);
    }
    catch (e) {
        res.status(400).json({ msg: "something galat" });
    }
})

router.post('/:id',upload.array('file'), async (req, res) => {
    try{
        let { id } = req.params;
        let { name, desc, location } = req.body;
        let obj = req.files;

        const vlog = await Vlog.findById(id);

        let images = [];
        for (let i = 0; i < obj.length; i++) {
            images.push(obj[i]['filename']);
        }
        for (let i = 0; i < vlog['file'].length; i++)
        {
            images.push(vlog['file'][i]);
        }
        await Vlog.findByIdAndUpdate(id, { name, desc, location, file: images });
        res.status(200).json({ msg: 'edited successfully' });
    }
    catch (e) {
        res.status(400).json({ msg: "something galat" });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Vlog.findByIdAndDelete(id);
        res.status(200).json({ message: 'Vlog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: "something galat" });
    }
});
module.exports = router;