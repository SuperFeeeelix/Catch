const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'catchdb';
const express = require('express');

const client = new MongoClient(url, {useNewUrlParser: true });
async function main() {
    try {
        await client.connect();
        console.log('connected to the database');
        const db = client.db(dbName);

        // insert a new user 
        const userCollection = db.collection('users');
        const newUser = {
            username:'john_doe',
            email: 'doe@example.com',
            password: 'hashed_password',
            friends: [],
            posts: [],

        };
    }
}


