import React from 'react';
import { fakeData } from './constants/amounts';

const currentMonth = 'aug';

const reduceRows = category => {
    const newRows = [];

    const filterRows = fakeData.filter(row => row.month === currentMonth && row.cat1 === category);
    filterRows.reduce((acc, row) => {

        const match = newRows.find(newRow => (newRow.cat2 === row.cat2))
        const matchIndex = newRows.findIndex(newRow => (newRow.cat2 === row.cat2))

        if (match) {
            const updatedRow = {
                ...match,
                amount: (parseFloat(match.amount) + parseFloat(row.amount)).toFixed(2)
            }
            newRows.splice(matchIndex, 1, updatedRow)

        } else {
            newRows.push(row)
        }
        return null;
    }, 0)
    newRows.sort((a, b) => a.amount - b.amount)
    return newRows
}

export const Container = () => {
    return (
        <div className='container'>
            <div>
                <h1>other</h1>
                <table>
                    <tbody>
                        {reduceRows('other').map((row, i) => {
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
            <div>
                <h1>bills</h1>
                <table>
                    <tbody>
                        {reduceRows('bills').map((row, i) => {
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
        </div>
    )
}