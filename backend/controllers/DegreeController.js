import degreeModel from "../models/DegreeModel.js";

//Adding degree
const adddegree = async (req, res) => {
  try {
    const {
      degree_name,
      description,
      fees,
      duration,

    } = req.body;

    const degreeData ={
      degree_name,
      description,
      fees :Number(fees),
      duration  ,
     
      };

    const degree =new degreeModel(degreeData)
    await degree.save()

    return res.json({ success: true, message: "Degree added", degree });

} catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

//Listing degree
const listdegrees = async (req, res) => {
    try {
        const degrees =await degreeModel.find({});
        res.json({success:true, degrees})
    } catch (error) {
        console.log(error);
    return res.json({ success: false, message: error.message });
    }
};

//removing degree
const removedegree = async (req, res) => {
  
    try {
        await degreeModel.findByIdAndDelete(req.body._id)
    return res.json({ success: true, message: "degree removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

//Single degree Info
const singledegree = async (req, res) => {
    try {
         const {degreeid}= req.body
         const degree = await degreeModel.findById(degreeid)
         res.json({success:true, degree})
    } catch (error) {
        console.log(error); 
        return res.json({ success: false, message: error.message });
      }
};


export { adddegree, listdegrees, removedegree, singledegree };
