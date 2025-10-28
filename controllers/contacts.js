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

const updateContact = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'No update data provided' });
    }
  try {
    const collection = db.getDB().db().collection('contacts');
    const existingContact = await collection.findOne(
      { _id: new ObjectId(req.params.id) });
    if (!existingContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );

    if (result.modifiedCount > 0) {
      // Get the updated document
      const updatedContact = await collection.findOne({ _id: new ObjectId(req.params.id) });
      res.status(200).json(updatedContact);
    } else {
      res.status(200).json(existingContact); // No changes made
    }
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'An error occurred while updating the contact.' });
  }
};

const deleteContact = async (req, res) => {
  try {
    const deletedContact = await db.getDB().db().collection('contacts').deleteOne({ _id: new ObjectId(req.params.id) });  
    if (deletedContact.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({ error: 'An error occurred while deleting the contact.' });
  }
};


const addContact = async (req, res) => {
  console.log('Adding new contact:', req.body);
  try {
    const newContact = req.body;
    const result = await db.getDB().db().collection('contacts').insertOne(newContact);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error adding contact:', error);
    res.status(500).json({ error: 'An error occurred while adding the contact.' });
  }
};

module.exports = { getContacts, getContact, updateContact, deleteContact, addContact };