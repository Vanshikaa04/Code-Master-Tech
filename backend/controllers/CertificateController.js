import certiModel from "../models/CertificateModel.js";

const updateStatus = async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({ success: false, message: "Participant ID is required" });
    }

    const participant = await certiModel.findByIdAndUpdate(
      _id,
      { status: "accepted" },
      { new: true } 
    );

    if (!participant) {
      return res.status(404).json({ success: false, message: "Participant not found" });
    }

    return res.json({ success: true, message: "Status Updated", participant });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};


const addParticipant = async (req, res) => {
  try {
    let { phone, name, city, seminar } = req.body;

    // Normalize name and city to lowercase before saving/searching
    const normalizedName = name.trim().toLowerCase();
    const normalizedCity = city.trim().toLowerCase();

    // Check if participant already exists (case-insensitive for name & city)
    const exists = await certiModel.findOne({
      phone,
      seminar,
      name: normalizedName,
      city: normalizedCity,
    });

    if (exists) {
      if (exists.status === "pending") {
        return res.json({
          success: true,
          message: `${exists.name} has been registered! Kindly WAIT FOR APPROVAL`,
          participant: {
            name: exists.name,
            seminar: exists.seminar,
            status: exists.status,
          },
        });
      }

      if (exists.status === "accepted") {
        return res.json({
          success: true,
          message: "Approved! Redirecting to certificate",
          participant: {
            name: exists.name,
            seminar: exists.seminar,
            status: exists.status,
          },
        });
      }
    }

    // If new participant
    const newParticipant = new certiModel({
      name: normalizedName,  // save lowercase
      phone,
      city: normalizedCity,  // save lowercase
      seminar,
      status: "pending",
    });

    const participant = await newParticipant.save();

    return res.json({
      success: true,
      message: `${participant.name} has been registered! Kindly WAIT FOR APPROVAL`,
      participant: {
        name: participant.name,
        phone: participant.phone,
        city: participant.city,
        seminar: participant.seminar,
        status: participant.status,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};



const  allparticipants= async (req,res) => {
    try {
      const participants = await certiModel.find();
        return res.json({ success: true, participants });
      } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }
}

const remove= async (req, res) => {
  
    try {
        await certiModel.findByIdAndDelete(req.body._id)
    return res.json({ success: true, message: "Participant removed" });
        
        
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};

export {allparticipants, addParticipant, updateStatus, remove}