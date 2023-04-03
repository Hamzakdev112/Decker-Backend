const router = require('express').Router()
const { verifyUser } = require('../middleware/auth')
const roadmapController = require('../controllers/roadmap')
const roadmapModel = require('../models/schema/roadmap/roadmap')
const nodeModel = require('../models/schema/roadmap/node')
const Chance = require('chance');
const chance = new Chance()

//Create a roadmap 
router.post('/roadmap/create', verifyUser, roadmapController.createRoadmap)
//Create a node 
router.get('/roadmap', verifyUser, roadmapController.getRoadmap)
router.post('/nodes/create/:roadmapId/:parentId?', verifyUser, roadmapController.createNode)
//Get all nodes
router.get('/nodes/get/:roadmapId', verifyUser, roadmapController.getAllNodes)
//Delete a node
router.delete('/nodes/delete/:roadmapId/:nodeId', verifyUser, roadmapController.deleteNode)


//Create node content
router.post('/nodes/content/create/:nodeId', verifyUser, roadmapController.createNodeContent)
//Get node content
router.get('/nodes/content/get/:nodeId', roadmapController.getNodeContent)

















// router.get('/nodes/get/:roadmapId',async (req,res)=>{
    // const fetchNodes =async (parentId)=>{
    //     const nodes =  await nodeModel.find({
    //         parentId:parentId
    //     }).lean()
    //     const treeNode = [];
    //     for(const node of nodes){
    //         const childNodes = await fetchNodes(node._id)
    //         treeNode.push({
    //             id:node._id,
    //             title:node.title,
    //             description:node.description,
    //             parentId:node.parentId,
    //             children:childNodes
    //         })
    //     }
    //     return treeNode
    // }
    // const tree = await fetchNodes(null)
    // res.json(tree)
// })












module.exports = router
