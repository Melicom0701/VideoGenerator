const fs = require('fs');
const { uploadToBlobStorage } = require('../config/blob');
const { pool } = require('../config/database')
const containerName = process.env.VIDEO_CONTAINER;
async function videoUpload(req, res) {
    try {
        
        const file = req.file;
        format = file.mimetype.split('/')[1];
        const description = req.body.description;
        const type = req.body.type;
        const filename = "video-" + Date.now() + "."+format;
        stream = fs.createReadStream(file.path);
        const result = await uploadToBlobStorage(stream, containerName, filename);
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });
        //insert into table Videos
        //description
        //url 
        
        const query = `INSERT INTO Videos(description,url,type)
                        VALUES (N'${description}','${result.url}',N'${type}')`

        pool.request()
        .query(query)
        .then(result=>{
            console.log(result)
            
        })
        .catch(err=>
            {
                throw err;
            })

        
        res.status(200).json({state:'success'})
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
module.exports = { videoUpload };