import mongoose from "mongoose";
import CustomerDetails from "../models/customerDetails.model.js";

export const getCustomerDetails = async (req, res) => {
  try {
    const details = await CustomerDetails.find({});

    res.status(200).json({
      data: details,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};
export const createNewCustomerDetail = async (req, res) => {
  const detail = req.body;

  const newDetail = new CustomerDetails({
    ...detail,
    createdAt: new Date().toISOString(),
  });

  try {
    await newDetail.save();

    res.status(200).json({
      data: newDetail,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

export const UpdateCustomerDetail = async (req, res) => {
  const { id: _id } = req.params;
  const detail = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const updatedDetail = await CustomerDetails.findByIdAndUpdate(
    _id,
    { _id, ...detail },
    { new: true }
  );

  res.status(200).json(updatedDetail);
};

export const DeleteCustomerDetail = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  await CustomerDetails.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};
