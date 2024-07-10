import express from 'express'
<<<<<<< HEAD
import { createListing , deleteListing ,updateListing , getListing } from '../controllers/listing.controller.js';
=======
import { createListing , deleteListing ,updateListing} from '../controllers/listing.controller.js';
>>>>>>> b093b33b24aea2d856ed310a7adb00be4add4b93
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing)
<<<<<<< HEAD
router.get('/get/:id',getListing);
=======
>>>>>>> b093b33b24aea2d856ed310a7adb00be4add4b93

export default router;