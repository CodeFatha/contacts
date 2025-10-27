const express = require('express');
const router = express.Router();
const contactsController = require('../../controllers/contacts');

router.get('/', (req, res) => {
    res.send('API Home');
});
router.get('/contacts', contactsController.getContacts);
router.get('/contacts/:id', contactsController.getContact);

module.exports = router;