import React from 'react'

function Rating({ rating, setRating }) {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((star) => {
                return (
                    <span
                        className='start'
                        style={{
                            cursor: 'pointer',
                            color: rating >= star ? 'orange' : 'gray',
                            fontSize: `35px`,
                        }}
                        onClick={() => {
                            setRating(star)
                        }}
                    >
                        {' '}
                        ★{' '}
                    </span>
                )
            })}
        </div>
    )
}

export default Rating
