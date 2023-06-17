import React from 'react'

export default function BagIcon({ color = '#fafafa' }: { color?: string }) {
    return (
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 5.30005V19.5C1 19.7653 1.10536 20.0196 1.29289 20.2072C1.48043 20.3947 1.73478 20.5 2 20.5H18C18.2652 20.5 18.5196 20.3947 18.7071 20.2072C18.8946 20.0196 19 19.7653 19 19.5V5.30005H1Z" stroke={color} stroke-width="1.5" stroke-linejoin="round" />
            <path d="M19 5.3L16.1665 1.5H3.8335L1 5.3M13.7775 8.6C13.7775 10.699 12.0865 12.4 10 12.4C7.9135 12.4 6.222 10.699 6.222 8.6" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}
