require('dotenv').config();
const express = require('express');
const Product = require('../models/productSchema');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const { upload } = require('../middleware/multer');


const handleCreateProduct = async (req,res) =>{

    try {
        if(!req.file){
            return res.status(400).json({message: 'No image uploaded'})
        }


        const {name,description,published,image,price,rating} = req.body;
        const newProduct = await Product({
            name,
            description,
            userId :req.user.userID,
            published,
            image : req.file.path,
            price,
            rating,
            createdBy : req.user.userID,
            updatedBy : req.user.userID

        }).save();

        return res.status(200).json({message : "Product added Successfully"});

    } catch (error) {
        return res.status(500).json({message : "Internal Server Error handleCreateProduct"}); 
    }
}

const handleGetAllProducts = async  (req,res) =>{
    try {
        const allProduct = await Product.find({});
        return res.status(200).json(allProduct);
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error handleGetAllProducts"});
    }
}

const handleGetProductById = async (req,res) =>{
    try {
        const  id = req.params.id;
        const product = await Product.findById(id);
        
        if(!product){
            return res.status(404).json({message : "Product not found ID"});
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error handleGetProductById"});
    }
}

const handleUpdateProduct = async (req,res) =>{
    try {
        const updateId = req.params.id;

        if(!updateId){
            return res.status(404).json({message : "Product not found"});
        }

        const updatedProduct = await Product.findByIdAndUpdate(updateId,req.body).save();
        return res.status(200).json({message : "Product updated Successfully",updatedProduct});
    } catch (error) {

        return res.status(500).json({message : "Internal Server Error handleUpdateProduct"});

    }
}

const handleDeleteProduct = async (req,res) =>{
    try {
        const  deleteId = req.params.id;
        if(!deleteId){
            return res.status(404).json({message : "Product not found"});
        }
        const deletedProduct = await Product.findByIdAndDelete(deleteId).save();
        return res.status(200).json({message : "Product Deleted"});
    } catch (error) {
        return res.status(500).json({messgae : "Internal Server Error handleDeleteProduct"});
    }
}

const handleGetProductByUserId = async (req,res) =>{
    try {
        const userId = req.params.userId;
        console.log(req.user)
        console.log(userId);
        if(!userId){
            return res.status(404).json({message : "Product with User not found"});
        }
        const productsByUserId = await Product.find({createdBy : userId});

        return res.status(200).json({message : "Products Fetched Successfully",productsByUserId});

    } catch (error) {
        return res.status(500).json({message : "Internal Server Error handleGetProductByUserId"});
    }
}

const handleGetPublishedProducts = async (req,res) =>{
    try {
        const isPublished = true;
        if(!isPublished){
            return res.status(404).json({message : "Product not found"});
        }
        const published = await Product.find({published : true});
        return res.status(200).json({message : "Published Products Fetched Successfully",published});
    } catch (error) {
        return  res.status(500).json({message : "Internal Server Error 111"});
    }
}

const handleGetProductByName = async (req,res) =>{
    try {
        console.log("inside search by name" , req.query);
        const {name} = req.query;

        if(!name){
            return res.status(404).json({message : "Product not found"});
        }
        else{
            const productByName = await Product.find({name : name});
            return res.status(200).json({message : "Product Fetched Successfully",productByName});
        }
        
    } catch (error) {
        return res.status(500).json({message : "Internal Server Error handleGetProductByName"})
    }



}

module.exports = {
    handleCreateProduct,
    handleGetAllProducts,
    handleGetProductById,
    handleUpdateProduct,
    handleDeleteProduct,
    handleGetProductByUserId,
    handleGetPublishedProducts,
    handleGetProductByName

}







