import React from 'react';
import {fakeData} from './constants/amounts';

const currentMonth = 'aug';
const newRows = [];

const filterRows = fakeData.filter(row => row.month === currentMonth && row.cat1 === 'other');
const reduceRows = filterRows.reduce((acc, row) => {
    
    const match = newRows.find(newRow => (newRow.cat2 === row.cat2))

    if (match) {
        const updatedRow = {
            ...match,
            amount: (parseFloat(match.amount) + parseFloat(row.amount)).toFixed(2)
        }
        newRows.splice(newRows.findIndex(row => row.cat2 === match.cat2), 1, updatedRow)

    } else {
        newRows.push(row)
    }

    newRows.sort((a, b) => a.amount - b.amount)
    return newRows
}, 0)

export const Container = () => {
    return (
        <div>
            <h1>Other Spending - August</h1>
            <table>
                <tbody>
                    {reduceRows.map((row, i) => {
                        return (
                            <tr key={i}>
                                <td className='right'>{(-parseFloat(row.amount)).toFixed(2)}</td>
                                <td>{row.cat2}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}