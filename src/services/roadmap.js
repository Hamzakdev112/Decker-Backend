const roadmapRepo = require('../repositories/roadmap')

exports.createRoadmap =async (payload)=>{
    const roadmap = await roadmapRepo.createRoadmap(payload)
    return {
        success:true,
        status:200,
        roadmap
    }

}
exports.createNode =async (payload)=>{
    const node = await roadmapRepo.createNode(payload)
    return {
        success:true,
        status:200,
        node
    }

}

exports.getAllNodes = async(payload)=>{
    const nodes = await roadmapRepo.getAllNodes(payload.roadmapId)
      const buildTree = (parentId) => {
        const newNodes = nodes.filter((n)=>n.parentId == parentId)
        const treeNode = [];
        for(const node of newNodes){
            const childNodes = buildTree(node._id.toString())
            treeNode.push({
                id:node._id,
                name:node.title,
                description:node.description,
                parentId:node.parentId,
                children:childNodes
            })
        }
        return treeNode
      }
      const tree = buildTree(payload.roadmapId)
      return {
        success:true,
        status:200,
        tree
      }
}


exports.deleteNode = async(payload)=>{

    findAllChildNodes =async (parentId)=>{
        const childNodes = await roadmapRepo.findChildNodes(parentId)
        const allChildNodes = [...childNodes]
        for(const childNode of childNodes){
            const grandChildNodes = await findAllChildNodes(childNode._id) 
            allChildNodes.push(...grandChildNodes)
        }
        return allChildNodes
    }
    const childNodes = await findAllChildNodes(payload.nodeId)
    const childIds = childNodes.map((node)=>node._id)
        childIds.push(payload.nodeId)
        await roadmapRepo.deleteNodesWithChilds(childIds)
    return {
        success:true,
        status:200,
    }


}

exports.createNodeContent = async(payload)=>{

    const content = await roadmapRepo.createNodeContent(payload)
    return {
        success:true,
        status:200,
        content
    }

}
exports.getNodeContent = async(payload)=>{

    const content = await roadmapRepo.getNodeContent(payload)
    return {
        success:true,
        status:200,
        content
    }

}