const express = require("express");
const Visitor = require("../models/Visitor");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const visitors = await Visitor.find().sort({ createdAt: -1 });

        res.json({
            success: true,
            visitors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const visitor = new Visitor(req.body);
        const savedVisitor = await visitor.save();

        res.status(201).json({
            success: true,
            message: "Visitor added successfully",
            visitor: savedVisitor
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

router.put("/:id/checkout", async (req, res) => {
    try {
        const visitor = await Visitor.findByIdAndUpdate(
            req.params.id,
            {
                status: "Checked Out",
                checkOut: new Date()
            },
            { new: true }
        );

        if (!visitor) {
            return res.status(404).json({
                success: false,
                message: "Visitor not found"
            });
        }

        res.json({
            success: true,
            message: "Visitor checked out successfully",
            visitor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;