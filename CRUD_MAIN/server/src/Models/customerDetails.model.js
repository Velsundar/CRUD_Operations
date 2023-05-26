import mongoose from "mongoose";

const customerDetailSchema = mongoose.Schema({
  name: String,
  address: String,
  city: String,
  pincode: String,
  country: String,
  editable: {
    type: Boolean,
    default: true,
  },
});

const CustomerDetails = mongoose.model("customerDetails", customerDetailSchema);
export default CustomerDetails;
