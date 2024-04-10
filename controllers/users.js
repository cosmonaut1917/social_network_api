const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async getUserById({ params }, res) {
        try {
            const userData = await User.findOne({ _id: params.id })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');

            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }

            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async createUser({ body }, res) {
        try {
            const userData = await User.create(body);

            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async updateUser({ params, body }, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: params.id },
                { $set: body },
                { new: true, runValidators: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    async deleteUser({ params }, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: params.id });
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend({ params }, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteFriend({ params }, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!userData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
};