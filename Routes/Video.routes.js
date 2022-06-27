import { request, Router } from 'express'
import { Authenticate } from '../Models/Middlewares/Authenticate.middlewares.js'
import { videoUpload} from '../Models/Middlewares/Video.middlewares.js'
import { json } from 'body-parser'
import { VideoController } from '../Controller/Video.controller.js'

const router = Router();
const Controller = new VideoController();

router.post('/api/video',json(), Authenticate, videoUpload.single('video'), (request, response)=>{
    Controller.upload(request, response);
});

router.get('/api/video/:filename', (req,res)=>{
    Controller.stream(req,res);
})
router.patch('/api/video', (request, response)=>{
    Controller.update(request,response);
})

router.delete('/api/video/:video_id/:video_path', (request,response)=>{
    Controller.delete(request,response);
})
export default router;