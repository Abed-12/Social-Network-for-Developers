import express from 'express';
import axios from 'axios';
import config from 'config';
import ensureAuthenticated from '../../middleware/auth.js';
import { check, validationResult } from 'express-validator';
import Profile from '../../models/Profile.js';
import User from '../../models/User.js';
import Post from '../../models/Post.js';

const router = express.Router();

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', ensureAuthenticated, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }

        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', 
    [ 
        ensureAuthenticated,
        [
            check('status', 'Status is required').notEmpty(),
            check('skills', 'Skills is required').notEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { 
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills) profileFields.skills = skills.split(',').map(skill => skill.trim());

        // Build social object
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(twitter) profileFields.social.twitter = twitter;
        if(facebook) profileFields.social.facebook = facebook;
        if(linkedin) profileFields.social.linkedin = linkedin;
        if(instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            // Update
            if(profile) {
                profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save();

            res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile/user/:user_id
// @desc   Get profiles by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) 
            return res.status(400).json({ msg: 'Profile not found' });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        if (err.name === 'CastError') {
            return res.status(400).json({ msg: 'Profile not found' });
        }
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/profile
// @desc   Delete profile, user & posts
// @access Private
router.delete('/', ensureAuthenticated, async (req, res) => {
    try {
        // Remove user posts
        await Post.deleteMany({ user: req.user.id });

        // Remove profile
        await Profile.findOneAndDelete({ user: req.user.id });
        // Remove user
        await User.findOneAndDelete({ _id: req.user.id });

        res.json({ msg: 'User deleted' });
    } catch (err) { 
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/profile/experience
// @desc   Add profile experience
// @access Private
router.put('/experience', 
    [
        ensureAuthenticated, 
        [
            check('title', 'Title is required').notEmpty(),
            check('company', 'Company is required').notEmpty(),
            check('from', 'From date is required').notEmpty()
        ] 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        } = req.body;

        const newExp = {
            title,
            company,
            location,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.experience.unshift(newExp);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   Delete experience from profile 
// @access Private
router.delete('/experience/:exp_id', ensureAuthenticated, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/profile/education
// @desc   Add profile education
// @access Private
router.put('/education', 
    [
        ensureAuthenticated, 
        [
            check('school', 'School is required').notEmpty(),
            check('degree', 'Degree is required').notEmpty(),
            check('fieldofstudy', 'Field of study date is required').notEmpty(),
            check('from', 'From date is required').notEmpty()
        ] 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        } = req.body;

        const newEdu = {
            school,
            degree,
            fieldofstudy,
            from,
            to,
            current,
            description
        }

        try {
            const profile = await Profile.findOne({ user: req.user.id });
            profile.education.unshift(newEdu);

            await profile.save();

            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route  DELETE api/profile/education/:edu_id
// @desc   Delete education from profile 
// @access Private
router.delete('/education/:edu_id', ensureAuthenticated, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/profile/github/:username
// @desc   Get user repos from Github
// @access Public
router.get('/github/:username', async (req, res) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${req.params.username}/repos`, {
            params: { per_page: 5, sort: 'created:asc', client_id: config.get('githubClientId'), client_secret: config.get('githubSecret') },
            headers: { 'User-Agent': 'node.js' }
        });

        res.json(response.data);
    } catch (err) {
        console.error(err.message);

        if (err.response && err.response.status === 404) {
            return res.status(404).json({ msg: 'No Github profile found' });
        }
    
        res.status(500).send('Server Error');
    }
});

export default router;