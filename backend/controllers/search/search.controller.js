import { Brand } from "../../models/brand.models.js";

export const searchBrands = async (req, res) => {
    try {
        // console.log("Search route hit:", req.query.q)
        const query = req.query.q || ""

        const brands = await Brand.find({
            name: { $regex: query, $options: "i" },
        })

        res.json(brands);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Server error" })
    }
}