const express = require('express');
const basicMiddlewares = require('./middlewares/basicMiddlewares');
const userController = require('./controllers/userController');
const contestController = require('./controllers/contestController');
const chatController = require('./controllers/chatController');
const upload = require('./utils/fileUpload');
const authRouter = require('./routes/auth');
const checkAuthorization = require('./middlewares/checkAuthorization');
const validateBody = require('./middlewares/validateBody');
const { contestSchema } = require('./validation/schemas');

const router = express.Router();

router.use('/auth', authRouter);

router.post('/restore-password', userController.restorePassword);

router.post('/changeEmail', userController.changeEmail);

router.use(checkAuthorization);

router.post('/dataForContest', contestController.dataForContest);

router.post(
  '/pay',
  basicMiddlewares.onlyForCustomer,
  upload.uploadContestFiles,
  basicMiddlewares.parseBody,
  validateBody(contestSchema),
  userController.payment,
);

router.post('/getCustomersContests', contestController.getCustomersContests);

router.post('/getModeratorContests', contestController.getModeratorContests);

router.post('/activateContest', contestController.activateContest);

router.post('/activateOffer', contestController.activateOffer);

router.post('/deleteOffer', contestController.deleteOffer);

router.post('/activateOfferBundle', contestController.activateOfferBundle);

router.post('/deleteOfferBundle', contestController.deleteOfferBundle);

router.get('/getContestById', basicMiddlewares.canGetContest, contestController.getContestById);

router.post('/getAllContests', basicMiddlewares.onlyForCreative, contestController.getContests);

router.get('/downloadFile/:fileName', contestController.downloadFile);

router.post('/updateContest', upload.updateContestFile, contestController.updateContest);

router.post(
  '/setNewOffer',
  upload.uploadLogoFiles,
  basicMiddlewares.canSendOffer,
  contestController.setNewOffer,
);

router.post(
  '/setOfferStatus',
  basicMiddlewares.onlyForCustomerWhoCreateContest,
  contestController.setOfferStatus,
);

router.post('/changeMark', basicMiddlewares.onlyForCustomer, userController.changeMark);

router.post('/updateUser', upload.uploadAvatar, userController.updateUser);

router.post('/cashout', basicMiddlewares.onlyForCreative, userController.cashout);

router.post('/newMessage', chatController.addMessage);

router.post('/getChat', chatController.getChat);

router.post('/getPreview', chatController.getPreview);

router.post('/blackList', chatController.blackList);

router.post('/favorite', chatController.favoriteChat);

router.post('/createCatalog', chatController.createCatalog);

router.post('/updateNameCatalog', chatController.updateNameCatalog);

router.post('/addNewChatToCatalog', chatController.addNewChatToCatalog);

router.post('/removeChatFromCatalog', chatController.removeChatFromCatalog);

router.post('/deleteCatalog', chatController.deleteCatalog);

router.post('/getCatalogs', chatController.getCatalogs);

router.post('/getModeratorOffers', contestController.getModeratorOffers);

module.exports = router;
