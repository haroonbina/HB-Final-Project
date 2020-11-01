const express = require('express');
const { fetchUser, fetchUserByID, changePassword } = require('../database/mySql');

const router = express.Router();


router.post('/admins/login', (req, res) =>{
    const {userName, password} = req.body;

    fetchUser(userName, password)
    .then(result =>{
        if(result.length > 0){
            req.session.userId = result[0].id;
            res.send({
                id: result[0].id,
                name: result[0].name
            });
        }else{
            res.status(401).send();
        }
    }).catch(err =>{
        res.status(401).send();
    })
})

router.post('/admins/logout', (req, res) =>{
    req.session.destroy(err =>{
        if(err){
            res.status(400).send();
        }

        res.clearCookie("sid");
        res.send();
    })
})

router.post('/admins/checkLogin', (req, res) =>{
    if(req.session.userId){
        return(
            fetchUserByID(req.session.userId)
            .then(result =>{
                res.send({
                    id: result[0].id,
                    name: result[0].name
                });
            }).catch(err =>{
                res.status(401).send();
            })
        )
    }
    res.status(401).send()
})

router.put('/admins/changePassword', (req, res) =>{

    const {userId, currentPassword, newPassword} = req.body;
    changePassword(userId, currentPassword, newPassword)
    .then(result =>{
        res.send();
    }).catch(err =>{
        console.log(err)
        res.status(401).send();
    })
})



module.exports = router;