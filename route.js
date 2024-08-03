module.exports = (app) => {
    const databasecall = require('./databaseApiCall.js');
    const businessApiCall = require('./businessApiCall.js');
    const businessCategoryApiCall = require('./businessCategoryApiCall.js');
    const transectionApiCall = require('./transectionApiCall.js');

    app.post("/signup", databasecall.signup);
    app.post("/login", databasecall.login);
    app.put("/update/:id", databasecall.updateDetails);
    app.put("/change-password", databasecall.changePassword);

    app.post("/createBusiness", businessApiCall.createBusiness);
    app.put("/updateBusiness/:bid", businessApiCall.updateBusiness);
    app.delete("/deleteBusiness/:bid", businessApiCall.deleteBusiness);

    app.post('/insertBusinessCategory', businessCategoryApiCall.createBusinessCategory);
    app.put('/updateBusinessCategory/:cid', businessCategoryApiCall.updateBusinessCategory);
    app.delete('/deleteBusinessCategory/:cid', businessCategoryApiCall.deleteBusinessCategory);

    app.post('/insertTransection', transectionApiCall.insertTransection);
    app.put('/updateTransection/:transection_id', transectionApiCall.updateTransection);
    app.delete('/deleteTransection/:transection_id', transectionApiCall.deleteTransection);
    app.get('/transectionRecords/:bid', transectionApiCall.getTransectionRecords);
    app.get('/transectionRecords', transectionApiCall.getTransectionRecords);


};
