module.exports = {
    mongoClient: null,
    app: null,
    init: function(app,mongoClient) {
        this.mongoClient = mongoClient;
        this.app = app;
    },
    addComment: async function(comment) {
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'comments';
            const commentsCollection = database.collection(collectionName);
            const result = await commentsCollection.insertOne(comment);
            return result.insertedId;
        } catch(error) {
            throw error;
        }
    },
    getComments: async function(filter,options) {
        try{
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'comments';
            const commentCollection = database.collection(collectionName);
            const comments = await commentCollection.find(filter,options).toArray();
            return comments;
        } catch (error) {
            throw(error);
        }
    },
    findComment: async function(filter,options){
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'comments';
            const commentCollection = database.collection(collectionName);
            const comment = await commentCollection.findOne(filter, options);
            return comment;
        } catch (error) {
            throw (error);
        }
    },
    deleteComment: async function(filter,options){
        try {
            const client = await this.mongoClient.connect(this.app.get('connectionStrings'));
            const database = client.db("musicStore");
            const collectionName = 'comments';
            const commentCollection = database.collection(collectionName);
            const comment = await commentCollection.deleteOne(filter, options);
            return comment;
        } catch (error) {
            throw (error);
        }
    }
};