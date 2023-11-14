import cloudinary from "../EndWares/Cloudinary.js";


async function addMediaToCloudinary(files) {
    try {
      const uploadPromises = files.map(async (file) => {
        var tempFilePath = `./temp`;
        
  
        return new Promise(async (resolve, reject) => {
           
           cloudinary.uploader.upload_stream( {
            folder: "lost_and_found"
          },
          function(error, result) {
            if(error){
                // console.log("Error while uploading each image to cloudinary",error);
                reject(error);
            }
            else{
                // console.log("Uploaded Each Image to cloudinary",result.secure_url);
                resolve(result);
            }
              // console.log(error, result);
          })
          .end(file.buffer);
           
          });
        });
       

      const URLS = await Promise.all(uploadPromises);
    const secureURLs = URLS.map((result) => result.secure_url);
    return secureURLs;
  } catch (error) {
    // console.log('Error while uploading images to Cloudinary:', error);
    return -1;
  }
}


export {
    addMediaToCloudinary
}