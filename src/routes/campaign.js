const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("fs");
const Campaign = require("../models/Campaign");
const { addToQueue } = require("../queue/processor");
const upload = multer({ dest: "uploads/" });
const auth = require('../middlewares/authMiddleware')



/* upload campaign */
router.post("/upload", auth, upload.array('campaigns'), async(req, res)=>{
    try{
        const files = req.files;
        const campaigns = []


        for (const file of files){
            const raw = fs.readFileSync(file.path,'utf-8')
            const data = file.mimetype === 'application/json' ? JSON.parse(raw) : {messageBody: raw}

            /* create a new campaign */
            const newCampaign = await  Campaign.create({
                title: data?.title || file.originalname,
                channel: data?.channel || 'email',
                messageBody: data?.messageBody,
                targetList: data?.targetList || []
            })
            /* add the new campaign to a queue */
            addToQueue(newCampaign)
            campaigns.push(newCampaign._id)
        }
        res.json({ uploaded: campaigns})
    }catch(e){
        res.status(500).json({message: 'while uploading', error: e.message})
    }
})


/* to fetch campaign status */
router.get("/status/:id", auth, async(req, res)=>{
    const campaign = await Campaign.findById(req.params.id)
    res.json({
        status: campaign?.status
    })
});


/* to fetch summary of campaign */
router.post("/summary/:id", auth, async(req, res)=>{
    const campaign = await Campaign.findById(req.params.id)
    res.json({
        summary: campaign?.summary
    })
})


/* to retry uploading campaign - in case of failure */
router.post("/retry/:id", auth, async(req, res)=>{
    const campaign = await Campaign.findById(req.params.id)
    if(!campaign) return res.status(404).json({error: 'Not found'})
    campaign.status = 'pending'
     await campaign.save()
     addToQueue(campaign)
     res.json({message: 'Retry queued'})
})


module.exports = router
