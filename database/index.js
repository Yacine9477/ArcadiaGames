const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ballistayacine:Codeur@cluster0.kmk7yki.mongodb.net/arcadiagames?retryWrites=true&w=majority&appName=Cluster0')
        .then(() => console.log('connexion db ok !'))
        .catch( err => console.log(err));