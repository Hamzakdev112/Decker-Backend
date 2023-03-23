const course = {
    name:"Course",
    id:1,
    nodes:[
        {
            name:"node1",
            id:2,
            parentId:1,
            description:"desc",
            nodes:[
                {
                    name:"subNode",
                    id:3,
                    parentId:2
                },
                {
                    name:"subNode2",
                    id:4,
                    parentId:2,
                    nodes:[
                        {
                            name:"subnode3",
                            id:5,
                            parentId:4
                        }
                    ]
                },
            ]
        }
    ]


}