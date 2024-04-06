const { Thought, User } = require('../../models');

const handleError = (res, error) => {
    res.status(500).json(error);
};

const handleNotFound = (res, message) => {
    res.status(404).json({ message });
};

const createThought = async ({ body }, res) => {
    try {
        const thought = await Thought.create(body);
        const updatedUser = await User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: thought._id } }, { new: true });
        res.json({ thought, updatedUser });
    } catch (error) {
        handleError(res, error);
    }
};

const deleteThought = async ({ params }, res) => {
    try {
        const thought = await Thought.findOneAndDelete({ _id: params.thoughtId });
        if (!thought) {
            return handleNotFound(res, 'No thought found with this id.');
        }
        const userData = await User.findOneAndUpdate(
            { thoughts: params.thoughtId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
        );
        if (!userData) {
            return handleNotFound(res, 'Thought deleted but failed to remove from users.');
        }
        res.json({ thought, userData });
    } catch (error) {
        handleError(res, error);
    }
};

const addReaction = async ({ params, body }, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            return handleNotFound(res, 'No thought found with this id!');
        }
        res.json(thought);
    } catch (error) {
        handleError(res, error);
    }
};

const deleteReaction = async ({ params, body }, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            return handleNotFound(res, 'No thought found with this id!');
        }
        res.json(thought);
    } catch (error) {
        handleError(res, error);
    }
};

const updateThought = async ({ params, body }, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $set: body },
            { new: true, runValidators: true }
        );
        if (!thought) {
            return handleNotFound(res, 'No thought found with this id!');
        }
        res.json(thought);
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    createThought,
    deleteThought,
    addReaction,
    deleteReaction,
    updateThought
};
