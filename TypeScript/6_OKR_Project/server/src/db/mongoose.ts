import mongoose from 'mongoose';

mongoose.connect( "mongodb://127.0.0.1:27017/okr", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("error connecting", err))