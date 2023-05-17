import React, { useState, useEffect } from "react";

function MyComponent() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:8000/items/");
            const data = await response.json();
            setItems(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            {items.map(item => (
                <div key={item.item_id}>
                    {item.item_id}: {item.name}
                </div>
            ))}
        </div>
    );
}

export default MyComponent;
