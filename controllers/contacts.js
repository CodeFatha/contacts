const db = require('../db/connect');
const { ObjectId } = require('mongodb');
const { get } = require('../routes');

const getContacts = async (req, res) => {
  try {
    const contacts = await db.getDB().db().collection('contacts').find();
    contacts.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    if (lists.length > 0) {
        res.status(200).json(lists);
    } else {
      res.status(404).json({ message: 'No lists found' });
    }
  }).catch((err) => {
    res.status(500).json({ message: 'An error occurred while fetching the profile data.', error: err });
  });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getContact = async (req, res) => {
  console.log('Fetching contact with ID:', req.params.id);
  try {
    const contact = await db.getDB().db().collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'An error occurred while fetching the contact.' });
  }
};

module.exports = { getContacts, getContact };