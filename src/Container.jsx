import React from 'react';

const fakeData = [
    {
        "month": "aug",
        "amount": "-32.09",
        "cat1": "other",
        "cat2": "test",
    },
    {
        "month": "aug",
        "amount": "-132.09",
        "cat1": "other",
        "cat2": "something",
    },
    {
        "month": "aug",
        "amount": "-12.09",
        "cat1": "other",
        "cat2": "shopping",
    },
    {
        "month": "aug",
        "amount": "-100",
        "cat1": "other",
        "cat2": "shopping",
    },
    {
        "month": "aug",
        "amount": "-32.09",
        "cat1": "something",
        "cat2": "shopping",
    }
]

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
        newRows.pop(match)
        newRows.splice(0, 0, updatedRow)
        newRows.sort((a, b) => a.amount - b.amount)

    } else {
        newRows.push(row)
    }
    return newRows
}, 0)

export const Container = () => {
    return (
        <div>
            <h1>Other Spending - August</h1>
            <table>
                <tbody>
                    {reduceRows.map((row, i) => {
                        return (<tr key={i}>
                            <td>{row.month}</td>
                            <td className='right'>{-row.amount}</td>
                            <td>{row.cat1}</td>
                            <td>{row.cat2}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}