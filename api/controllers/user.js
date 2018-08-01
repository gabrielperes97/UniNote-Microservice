'use strict';

var mongoose = require('mongoose'),
User = mongoose.model('Users');

exports.list_all_users = function(req, res) {
    User.find({}, function(err, msg) {
            if (err)
                res.send(err);
            res.json(msg);
    });
};

exports.create_a_user = function(req, res) {
    User.findOne({"username": req.body.username})
        .then(user => {
            if(user) {
                res.json({ sucess: false, message: "This usename has no available"});
            }
            else{
                var new_user = new User(req.body);
                new_user.save(function(err, msg){
                    if (err)
                        res.send(err);
                    else
                        res.json(msg);
                });
            }
        });
};

exports.read_a_user = function(req, res) {
    User.findById(req.params.userId, function(err, msg) {
        if (err)
            res.send(err);
        else
            res.json(msg);
    });
};

exports.update_a_user = function (req, res) {
    User.findOneAndUpdate({_id:req.params.msgId}, req.body, {new:true}, function(err, msg){
        if (err)
            res.send(err);
        res.json(msg);
    });
};

exports.delete_a_user = function(req, res) {
    User.remove({
        _id:req.params.msgId
    }, function(err, msg) {
        if (err)
            res.send(err);
        res.json({message: 'User successfully deleted'});
    });
};
