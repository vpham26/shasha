const { Message } = require('../../models');
const router = require('express').Router();
const { NlpManager } = require('node-nlp');
const path = require('path');

const threshold = 0.5
const manager = new NlpManager({ languages: ['en'] });

router.get('/', (req, res) => {
    Message.findAll({
        attributes: { exclude: ['updatedAt'] }
    })
        .then(dbMsgData => res.status(200).json(dbMsgData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Message.findOne({
        attributes: { exclude: ['updatedAt'] },
        where: {
            id: req.params.id
        }
    })
        .then(dbMsgData => {
            if (!dbMsgData) {
                res.status(404).json({ message: 'Message not found' });
                return;
            }
            res.status(200).json(dbMsgData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', async (req, res) => {
    manager.load(path.join(__dirname, "../model.nlp"));

    const result = await manager.process('en', req.body.text);
    const answer = result.score > threshold && result.answer ? result.answer : "Sorry, I don't understand";
    
    Message.create({
        text: req.body.text,
        user_id: req.session.user_id,
        user_generated: true
    })
        .then(dbMsgData => {
            Message.create({
                text: answer,
                user_id: req.session.user_id,
                user_generated: false
            })
                .then(dbBotData => res.status(200).json({ bot: answer }))
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
})

module.exports = router;