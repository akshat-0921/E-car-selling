import { Brand } from "../../models/brand.models.js";
import { Car } from "../../models/car.models.js";
import { Showroom } from "../../models/showroom.models.js";

const addBrand = async (req, res) => {
   try {
      const { name, logo, description } = req.body
      const newBrand = await Brand.create({ name, logo, description })

      return res.status(201).json({ success: true, msg: "Brand added", brand: newBrand })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, msg: "An error occured while adding brand. Please try again" })
   }
}

const getAllBrands = async (req, res) => {
   try {
      const brands = await Brand.find()
      if (brands.length === 0) { return res.status(200).json({ success: true, msg: "No brand found", brands: [] }) }
      return res.status(200).json({ success: true, msg: "All brands fetched", brands })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, msg: "An error occured while fetching all brands. Please try again" })
   }
}

const updateBrand = async (req, res) => {
   try {
      const brandId = req.params?._id
      const { name, logo, description } = req.body

      const updates = {}
      if (name) updates.name = name
      if (logo) updates.logo = logo
      if (description) updates.description = description

      const brand = await Brand.findByIdAndUpdate(
         { _id: brandId }, { $set: updates }, { new: true }
      )

      if (!brand) { return res.status(404).json({ successs: false, msg: "Brand does not exist" }) }
      return res.status(200).json({ success: true, msg: "Brand has been updated", brand })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, msg: "An error occured while updating the brand. Please try again" })
   }
}

const deleteBrand = async (req, res) => {
   try {
      const brandId = req.params?._id
      const brand = await Brand.findById(brandId)
      if (!brand) { return res.status(404).json({ success: false, msg: "Brand does not exist" }) }

      await Car.deleteMany({ brandId })
      await Showroom.deleteMany({ brandId })
      await Brand.findByIdAndDelete(brandId)

      return res.status(200).json({ success: true, msg: "Brand and its associated data deleted successfully" })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, msg: "An error occured while deleting the brand. Please try again" })
   }
}

const getShowroomsInBrand = async (req, res) => {
   try {
      const brandId = req.params?._id
      const brand = await Brand.findById(brandId)
      if (!brand) { return res.status(404).json({ success: false, msg: "Brand does not exist" }) }

      const showrooms = await Showroom.find({ brandId })
      if (showrooms.length === 0) {
         return res.status(404).json({ success: false, msg: "No showrooms found for the brand" })
      }
      return res.status(200).json({ success: true, msg: `Showrooms for the brand ${brand} fetched successfully`, showrooms })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, msg: "An error occured while fetching showrooms in the brand. Please try again" })
   }
}

const getCarsInBrand = async (req, res) => {
   try {
      const brandId = req.params?._id
      const brand = await Brand.findById(brandId)
      if (!brand) { return res.status(404).json({ success: false, msg: "Brand does not exist" }) }

      const cars = await Car.find({ brandId })
      if (cars.length === 0) {
         return res.status(404).json({ success: false, msg: "No cars found for the brand" })
      }
      return res.status(200).json({ success: true, msg: `Cars for the brand ${brand} fetched successfully`, cars })
   } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, msg: "An error occured while fetching cars in the brand. Please try again" })
   }
}

export { addBrand, getAllBrands, updateBrand, deleteBrand, getCarsInBrand, getShowroomsInBrand }