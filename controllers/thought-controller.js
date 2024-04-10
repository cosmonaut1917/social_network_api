const { Thought, User } = require('../models');

// const handleError = (res, error) => {
//     res.status(500).json(error);
// };

// const handleNotFound = (res, message) => {
//     res.status(404).json({ message });
// };
module.exports = {
    async getThoughts(req, res) {
        try {
            const dbThoughtData = await Thought.find()
                .sort({ createdAt: -1 });

            res.json(dbThoughtData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            const updatedUser = await User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: thought._id } }, { new: true });
            res.json({ thought, updatedUser });
        } catch (error) {
            res.status(500).json(error);
        }
    },

   async deleteThought  ({ params }, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
                
            }
            const userData = await User.findOneAndUpdate(
                { thoughts: params.thoughtId },
                { $pull: { thoughts: params.thoughtId } },
                { new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user found with this id.' });
            }
            res.json({ thought, userData });
        } catch (error) {
           res.status(500).json(error);
        }
    },

    async addReaction ({ params, body }, res)  {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $push: { reactions: body } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },

async deleteReaction  ({ params, body }, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: { reactionId: params.reactionId } } },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    async updateThought ({ params, body }, res)  {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $set: body },
                { new: true, runValidators: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with this id!' });
            }
            res.json(thought);
        } catch (error) {
           res.status(500).json(error);
        }
    }
}

