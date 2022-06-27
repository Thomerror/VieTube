import { videoModel } from "../Models/Video.model";
import fs from 'fs'
import { IncomingForm } from "formidable";

export class VideoController{

    async upload(request, response){

        const newVideo = new videoModel({
            owner: request.token._id,
            name: request.body.name,
            videopath: request.filename,
        });
        
        try{
            const saveVideo = await newVideo.save();
            return response.status(201).json({msg:'Video uploaded successfully'});
        }catch(err){
            return response.status(500).json({msg:'Video uploaded failed'});
        }
    }

    stream(request, response){
        const range = request.headers.range

        if(!range){
            return response.status(400).json({msg:'Range header is reuired to start streaming'})
        }

        const videopath = `video/${request.params.filename}`;
        const videosize = fs.statSync(videopath).size;

        const start = Number(range.replace(/\D/g, ""));
        const chunk_size = 10**6 //1mb
        const end = Math.min(start + chunk_size, videosize-1);

        const contentLength = end - start + 1;
        const headers = {
            'Content-Length': contentLength,
            'Accept-Range': 'bytes',
            'Content-type': "video/mp4",
            'Content-Range': `bytes ${start}-${end}/${videosize}`
        }
        response.writeHead(206, headers);
        const videostream = fs.createReadStream(videopath, {start, end});
        videostream.pipe(response)
    }

    update(request, response){
        const form = new IncomingForm();

        form.parse(request, (err, fields, files)=>{
            if(err){
            return response.status(500).json({msg:'Network error: Failed to update video name'});
            }
            const { name, id } = fields;
            
            if(!name){
                return response.status(400).json({msg:'video name is required to update video name'})
            }
            videoModel.findOneAndUpdate({_id:id}, {$set: {name:name}}, {new:true}, (err, doc)=>{
                if(err){
                    return response.status(500).json({msg:'Network error: Failed to update video name'})
                }
                return response.status(200).json({msg:'Video name updated successfully'})
            });
        });
        
    }

    delete(request, response){
        const video_id = request.params.video_id;
        const video_path =  request.params.video_path;

        const videopath = `video/${video_path}`;
        if(fs.existsSync(videopath)){
            fs.unlink(videopath, (err)=>{
                if(err){
                    return response.status(500).json({msg:'Network error: Failed to delete video'});
                }
                videoModel.findOneAndDelete({_id:video_id}, (err)=>{
                    if(err){
                        return response.status(500).json({msg:'Network error: Failed to delete video'})
                    }
                    return response.status(200).json({msg:'Video deleted successfully'});
                })
            })
        }
    }
}