import React from 'react'

sortedSeasonRounds.sort((a, b) => {
    const dateArrayA = a.date.split('.').map(itemA => parseInt(itemA))
    const dateArrayB = b.date.split('.').map(itemB => parseInt(itemB))

    if(dateArrayA[2] === dateArrayB[2]){

        if(dateArrayA[1] === dateArrayB[1]){

            return dateArrayB[0] - dateArrayA[0]
        }
        return dateArrayB[1] - dateArrayA[1]
    }
    return dateArrayB[2] - dateArrayA[2]
})

return sortedSeasonRounds