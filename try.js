

function group(arr){
    const sortedObj = {}
    arr.map((current, indx ) => {
            let stobj = sortedObj[current[0]]
            let pusVal = [current.slice(1,current.length)]
                if (pusVal[0][0]){
                    stobj ? stobj.push(pusVal[0]) : sortedObj[current[0]] = pusVal
                } else{
                        sortedObj[current[0]] = undefined
                }
    })
    const sortedArr = []
    Object.keys(sortedObj).map((key, indx) => {
            if (sortedObj[key]){
                let newSorted = group(sortedObj[key])
                if (newSorted.length === 1 && typeof newSorted[0] === "object"){
                    sortedArr[indx] = [key, group(sortedObj[key])[0]]
                } else {
                    sortedArr[indx] = [key, group(sortedObj[key])]
                }
            } else {
                sortedArr[indx] = key
            }
            
    })
    return sortedArr
}

//group([[3,3,3],[3,2,3],[3,2,3]])

console.log(group([[1,3,2],[4,2,3],[1,2,3], [2,3,2],[2,2,3],[1,2,3], [3,3,3],[3,2,3],[3,2,3]])[2][1]);